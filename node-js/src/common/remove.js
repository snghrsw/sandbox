const moment = require('moment');
const connections = require('./../common/connection');
const sentry = require('./sentry').sentry;

const { connection } = connections;
moment.locale('ja');

const removeFollow = (userId) =>
  new Promise((resolve, reject) => {
    const query = `UPDATE follow set deletedAt = '${moment().format()}' WHERE userId = ${userId}`;
    connection.query(query, (error, result) => {
      sentry.setParam({ query, error, result });
      if (error) {
        console.error('removeFollow error', query);
        sentry.catchError(error);
        return reject(error);
      }
      // console.log('removeFollow success', query);
      return resolve(result);
    });
  });

exports.removeFollow = removeFollow;
