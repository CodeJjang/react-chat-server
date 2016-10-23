import * as ActionTypes from '../Constants/ActionTypes';
import InitialState from './InitialState';

export default function(state = InitialState.comments, action) {
	switch(action.type) {
		case ActionTypes.CREATE_COMMENT:
			return [...state,
				Object.assign({}, action.comment)];
		case ActionTypes.LOAD_COMMENTS_SUCCESS:
			return action.comments;
		default:
			return state;
	}
};