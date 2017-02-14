import React from 'react/addons';
import Reflux from 'reflux';

import adminStore from './../stores/adminStore';
import actions from './../actions/adminAction';

import reactAsync from 'react-async';

import _ from 'lodash';
import classNames from 'classnames';

import Adopter from './../components/AdopterItem';

var AdminDashBoard = React.createClass({

  mixins: [
    Reflux.connect(adminStore),
    Reflux.ListenerMixin
  ],

  componentWillMount(){
  },

  componentDidMount(){
    actions.getAdopters();
    // this.listenTo(adminStore, this.onChangeStore);
  },

  generateAdoptersComponent(adopters = []){
    if(adopters.length > 0){
      return adopters.map((adopter,i)=>{
        return(
          <Adopter isReview={true} adopter={adopter} />
        );
      }.bind(this));
    }
  },

  render(){
    return (
      <div id="adminDashBoard">

        <h2>推薦された従業員の友達</h2>

        <div className="adopters adopterItemList">
          {this.generateAdoptersComponent(this.state.adopters)}
        </div>

      </div>
    )
  }

});

export default AdminDashBoard;
