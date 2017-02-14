import React from 'react/addons';
import Reflux from 'reflux';
import {Navigation, Router} from 'react-router';

const Header = React.createClass({

  getDefaultProps(){
    return{
      initialState: null
    }
  },

  mixins:[
    Navigation
  ],

  changeToFriends(){

  },

  changeToKeep(){

  },

  changeToMatch(){

  },

  render(){
    return (
      <div id="header">
        <div onClick={this.changeToFriends}>友達の一覧（435）</div>
        <div onClick={this.changeToKeep}>保留中（11）</div>
        <div onClick={this.changeToMatch}>合いそう（11）</div>
      </div>
    )
  }

});

// {this.props.initialState.user}
export default Header;
