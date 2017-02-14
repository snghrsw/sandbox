import express  from 'express';
const router = express.Router();

import Adopter from './../../server/resources/adopterResource';
import filter from './routesFilter';

import facebookApi from './../facebookGraph';
import Sequelize from 'sequelize';

import _ from 'lodash';

// fbの友達一覧のうちまだ保留でも合うかもでもないユーザーを抽出
router.get('/api/adopter/friend', filter.onCheckLogin, (req,res)=>{
  facebookApi
    .getFriends()
    .then(fbAdopters =>{

      Adopter.findAll({
        where:Sequelize.and(
          {referralId: req.user.id},
          Sequelize.or(
            {isMatch: true},
            {isKeep: true}
          )
        )
      }).then(dbAdopters => {

        const filteredAdopters = _.reject(fbAdopters.data, n =>{
          n.thumbnailUrl = n.picture.data.url;
          let flagReject = false;
          _.forEach(dbAdopters, (dbAdopter, dbKey) => {
            if(n.name === dbAdopter.dataValues.name){
              flagReject = true;
            }
           });
          return flagReject;
        });

        res.json(filteredAdopters);

      });

    });
});

router.get('/api/adopter/match',filter.onCheckLogin,(req,res)=>{
  Adopter
    .findAll({
      where: {
        referralId: req.user.id,
        isMatch: true
      }
    })
    .then(data => {
      res.json(data);
    });
});

router.get('/api/adopter/keep',filter.onCheckLogin,(req,res)=>{
  Adopter
    .findAll({
      where: {
        referralId: req.user.id,
        isKeep: true
      }
    })
    .then(data => {
      res.json(data);
    });
});


router.get('/api/facebook/getAdopters',filter.onCheckLogin,(req,res)=>{
  facebookApi
    .getFriends()
    .then(fbAdopters =>{

      Adopter.findAll({
        where:{
          referralId: req.query.userId
        }
      }).then(dbAdopters => {

        _.forEach(fbAdopters.data, (fbAdopter, fbKey) => {
          _.forEach(dbAdopters, (dbAdopter, dbKey) =>{

            if(fbAdopter.name == dbAdopter.dataValues.name){
              fbAdopters.data[fbKey] = _.merge(fbAdopter, dbAdopter.dataValues);
            }else{
              fbAdopters.data[fbKey].isMatch = false;
              fbAdopters.data[fbKey].isKeep = false;
            }
          });
        });

        res.json(fbAdopters);

      });

    });
});


// const createAdopter = (req,res) =>{
//
// }
//
// const updateAdopterState = (req,res) =>{
//
// }


router.post('/api/adopter/match', filter.onCheckLogin, filter.checkAdopterParams, (req,res)=>{

  Adopter.findOrCreate({
    where:{
      name: req.body.name,
      referralId: req.user.id
    },
    defaults:{
      name: req.body.name,
      facebookId: req.body.id,
      thumbnailUrl: req.body.thumbnailUrl,
      referalId: req.user.id,
      commect: "",
      isMatch: true,
      isKeep:false,
      corporateDomain: req.user.corporateDomain
    }
  }).spread((user,created)=>{
    if(!created){
      console.log("updated");
      Adopter.update({
        isMatch: true,
        isKeep: false
      },{
        where:{
          name: req.body.name
        }
      }).then(result => {
        res.json({
          result: result,
          isCreated: created
        });
      });

    }else{
      res.json({
        user: user,
        isCreated: created
      });
    }
  });
});

router.post('/api/adopter/keep',filter.onCheckLogin, filter.checkAdopterParams, (req,res)=>{
  Adopter.findOrCreate({
    where:{
      name: req.body.name,
      referralId: req.user.id
    },
    defaults:{
      name: req.body.name,
      facebookId: req.body.id,
      thumbnailUrl: req.body.thumbnailUrl,
      referalId: req.user.id,
      commect: "",
      isKeep: true,
      isMatch: false,
      corporateDomain: req.user.corporateDomain
    }
  }).spread((user,created)=>{
    if(!created){
      Adopter.update({
        isMatch: false,
        isKeep: true
      },{
        where:{
          name: req.body.name
        }
      }).then(result => {
        res.json({
          result: result,
          isCreated: created
        });
      });
    }else{
      res.json({
        user: user,
        isCreated: created
      });
    }
  });
});

router.post('/api/adopter/cancel',filter.onCheckLogin, filter.checkAdopterParams, (req,res)=>{
  Adopter.findOrCreate({
    where:{
      name: req.body.name,
      referralId: req.user.id
    },
    defaults:{
      name: req.body.name,
      facebookId: req.body.id,
      thumbnailUrl: req.body.thumbnailUrl,
      referalId: req.user.id,
      commect: "",
      isKeep: false,
      isMatch: false,
      corporateDomain: req.user.corporateDomain
    }
  }).spread((user,created)=>{
    if(!created){
      Adopter.update({
        isMatch: false,
        isKeep: false
      },{
        where:{
          name: req.body.name
        }
      }).then(result => {
        res.json({
          result: result,
          isCreated: created
        });
      });
    }else{
      res.json({
        user: user,
        isCreated: created
      });
    }
  });
});


router.get('/api/adopter', filter.isAdmin, (req,res)=>{
  console.log(1,req.session,req.user);
  Adopter
    .findAll({
      where: {
        corporateDomain: req.user.corporateDomain,
        isMatch: true
      }
    })
    .then(data => {
      console.log(2,data);
      res.json(data);
    });
});


export default router;
