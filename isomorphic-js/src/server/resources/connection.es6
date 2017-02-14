import Sequelize from 'sequelize';
import CONFIG from './../../../config.json';

const connection = new Sequelize(
  CONFIG[process.env.NODE_ENV].MYSQL_DABATASE,
  CONFIG[process.env.NODE_ENV].MYSQL_USER,
  CONFIG[process.env.NODE_ENV].MYSQL_PASSWORD,
  {
    host: CONFIG[process.env.NODE_ENV].MYSQL_HOST,
    dialect: 'mysql',
    debug: true,
    logging: false,
    language: 'ja'
  }
);

export default connection;
