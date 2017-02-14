#!/usr/bin/env node
// TwitterでフォローされていてDBに未登録になっているユーザーをDBに追加する

const moment = require('moment');
const connections = require('./common/connection');
const sentry = require('./common/sentry').sentry;
const insertUserToDb = require('./common/insert').insertUserToDb;
const getUser = require('./common/score').getUser;

const { dbConnect, client, connection } = connections;

moment.locale('ja');

const LIMIT_MAX_INSERT = 20;

// TwitterでフォローしているユーザーのID一覧を取得
const getTwitterFollowUserIds = () =>
  new Promise((resolve, reject) =>
    client.get('friends/ids', { screen_name: 'inuhira' }, (error, response) => {
      if (error) {
        console.error(error);
        sentry.catchError(error);
        reject(error);
      }
      resolve(response.ids);
    })
  );

// 指定したID一覧のうち、DBに未登録のものの一覧を返す
const getUnInsertUserIds = (userIds = []) =>
  new Promise((resolve, reject) => {
    const joinedIds = userIds.map(userId => `'${userId}'`).join(',');
    const query = `select userId from follow where userId in (${joinedIds})`;
    connection.query(query, (error, result) => {
      if (error) {
        console.error(error);
        sentry.catchError(error);
        reject(error);
      }

      // DBに登録済のuserId一覧
      const insertedUserIds = result.map(row => row.userId);

      // DBに登録されていないuserId一覧
      const unInsertedUserIds = userIds
        .filter(userId => !insertedUserIds.includes(userId.toString()))
        .slice(0, LIMIT_MAX_INSERT);

      resolve(unInsertedUserIds);
    });
  });

// IDからユーザー情報を取得して、DBに格納する
const getUserAndInsert = (userId) =>
  getUser(userId)
    .then(user => insertUserToDb(user))
    .catch(error => console.error(error));

console.log(`\n\n\n=== Start: ${moment().format('MM/DD HH:mm:ss')}`);

dbConnect()
  .then(() => getTwitterFollowUserIds())
  .then(userIds => getUnInsertUserIds(userIds))
  .then(unInsertUserIds => Promise.all(
    unInsertUserIds.map(userId => getUserAndInsert(userId))
  ))
  .then(() => {
    console.info('=== Completed');
    process.exit();
  })
  .catch(error => {
    console.error('result', error);
    sentry.catchError(error);
    process.exit();
  });
