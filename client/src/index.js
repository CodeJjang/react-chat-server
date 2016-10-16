import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './App';
import About from './Components/About';
import Chat from './Components/Chat';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
    	<IndexRoute component={Chat}/>
    	<Route path="/chat" component={Chat}/>
    	<Route path="/room/:id" component={Chat}/>
    	<Route path="/about" component={About}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
