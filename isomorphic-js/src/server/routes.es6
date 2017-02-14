import express  from 'express';
import passport from 'passport';
import React    from 'react/addons';
import clientRoutes   from './../routes';
import reactRouter   from 'react-router';
import Reflux from 'reflux';

import EmployeeDashBoard   from './../client/views/EmployeeDashBoard';
import EmployeeSignIn from './../client/views/EmployeeSignIn';
import AdminSignIn from './../client/views/AdminSignIn';

import Employee from './../server/resources/employeeResource';

import CONFIG from './../../config.json';

import {Strategy as FacebookStrategy} from 'passport-facebook';

const router = express.Router();

import facebookApi from './facebookGraph';
import reactAsync from 'react-async';

import _ from 'lodash';

import adopterRoutes from './routes/adopterRoutes';
import filter from './routes/routesFilter';

// router.all(, (req,res)=>{
//   res.json({
//     api: 1,
//     path: req.path,
//     params: req.params
//   });
// });
//
// router.all('*', (req,res)=>{
//   res.json({
//     api: 2,
//     path: req.path,
//     params: req.params
//   });
// });
//

router.use(adopterRoutes);

const REG = {
  INDEX: /^\/(\w*(?!(\.)))\/*$/,
  ADMIN: /^\/(\w+(?!(\.)))\/admin*$/,
  INDEX_AND_ADMIN: /^\/(\w+(?!(\.)))\/*(?:admin\/)*$/
}

router.get('/auth/facebook/callback', (req,res,next) => {
  passport.authenticate('facebook', {
		successRedirect: '/' + req.session.domain + '/',
    failureRedirect: '/',
    failureFlash : true
  })(req,res,next);
});

router.get('/:domain/auth/facebook', filter.setLoginSession, passport.authenticate('facebook',{
  scope: ['public_profile','user_friends']
}));

// router.get('/:domain/admin/auth/facebook', passport.authenticate('facebook',{
//   scope: ['public_profile','user_friends']
// }));

// router.post('/:domain/admin/auth/local',
//   passport.authenticate('local',{
//     successRedirect: '/admin',
//     failureRedirect: '/admin',
//     failureFlash: true }));

router.post('/:domain/admin/auth/local', filter.setLoginSession,(req,res,next) => {
  passport.authenticate('local', {
		successRedirect: '/' + req.session.domain + '/admin/',
    failureRedirect: '/' + req.session.domain + '/admin/',
    failureFlash : true
  })(req,res,next);
});


router.get('/:domain/auth/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});



function hasUser(req,res,next){
  if(req.user || req.session.passport.userId){
    next();
  }else{
    next(new Error('this api must user data cookie'));
  }
}



// router.get(REG.INDEX, filter.onCheckCorporateDomain,  filter.onCheckLogin, (req, res, next) => {
//
//   reactRouter.run(clientRoutes, req.path, (Root, state) => {
//       let html = React.renderToString(<Root />);
//       res.render('index', {content: html, initialState:
//        JSON.stringify(state) });
//     });
// });


router.get(REG.INDEX_AND_ADMIN, filter.onCheckCorporateDomain,  filter.onCheckLogin, (req, res, next) => {

  reactRouter.run(clientRoutes, req.path, (Root, state) => {
    // reactAsync.renderToStringAsync(<Root />,(err, html) => {
    //   if(err){
    //     console.log("renderToStringAsync-Error", err);
    //     next(new Error('renderToStringAsync not'));
    //   }
      let html = React.renderToString(<Root />);
      // console.log("####end of the async render", {html:html, state:state});
      // state.user = req.user;
      res.render('index', {content: html, initialState:
       JSON.stringify(state) });
    });
  // });
});

router.use(function(err,req,res,next){
  res.status(500).json({error: err, message: err.message});
});

export default router;
