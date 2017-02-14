import Reflux from 'reflux';
import adminAction from './../actions/adminAction';

require('es6-promise').polyfill();
require('isomorphic-fetch');

const adminStore = Reflux.createStore({
  listenables: adminAction,

  getInitialState(){
    return{
      adopters: [],
    }
  },

  onGetAdopters(){
    const self = this;
    fetch('/api/adopter/',{
      credentials: 'include'
    })
      .then(response => {
        return response.json();
      })
      .then(res => {
        self.trigger({adopters: res});
      });
  }


});

export default adminStore;
