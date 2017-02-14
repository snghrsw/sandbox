import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import koiWebApp from './reducers'
import { createStore } from 'redux'
const store = createStore(koiWebApp);

import {Router, Route, IndexRoute, browserHistory} from 'react-router'

import App from './components/App.js';
import HelloWorldWithValueState from './containers/valueState.js';
import Detail from './components/Detail/Detail.js';

function clientRender(){
	render((
		<Provider store={store}>
			<Router history={browserHistory}>
				<Route path="/" component={App}>
					<IndexRoute component={HelloWorldWithValueState}/>
					<Route path="detail" component={Detail}/>
				</Route>
			</Router>
		</Provider>
	)
	, document.getElementById("content"))
}

clientRender();

