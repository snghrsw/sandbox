#!/usr/bin/env node

const moment = require('moment');
const connections = require('./common/connection');
const remove = require('./common/remove');
const sentry = require('./common/sentry').sentry;

const { dbConnect, client, connection } = connections;
const { removeFollow } = remove;

moment.locale('ja');

const LIMIT_GET_TARGET_UNFOLLOW_USERIDS = 25;

// 下記条件に当てはまるアカウントを最大15件取得する
// - DBのcreatedAtが一週間以上前
// - followBackフラグがfalse（nullは不可）
// - scoreが平均以下
const getTargetUnfollowUserIds = () =>
  new Promise((resolve, reject) => {
    const query =
      `SELECT userId FROM follow WHERE flagFollowBack = false 
       AND createdAt < (NOW() - INTERVAL 8 DAY) 
       AND flagFollowUpdatedAt > (NOW() - INTERVAL 1 DAY) 
       AND deletedAt is null 
       AND flagListIn is not true 
       order by score, createdAt 
       LIMIT ${LIMIT_GET_TARGET_UNFOLLOW_USERIDS}`;
    connection.query(query, (error, response) => {
      if (error) {
        sentry.catchError(error);
        return reject(error);
      }
      const userIds = response.map(result => result.userId);
      console.log({ userIds });
      return resolve(userIds);
    });
  });

const unfollow = (userId) =>
  new Promise((resolve) => {
    client.post('friendships/destroy', { user_id: userId }, (error) => {
      if (error) {
        sentry.catchError(error);
        return resolve(error);
      }
      console.log(`${userId} をアンフォロー`);
      return resolve(userId);
    });
  });


console.log(`\n\n\n=== Start unFollow: ${moment().format('MM/DD HH:mm:ss')}`);

dbConnect()
  .then(() => getTargetUnfollowUserIds())
  .then(userIds =>
    Promise.all(userIds.map(userId =>
      unfollow(userId)
        .then(() => removeFollow(userId))
    ))
  )
  .then(() => {
    console.info('=== Completed');
    process.exit();
  })
  .catch(error => {
    console.error(error);
    process.exit();
  });
