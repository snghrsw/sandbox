// import passport from 'passport';
// import Corporate from './resources/corporateResource';
// import {Strategy as LocalStrategy} from 'passport-local';
// import encoder from './encoder';
//
// passport.use(new LocalStrategy({
//     usernameField: 'username',
//     passwordField: 'password'
//   },
//   function(username, password, done) {
//     console.log("username,password",username,password);
//
//     Corporate
//       .findOne({
//         where:{
//           username: username,
//           password: encoder.encode(password)
//         }
//       })
//       .then(user => {
//         console.log("err,user",user);
//         if(!user){
//           done(null, false, {
//             message: '認証できませんでした。ユーザーが存在しないかパスワードが間違っています。'
//           });
//         }else{
//           done(null, user);
//         }
//       });
//   }
// ));


// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });
//
// passport.deserializeUser((userId, done) => {
//   Employee
//     .findById(userId)
//     .then(function(user){
//       return done(null, user.dataValues);
//     });
// });
