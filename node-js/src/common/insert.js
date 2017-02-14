#!/usr/bin/env node

const moment = require('moment');
const connections = require('./connection');
const sentry = require('./sentry').sentry;

const { connection } = connections;

moment.locale('ja');

// ユーザー情報をDBに格納する
const insertUserToDb = (user) =>
  new Promise((resolve, reject) => {
    const params = {
      userId: user.id_str,
      screenName: user.screen_name,
      createdAt: moment().format(),
      updatedAt: moment().format(),
    };
    connection.query('INSERT INTO follow SET ?', params, (error, result) => {
      sentry.setParam({ user, error, result });
      if (error) {
        sentry.catchError(error);
        return reject(error);
      }
      console.log(`${user.id}:${user.screen_name}をDBに格納`);
      return resolve(result);
    });
  });

exports.insertUserToDb = insertUserToDb;
