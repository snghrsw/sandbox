import React from 'react';
import {Route, DefaultRoute, RouteHandler, NotFoundRoute} from 'react-router';
import AdminDashBoard from './client/views/AdminDashBoard';
import EmployeeDashBoard from './client/views/EmployeeDashBoard';

import Header from './client/components/Header';
import Footer from './client/components/Footer';

const App = React.createClass({

  getDefaultProps(){
    return{
      initialState: null
    }
  },

  render(){
    return (
      <div id="container">
        <RouteHandler initialState={this.props.initialState} />
      </div>
    );
  }
});

const routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="adminDashBoard" path="/:domain/admin/" handler={AdminDashBoard} />
    <Route name="employeeDashBoard" path="/:domain" handler={EmployeeDashBoard} />
    <DefaultRoute handler={EmployeeDashBoard} />
    <NotFoundRoute handler={EmployeeDashBoard}/>
  </Route>
);


export default routes;
