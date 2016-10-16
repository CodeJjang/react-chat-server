import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './App';
import RoomBox from './Components/RoomBox';
import Chat from './Components/Chat';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
    	<IndexRoute component={Chat}/>
    	<Route path="/chat" component={Chat}/>
    	<Route path="/rooms" component={RoomBox}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
