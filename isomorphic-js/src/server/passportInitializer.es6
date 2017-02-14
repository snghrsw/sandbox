"use strict";

import passport from 'passport';

import Adopter from './resources/adopterResource';
import Employee from './resources/employeeResource';
import Corporate from './resources/corporateResource';

import {Strategy as FacebookStrategy} from 'passport-facebook';
import {Strategy as LocalStrategy} from 'passport-local';

import CONFIG from './../../config.json';
import facebookApi from './facebookGraph';
import encoder from './encoder';

passport.use(new FacebookStrategy({
    clientID: CONFIG[process.env.NODE_ENV].FACEBOOK.CLIENT_ID,
    clientSecret: CONFIG[process.env.NODE_ENV].FACEBOOK.CLIENT_SECRET,
    callbackURL: CONFIG[process.env.NODE_ENV].FACEBOOK.CALLBACK_URL,
    passReqToCallback: true
  },
  function(req, accessToken, refreshToken, fbUser, done){
      facebookApi.setToken(accessToken);
      Employee.findOrCreate({
        where: {name: fbUser.displayName},
        defaults:{
          name: fbUser.displayName,
          corporateDomain: req.session.domain,
          facebookId: fbUser.id,
          thumbnailUrl: fbUser.thumbnailUrl
        }
      })
        .spread(function(dbUser, created) {
          done(null, dbUser);
        });
  }
));


passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  function(username, password, done) {
    console.log("username,password",username,password,encoder.encode(password));

    Corporate
      .findOne({
        where:{
          username: username,
          password: encoder.encode(password)
        }
      })
      .then(user => {
        if(user === null){
          return done(null, false);
        }else{
          return done(null, user);
        }
      });
  }
));


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  Employee
    .findById(userId)
    .then(function(user){
      return done(null, user.dataValues);
    });
});
