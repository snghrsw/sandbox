#!/usr/bin/env node

const moment = require('moment');
const connections = require('./common/connection');
const keywords = require('./common/keywords');
const sentry = require('./common/sentry').sentry;
const insertFollow = require('./common/insert').insertUserToDb;

const { dbConnect, client } = connections;
const { getKeyword } = keywords;

moment.locale('ja');

const LIMIT_SEARCH = 8;

const search = (q = '小説家') =>
  new Promise((resolve, reject) => {
    console.log(`=== 検索ワード => ${q}`);
    client.get('search/tweets', { q }, (error, response) => {
      sentry.setParam({ q, error, response });
      if (error) {
        sentry.catchError(error);
        reject(error);
      }
      const users = response.statuses
        .filter(status => status.user.following === false)
        .sort((a, b) => b.favourites_count - a.favourites_count)
        .slice(0, LIMIT_SEARCH * 2)
        .sort((a, b) => b.listed_count - a.listed_count)
        .slice(0, LIMIT_SEARCH)
        .map(status => status.user);
      resolve(users);
    });
  });

const follow = (user) =>
  new Promise((resolve) => {
    if (!(user.screen_name && Number.isInteger(user.id))) {
      console.error('必要なユーザーパラメーターがありません', user);
      return resolve(new Error('必要なユーザーパラメーターがありません'));
    }

    return client.post('friendships/create', { user_id: user.id }, (error) => {
      sentry.setParam({ user, error });
      if (error) {
        console.error(error);
        sentry.catchError(error);
        resolve(error);
      }
      console.log(`${user.name} | ${user.screen_name} | ${user.id} をフォロー`);
      resolve(user.id);
    });
  });

console.log(`\n\n\n=== Start: ${moment().format('MM/DD HH:mm:ss')}`);

dbConnect()
  .then(() => search(getKeyword()))
  .then(users =>
    Promise.all(users.map(user =>
      follow(user)
        .then(() => insertFollow(user))
        .catch(error => console.error(error))
    ))
  )
  .then(() => {
    console.info('=== Completed');
    process.exit();
  })
  .catch(error => {
    console.error('result', error);
    sentry.catchError(error);
    process.exit();
  });
