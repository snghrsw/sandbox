#!/usr/bin/env node
// リストインされているユーザーのスコアを再評価する

const moment = require('moment');
const connections = require('./common/connection');
const sentry = require('./common/sentry').sentry;
const commonScore = require('./common/score');

const { dbConnect, connection } = connections;
const { insertScoreOrRemoveUser } = commonScore;
moment.locale('ja');

const LIMIT_UPDATE = 10;

// リストインされているユーザーのId一覧を取得
const getListInUserIds = () =>
  new Promise((resolve, reject) => {
    const query =
      `select userId from follow 
       where flagListIn is true 
       order by scoreUpdatedAt asc limit ${LIMIT_UPDATE}`;
    connection.query(query, (error, response) => {
      if (error) {
        console.error('getListInUserIds', error);
        sentry.catchError(error);
        reject(error);
      }
      const userIds = response.map(result => result.userId);
      console.log('getListInUserIds', userIds.length);
      resolve(userIds);
    });
  });

console.log(`\n\n\n=== Start: ${moment().format('MM/DD HH:mm:ss')}`);

dbConnect()
  .then(() => getListInUserIds())
  .then(userIds => Promise.all(
    userIds.map(userId => insertScoreOrRemoveUser(userId))
  ))
  .then(() => {
    console.log('=== Completed');
    process.exit();
  })
  .catch(error => {
    console.error('result', error);
    sentry.catchError(error);
    process.exit();
  });

