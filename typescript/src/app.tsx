import * as React from "react";
import {render} from "react-dom";

import { createStore } from 'redux'
//import { Provider } from 'react-redux'
import HelloWorldComponent from './Component.tsx';

import App from './reducers/index.tsx';

const store = createStore(App);

function rendering(){
	render(
			<HelloWorldComponent
				onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
				value = {store.getState()}
			/>,
	document.getElementById("content")
	)
};

rendering();
store.subscribe(rendering);
