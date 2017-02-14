import React from 'react/addons';
import Reflux from 'reflux';

import employeeStore from './../stores/employeeStore';
import actions from './../actions/employeeAction';

import reactAsync from 'react-async';

import _ from 'lodash';
import classNames from 'classnames';

import Adopter from './../components/AdopterItem';



const EmployeeDashBoard = React.createClass({

  mixins: [
    Reflux.connect(employeeStore),
    Reflux.ListenerMixin
  ],

  componentWillMount(){
  },

  componentDidMount(){
    actions.getFriends();
    actions.getMatches();
    actions.getKeeps();

    this.listenTo(employeeStore, this.onChangeStore);
  },

  onChangeStore(status){
    console.log("onChangeStore",status);
    if(status.recentryAction === "match"){
      actions.getFriends();
      actions.getMatches();
      actions.getKeeps();
    }
    if(status.recentryAction === "keep"){
      actions.getFriends();
      actions.getMatches();
      actions.getKeeps();
    }
    if(status.recentryAction === "cancel"){
      actions.getFriends();
      actions.getMatches();
      actions.getKeeps();
    }
  },

  generateAdoptersComponent(adopters = []){
    if(adopters.length > 0){
      return adopters.map((adopter,i)=>{
        return(
          <Adopter adopter={adopter} />
        );
      }.bind(this));
    }
  },

  render(){

    return (
      <div id="employeeDashBoard">

        <div>
          <h2>推薦中（32）</h2>
          <div className="adopters adopters-match adopterItemList">
            { this.generateAdoptersComponent(this.state.matches) }
          </div>
        </div>

        <div>
          <h2>候補（32）</h2>
          <div className="adopters adopters-keep adopterItemList">
            { this.generateAdoptersComponent(this.state.keeps) }
          </div>
        </div>

        <div>
          <h2>あなたの友達（354）</h2>
          <div className="adopters adopters-friend adopterItemList">
            { this.generateAdoptersComponent(this.state.friends) }
          </div>
        </div>

      </div>
    );
  }

});


export default EmployeeDashBoard;
