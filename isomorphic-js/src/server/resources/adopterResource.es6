import connection from './connection';
import Sequelize from 'sequelize';

const Adopter = connection.define('adopter', {
  name: Sequelize.STRING,
  referralId: Sequelize.UUID,
  corporateDomain: Sequelize.STRING,
  facebookId: Sequelize.STRING,
  thumbnailUrl: Sequelize.STRING,
  comment: Sequelize.STRING,
  isMatch: Sequelize.BOOLEAN,
  isKeep: Sequelize.BOOLEAN
});

// Adopter.sync({force: true}).then(()=>{
//   return Adopter.findOrCreate({
//     where: {
//       name: "Test User"
//     },
//     defaults:{
//       name: "Test User",
//       referralId: 2,
//       facebookId: "332432325454",
//       thumbnailUrl: "http://image.png",
//       comment: "良い感じのコメント",
//       isMatch: false,
//       isKeep: true,
//       corporateDomain: 'test'
//     }
//   });
// });

export default Adopter;
