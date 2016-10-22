import * as ActionTypes from '../Constants/ActionTypes';

export function createComment(comment) {
	return { type: ActionTypes.CREATE_COMMENT, comment };
};