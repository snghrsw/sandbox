import connection from './connection';
import Sequelize from 'sequelize';
import encoder from './../encoder';

const Corporate = connection.define('corporate', {
  corporateName: Sequelize.STRING,
  domain: Sequelize.STRING,
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  thumbnailUrl: Sequelize.STRING
});

// Corporate.sync({force: true}).then(()=>{
//   return Corporate.findOrCreate({
//     where: {corporateName: "Test Company"},
//     defaults:{
//       corporateName: "Test Company",
//       domain: "test",
//       username: 'admin',
//       password: encoder.encode("test"),
//       thumbnailUrl: "http://copre.png"
//     }
//   });
// });

export default Corporate;
