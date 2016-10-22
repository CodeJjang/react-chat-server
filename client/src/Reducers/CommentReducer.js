import * as ActionTypes from '../Constants/ActionTypes';

export default function(state = [], action) {
	switch(action.type) {
		case ActionTypes.CREATE_COMMENT:
			return [...state,
				Object.assign({}, action.comment)];
		default:
			return state;
	}
};