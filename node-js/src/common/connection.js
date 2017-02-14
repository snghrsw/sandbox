const mysql = require('mysql');
const Twitter = require('twitter');
const raven = require('raven');

const sentryClient = new raven.Client(process.env.SENTRY_DSN);
const connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);
exports.connection = connection;

exports.dbConnect = () =>
  new Promise((resolve, reject) => {
    connection.connect(error => {
      if (error) {
        sentryClient.captureException(error);
        reject();
      }

      console.log(`DB connected as id ${connection.threadId}`);
      resolve();
    });
  });

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

exports.client = client;
