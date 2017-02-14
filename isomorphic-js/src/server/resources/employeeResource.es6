import connection from './connection';
import Sequelize from 'sequelize';

const User = connection.define('employee', {
  name: Sequelize.STRING,
  corporateDomain: Sequelize.STRING,
  facebookId: Sequelize.STRING,
  thumbnailUrl: Sequelize.STRING,
  comment: Sequelize.STRING
});

// User.sync({force: true}).then(()=>{
//   return User.findOrCreate({
//     where: {name: "Test User"},
//     defaults:{
//       name: "Test User",
//       corporateDomain: "test",
//       facebookId: "332432325454",
//       thumbnailUrl: "http://image.png",
//       comment: "従業員"
//     }
//   });
// });

export default User;
