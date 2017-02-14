import Reflux from 'reflux';
import employeeAction from './../actions/employeeAction';

require('es6-promise').polyfill();
require('isomorphic-fetch');
// import fetch     from 'isomorphic-fetch';
// import EasyAgent from 'easyagent';
// EasyAgent.setFetchFunction(fetch);


const employeeStore = Reflux.createStore({
  listenables: employeeAction,

  getInitialState(){
    return{
      adopters: [],
      paging: {},
      friends: [],
      matches: [],
      keeps: [],
      recentryAction: null
    }
  },

  onGetFriends(){
    const self = this;
    fetch('/api/adopter/friend',{
      credentials: 'include'
    })
      .then(response => {
        return response.json();
      })
      .then(res => {
        self.trigger({friends: res});
      });
  },

  onGetMatches(){
    const self = this;
    fetch('/api/adopter/match',{
      credentials: 'include'
    })
      .then(response => {
        return response.json();
      })
      .then(res => {
        self.trigger({matches: res});
      });
  },

  onGetKeeps(){
    const self = this;
    fetch('/api/adopter/keep',{
      credentials: 'include'
    })
      .then(response => {
        return response.json();
      })
      .then(res => {
        self.trigger({keeps: res});
      });
  },

  // onGetAdopters(_userId){
  //   let self = this;
  //   console.log("onGetAdopters",_userId);
  //   EasyAgent
  //     .get('/api/facebook/getAdopters')
  //     .setQueries({ userId: _userId })
  //     .fetchJson()
  //     .then(result => {
  //       console.log("!!!!!!!!!!!!!!!!!onGetAdopters",result);
  //       self.trigger({
  //         adopters: result.data,
  //         paging: result.paging
  //       });
  //     });
  // },
  //

  onMatch(adopter){
    fetch('/api/adopter/match',{
      method: 'POST',
      body: JSON.stringify(adopter),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.trigger({recentryAction: "match"});
      });
  },


  onKeep(adopter){
    fetch('/api/adopter/keep',{
      method: 'POST',
      body: JSON.stringify(adopter),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.trigger({recentryAction: "keep"});
      });
  },

  onCancel(adopter){
    fetch('/api/adopter/cancel',{
      method: 'POST',
      body: JSON.stringify(adopter),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.trigger({recentryAction: "cancel"});
      });
  }


});

export default employeeStore;
