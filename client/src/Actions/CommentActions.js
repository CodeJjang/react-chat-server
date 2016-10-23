import * as ActionTypes from '../Constants/ActionTypes';
import * as CommentsApi from '../Api/CommentsApi';
import { BEGIN, COMMIT, REVERT } from 'redux-optimist';
import moment from 'moment';

function createComment(comment, transactionId) {
	return {
		type: ActionTypes.CREATE_COMMENT,
		optimist: {
			type: BEGIN,
			id: transactionId
		},
		comment
	};
}
;

function createCommentSuccess(comment, transactionId) {
	return {
		type: ActionTypes.CREATE_COMMENT_SUCCESS,
		optimist: {
			type: COMMIT,
			id: transactionId
		},
		comment
	};
}
;

function createCommentFailed(comment, transactionId) {
	return {
		type: ActionTypes.CREATE_COMMENT_FAILED,
		optimist: {
			type: REVERT,
			id: transactionId
		},
		comment
	};
}
;

export function postComment(comment) {
	return dispatch => {
		// create a transaction ID
		let transactionId = Date.now();
		// give the comment a temporary ID and createdAt
		comment.id = transactionId.toString();
		comment.createdAt = moment().format();
		dispatch(createComment(comment, transactionId));

		return CommentsApi.postComment(comment)
			.then(comment => {
				console.log('Posted comment.');
				dispatch(createCommentSuccess(comment, transactionId));
			})
			.catch(err => {
				console.log('Error in posting comment.');
				dispatch(createCommentFailed(comment, transactionId));
				throw (err);
			});
	};
}
;

function loadCommentsSuccess(comments) {
	return {
		type: ActionTypes.LOAD_COMMENTS_SUCCESS,
		comments
	};
}
;

export function loadComments(roomId) {
	return dispatch => {
		return CommentsApi.loadComments(roomId)
			.then(comments => {
				console.log('Comments loaded.');
				dispatch(loadCommentsSuccess(comments))
			})
			.catch(err => {
				console.log('Error in loading comments.');
				throw (err);
			});
	};
}
;
