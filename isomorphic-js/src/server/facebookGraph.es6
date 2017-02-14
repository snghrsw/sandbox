// import fbgraph from 'fbgraph';
import FB from 'facebook-node';

function setToken(accessToken){
  FB.setAccessToken(accessToken);
}

function getFriends(){
  return new Promise(resolve => {
    FB.api('me/taggable_friends?locale=ja',(res)=>{
      resolve(res);
    });
  });
}


export default {
  setToken,
  getFriends
};
