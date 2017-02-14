import Corporate from './../../server/resources/corporateResource';
import React    from 'react/addons';
import EmployeeSignIn from './../../client/views/EmployeeSignIn';
import AdminSignIn from './../../client/views/AdminSignIn';



// const isAlreadyCreatedAdopter = (req,res,next)=>{
//
// }

const setLoginSession = (req,res,next) => {
  if(req.path.indexOf('/admin') > -1){
    req.session.loginState = "admin"
  }else{
    req.session.loginState = "employee"
  }
  next();
};

const checkAdopterParams = (req,res,next) =>{
  // console.log(req.body);
  if(req.body.name){
    next();
  }else{
    console.log("body parameter is not found ", req.body,req.params,req.query);
    next(new Error('body parameter is not found'));
  }
}

const onRenderSignInPage = (req,res,next) =>{
  console.log("cadmin",req.path,req.params);
  if(req.path.indexOf('/admin') > -1){
    var html = React.renderToString(<AdminSignIn />);
    res.render('adminSignIn', {content: html});
  }else{
    var html = React.renderToString(<EmployeeSignIn />);
    res.render('employeeSignIn', {content: html});
  }
}


const isAdmin = (req,res,next) => {
  if(req.isAuthenticated() && req.session.loginState === 'admin'){
    return next();
  }else{
    return next(new Error('you are not admin user'));
  }
}

const isEmployee = (req,res,next) => {
  if(req.isAuthenticated() && req.session.loginState === 'employee'){
    return next();
  }else{
    return next(new Error('you are not employee user'));
  }
}

const onCheckLogin = (req,res,next) =>{

  if(!req.isAuthenticated() && typeof req.user === 'undefined' &&  typeof req.session.user === 'undefined'){
    if(req.path.indexOf('/api') === -1){
      return onRenderSignInPage(req,res,next);
    }else{
      return next(new Error('this api must require your login'));
    }
  }

  if(typeof req.session.loginState === 'undefined'){
    if(req.path.indexOf('/api') === -1){
      return onRenderSignInPage(req,res,next);
    }else{
      return next(new Error('this api must require your login, your session is  not found'));
    }
  }

  if(req.path.indexOf('/admin') > -1 ^ req.session.loginState === 'admin'){
    if(req.path.indexOf('/api') === -1){
      return onRenderSignInPage(req,res,next);
    }else{
      return next(new Error('this api must require your login, your session is not admin'));
    }
  }

  if(req.path.indexOf('/admin') === -1 ^ req.session.loginState === 'employee'){
    if(req.path.indexOf('/api') === -1){
      return onRenderSignInPage(req,res,next);
    }else{
      return next(new Error('this api must require your login, your session is not employee'));
    }
  }

  if(req.user.id){
    req.session.user = req.user;
  }

  return next();
};

const onCheckCorporateDomain = (req,res,next)=>{
  console.log("af",req.path,req.params,req.session,req.user,req.passport);
  Corporate
    .findOne({
      where: {domain: req.params[0]}
    })
    .then(result => {
      if(result){
        req.session.domain = req.params[0];
        next();
      }else{
        next(new Error('corporate is not found'));
      }
    });
}


export default {
  onCheckLogin,
  onCheckCorporateDomain,
  checkAdopterParams,
  setLoginSession,
  isEmployee,
  isAdmin
}
