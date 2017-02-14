#!/usr/bin/env node

const moment = require('moment');
const connections = require('./common/connection');
const MAX_LIST_COUNT = require('./common/config.json').MAX_LIST_COUNT;
const sentry = require('./common/sentry').sentry;

const { dbConnect, client, connection } = connections;

// DBのlistテーブルから特定のユーザーを削除する
const removeDBList = (userId) =>
  new Promise((resolve, reject) => {
    connection.query(`UPDATE follow SET flagListIn = false WHERE userId = ${userId}`,
      (error, result) => {
        if (error) {
          console.error('removeListDBList error', userId);
          sentry.catchError(error);
          return reject(error);
        }
        console.log('removeListDBList success', userId);
        return resolve(result);
      });
  });


// リストに登録されているユーザー数を元に、削除するユーザー数を決定する
const getRemoveCountInList = () =>
  new Promise((resolve, reject) => {
    const query = 'select count(userId) as userCount from follow where flagListIn is true';
    connection.query(query, (error, result) => {
      if (error) {
        sentry.catchError(error);
        return reject('getRemoveCountInList', error);
      }
      const userCount = result.map(row => row.userCount)[0];
      const removeCount = userCount > MAX_LIST_COUNT ? userCount - MAX_LIST_COUNT : 0;

      if (removeCount === 0) {
        console.error({ userCount, removeCount });
        return reject('リムーブカウントが0');
      }

      return resolve(removeCount);
    });
  });

// 指定された数のリストムーブ対象UserIdsを取得する
const getRemoveUserIds = (limit = 0) =>
  new Promise((resolve, reject) => {
    const query = `select userId from follow where flagListIn = true order by score asc limit ${limit}`;
    connection.query(query, (error, result) => {
      if (error) {
        sentry.catchError(error);
        return reject('getRemoveUserIds', error, result);
      }
      const userIds = result.map(row => row.userId);

      if (userIds.length === 0) {
        return reject('リムーブ対象が0');
      }

      return resolve(userIds);
    });
  });


// twitterリストから削除する
const removeList = (userId, slug = 'writers') =>
  new Promise((resolve, reject) => {
    const params = {
      slug,
      user_id: userId,
      owner_screen_name: 'inuhira',
    };
    return client.post('lists/members/destroy', params, (error, result) => {
      if (error) {
        console.error('removeList', error);
        sentry.catchError(error);
        return reject(error);
      }
      console.info(`${userId}を${slug}リストから削除`);
      return resolve(result);
    });
  });



console.log(`\n\n\n=== Start: ${moment().format('MM/DD HH:mm:ss')}`);

dbConnect()
  .then(() => getRemoveCountInList())
  .then(limit => getRemoveUserIds(limit))
  .then(userIds =>
    Promise.all(userIds.map(userId =>
      removeDBList(userId)
        .then(() => removeList(userId))
        .catch(error => console.error(error))
    )
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

