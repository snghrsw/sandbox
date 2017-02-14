#!/usr/bin/env node

const moment = require('moment');
const commonConnections = require('./common/connection');
const sentry = require('./common/sentry').sentry;

const { dbConnect, client, connection } = commonConnections;

moment.locale('ja');

const LIMIT_GET_FOLLOW_BACK_NULL_USER = 40;

const getFollowBackNullUser = () =>
  new Promise((resolve, reject) => {
    const query =
      `SELECT userId FROM follow
       where deletedAt is not true
       ORDER BY flagFollowUpdatedAt, flagFollowBack, createdAt
       LIMIT ${LIMIT_GET_FOLLOW_BACK_NULL_USER}`;
    connection.query(query, (error, response) => {
      sentry.setParam({ query, error, response });
      if (error) {
        console.error('getFollowBackNullUser', error);
        sentry.catchError(error);
        reject(error);
      }
      resolve(response.map(user => user.userId));
    });
  });

const getFriendships = (userIds = []) =>
  new Promise((resolve, reject) => {
    client.get('friendships/lookup', { user_id: userIds.join(',') }, (error, response) => {
      sentry.setParam({ userIds, error, response });
      if (error) {
        console.error('getFriendships', { userIds, error });
        sentry.catchError(error);
        return reject(error);
      }
      return resolve(response);
    });
  });

const getFlagFollowBack = (connections = []) =>
  connections.includes('followed_by');

const updatingAt = (userIds = []) =>
  new Promise((resolve, reject) => {
    const joinedIds = userIds.map(userId => `'${userId}'`).join(',');
    const params = [
      moment().format().toString(),
      moment().format().toString(),
    ];
    const query = `UPDATE follow SET updatedAt = ?, flagFollowUpdatedAt = ? WHERE userId in (${joinedIds})`;
    connection.query(query,
      params, (error, result) => {
        sentry.setParam({ error, result });
        if (error) {
          console.error('updatingAt', error);
          sentry.catchError(error);
          return reject(error);
        }
        return resolve(result);
      });
  });


const updateFollowBack = ({ id, connections = [] }) =>
  new Promise((resolve, reject) => {
    const params = [
      getFlagFollowBack(connections),
      moment().format().toString(),
      id,
    ];
    connection.query('UPDATE follow SET flagFollowBack = ?, updatedAt = ? WHERE userId = ?',
      params, (error, result) => {
        sentry.setParam({ id, connections, error, result });
        if (error) {
          console.error('updateFollowBack', error);
          sentry.catchError(error);
          reject(error);
        }
        console.log(`${id} : ${getFlagFollowBack(connections)}`);
        resolve(result);
      });
  });

console.log(`\n\n\n=== Start: ${moment().format('MM/DD HH:mm:ss')}`);

dbConnect()
  .then(() => getFollowBackNullUser())
  .then(userIds =>
    updatingAt(userIds)
      .then(() => getFriendships(userIds))
  )
  .then(friendships =>
    Promise.all(friendships.map(friendship =>
      updateFollowBack(friendship)
    ))
  )
  .then(() => {
    console.log('=== Completed');
    process.exit();
  })
  .catch(error => {
    console.error(error);
    sentry.catchError(error);
    process.exit();
  });
