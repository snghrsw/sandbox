#!/usr/bin/env node

const moment = require('moment');
const connections = require('./common/connection');
const sentry = require('./common/sentry').sentry;
const commonScore = require('./common/score');

const { dbConnect } = connections;
const { getNoScoreFollowes, insertScoreOrRemoveUser } = commonScore;
moment.locale('ja');

console.log(`\n\n\n=== Start: ${moment().format('MM/DD HH:mm:ss')}`);

dbConnect()
  .then(() => getNoScoreFollowes())
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

