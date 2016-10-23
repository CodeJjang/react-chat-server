import * as ActionTypes from '../Constants/ActionTypes';
import InitialState from './InitialState';

export default function(state = InitialState.rooms, action) {
	switch(action.type) {
		case ActionTypes.CREATE_ROOM:
			return [...state,
				Object.assign({}, action.room)];
		case ActionTypes.LOAD_ROOMS_SUCCESS:
			return action.rooms;
		default:
			return state;
	}
};