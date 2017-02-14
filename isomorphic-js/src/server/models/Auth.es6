"use strict";

import passport from 'passport';
import {Strategy as FacebookStrategy} from 'passport-facebook';
import User from './resources/userResource';


function serializeUser(user, done){
  done(null, user.id);
}

function deserializeUser(userId, done){
  User
    .findById(userId)
    .then(function(user){
      return done(null, user.dataValues);
    });
}

function authenticate(){
  return
    ({
      clientID: '706858296126415',
      clientSecret: '7a0b5b3c7fd93804c6391a3d93578d3c',
      callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    function(accessToken, refreshToken, fbUser, done){
      User.findOrCreate({where: {name: fbUser.displayName}})
        .spread(function(dbUser, created) {
          return done(null, dbUser);
        });
    });
}

export default {
  serializeUser,
  deserializeUser,
  authenticate
}
