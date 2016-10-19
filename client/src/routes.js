import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import About from './Components/About';
import Chat from './Components/Chat';

export default (
	<Route path="/" component={App}>
    	<IndexRoute component={Chat}/>
    	<Route path="/room/:id" component={Chat}/>
    	<Route path="/about" component={About}/>
    </Route>
);