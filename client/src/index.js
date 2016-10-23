import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import ConfigureStore from './Store/ConfigureStore';
import Routes from './Routes';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'toastr/build/toastr.min.css';
import './index.css';

const store = ConfigureStore();

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}
			routes={Routes} />
	</Provider>,
	document.getElementById('root')
);
