#!/usr/bin/env node

const moment = require('moment');
const connections = require('./common/connection');
const MAX_LIST_COUNT = require('./common/config.json').MAX_LIST_COUNT;
const sentry = require('./common/sentry').sentry;

const { dbConnect, client, connection } = connections;
const LIMIT_GET_HIGH_SCORE_USERS = 5;

moment.locale('ja');

// リストインしても良い基準スコアを得る(MAX_LIST_COUNT人目のscore)
const getListInMinScore = () =>
  new Promise((resolve, reject) => {
    const query = `SELECT score FROM follow ORDER BY score DESC LIMIT 1 OFFSET ${MAX_LIST_COUNT}`;
    connection.query(query, (error, result) => {
      if (error) {
        sentry.catchError(error);
        return reject('getListInMinScore', error);
      }
      const lowScore = result
        .map(row => row.score)[0];
      console.log('基準スコア => ', lowScore);
      return resolve(lowScore);
    });
  });

// 基準スコアよりも高いスコアのリストに登録されていないユーザーを選出する
const getUserIdsEnoughScore = (lowScore = 25000) =>
  new Promise((resolve, reject) => {
    const query =
      `SELECT userId FROM follow where score > ${lowScore} and
       flagListIn is false order by score desc
       LIMIT ${LIMIT_GET_HIGH_SCORE_USERS}`;

    connection.query(query, (error, result) => {
      sentry.setParam({ lowScore, error, result });
      if (error) {
        sentry.catchError(error);
        return reject('getUserIdsEnoughScore', error);
      }
      const userIds = result
        .map(row => row.userId);
      return resolve(userIds);
    });
  });


// twitterリストに追加する
const addList = (userId, slug = 'writers') =>
  new Promise((resolve, reject) => {
    const params = {
      slug,
      user_id: userId,
      owner_screen_name: 'inuhira',
    };
    return client.post('lists/members/create', params, (error, result) => {
      sentry.setParam({ userId, slug, params, error, result });
      if (error) {
        console.error('addList', error);
        sentry.catchError(error);
        reject(error);
      }
      resolve(result);
    });
  });

// DBに追加
const insertList = (userId) =>
  new Promise((resolve, reject) => {
    connection.query('UPDATE follow set flagListIn = true WHERE userId = ?',
      [userId],
      (error, result) => {
        sentry.setParam({ userId, error, result });
        if (error) {
          console.error('insertList', error);
          sentry.catchError(error);
          reject(error);
        }
        resolve(result);
      });
  });

// ハイスコアユーザーの一覧を取得し、
// リストに追加する
const insertListTwAndDB = (userId) =>
  insertList(userId)
    .then(() => addList(userId))
    .then(() => console.info(`${userId} をリストに追加`))
    .catch(error => console.error(error));


console.log(`\n\n\n=== Start: ${moment().format('MM/DD HH:mm:ss')}`);

dbConnect()
  .then(() => getListInMinScore())
  .then(lowScore => getUserIdsEnoughScore(lowScore))
  .then(userIds =>
    Promise.all(userIds.map(userId => insertListTwAndDB(userId))
  ))
  .then(() => {
    console.info('=== Completed');
    process.exit();
  })
  .catch(error => {
    console.error(error);
    sentry.catchError(error);
    process.exit();
  });
