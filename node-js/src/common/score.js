#!/usr/bin/env node

const moment = require('moment');
const connections = require('./connection');
const removeFollow = require('./remove').removeFollow;
const commonKeywords = require('./keywords');
const sentry = require('./sentry').sentry;

const { client, connection } = connections;
const { keywords, negativeWords } = commonKeywords;
moment.locale('ja');
const LIMIT_NO_SCORE_USER = 25;


const getTimeline = (userId) =>
  new Promise((resolve, reject) => {
    const params = {
      user_id: userId,
      count: 200,
      exclude_replies: true,
      include_rts: false,
    };
    client.get('statuses/user_timeline', params, (errors, response) => {
      sentry.setParam({ userId, params, errors, response });
      if (errors) {
        sentry.catchError(errors);
        return reject(errors);
      }
      return resolve(response);
    });
  });

const getUser = (userId) =>
  new Promise((resolve, reject) => {
    client.get('users/show', { user_id: userId }, (errors, response) => {
      sentry.setParam({ userId, errors, response });
      if (errors) {
        sentry.catchError(errors);
        return reject(errors);
      }
      return resolve(response);
    });
  });


const getScoreOfTweetText = (tweetText) =>
  keywords.reduce((currentScore, keyword) => {
    if (tweetText.indexOf(keyword) > -1) {
      return currentScore + 100;
    }
    sentry.setParam({ keyword: { tweetText, currentScore } });
    return currentScore;
  }, 0);


const getScoreOfTweetTextNegative = (tweetText) =>
  negativeWords.reduce((currentScore, keyword) => {
    if (tweetText.indexOf(keyword) > -1) {
      return currentScore - 100;
    }
    sentry.setParam({ keyword: { tweetText, currentScore } });
    return currentScore;
  }, 0);


const getScoreOfTimeline = (timeline) => {
  let flagReplay = false;
  let totalScore = timeline.reduce((currentScore, currentTweet) => {
    let score = 0;

    score += (currentTweet.retweet_count * 5);
    score += (currentTweet.favorite_count * 10);
    if (score > 100) { score = 100; }

    score += getScoreOfTweetText(currentTweet.text);
    score += getScoreOfTweetTextNegative(currentTweet.text);

    if (currentTweet.text.length < 40) { score -= (80 - currentTweet.text.length); }
    if (score > 1000) { score = 1000; }

    if (currentTweet.in_reply_to_user_id !== null) {
      flagReplay = true;
    }

    return score + currentScore;
  }, 0);

  sentry.setParam({ totalScore });

  if (!flagReplay) { totalScore = Math.floor(totalScore * 0.5); }
  if (totalScore < 0) { totalScore = 0; }

  return totalScore;
};

const getScoreOfUser = (user) => {
  let score = 0;
  score += user.listed_count * 20;
  if (score > 500) { score = 500; }
  score += getScoreOfTweetText(`${user.description}${user.name}`) * 10;
  score += getScoreOfTweetTextNegative(`${user.description}${user.name}`) * 10;

  if (user.name.indexOf('bot') > -1) {
    score = Math.floor(score / 2);
  }

  if (user.screen_name.indexOf('bot') > -1) {
    score = Math.floor(score / 2);
  }

  if (user.default_profile) {
    score = Math.floor(score / 2);
  }

  if (user.default_profile_image) {
    score = Math.floor(score / 2);
  }

  if (user.lang !== 'ja') {
    score = Math.floor(score / 2);
  }

  sentry.setParam({ user, score });
  return score;
};


const insertScore = (userId, score) =>
  new Promise((resolve, reject) => {
    const params = [
      score,
      moment().format().toString(),
      moment().format().toString(),
      userId,
    ];
    connection.query('UPDATE follow SET score = ?, updatedAt = ?, scoreUpdatedAt = ? WHERE userId = ?',
      params, (error, result) => {
        sentry.setParam({ userId, score, error, result });
        if (error) {
          console.error('insertScore', error);
          sentry.catchError(error);
          return reject(error);
        }
        console.log('insertScore', { userId, score });
        return resolve(result);
      });
  });

const getNoScoreFollowes = () =>
  new Promise((resolve, reject) => {
    const query = `SELECT userId FROM follow WHERE deletedAt is null ORDER BY scoreUpdatedAt, score, createdAt LIMIT ${LIMIT_NO_SCORE_USER}`;
    connection.query(query, (error, response) => {
      if (error) {
        console.error('getNoScoreFollowes', error);
        sentry.catchError(error);
        reject(error);
      }
      const userIds = response.map(result => result.userId);
      console.log('getNoScoreFollowes', userIds.length);
      resolve(userIds);
    });
  });

const getScore = (userId) =>
  new Promise((resolve, reject) => {
    const scores = {
      user: null,
      timeline: null,
    };

    return getUser(userId)
      .then(user => getScoreOfUser(user))
      .then(userScore => {
        scores.user = userScore;
        return getTimeline(userId);
      })
      .then(timeline => getScoreOfTimeline(timeline))
      .then(scoreTimeline => {
        let totalScore = scores.user + scoreTimeline;

        if (totalScore < 0) {
          totalScore = 0;
        }

        return resolve(totalScore);
      })
      .catch(errors => {
        console.error('getScore', errors);
        sentry.catchError(errors);
        reject(errors);
      });
  });

const insertScoreOrRemoveUser = (userId) =>
  getScore(userId)
    .then(score => insertScore(userId, score))
    .catch(errors => {
      if (errors.some(error =>
        error.code === 401 ||
        error.code === 50 ||
        error.code === 136
      )) {
        return removeFollow(userId);
      }
      return errors;
    });


exports.getScore = getScore;
exports.insertScoreOrRemoveUser = insertScoreOrRemoveUser;
exports.getNoScoreFollowes = getNoScoreFollowes;
exports.getUser = getUser;
