import { createStore, applyMiddleware } from 'redux';
import RootReducer from '../Reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

export default function(initialState) {
	return createStore (
			RootReducer,
			initialState,
			applyMiddleware(thunk, reduxImmutableStateInvariant())
		);
}