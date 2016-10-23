import * as ActionTypes from '../Constants/ActionTypes';
import InitialState from './InitialState';

export default function(state = InitialState.users, action) {
	switch(action.type) {
		case ActionTypes.LOAD_USERS_SUCCESS:
			return action.users;
		default:
			return state;
	}
};