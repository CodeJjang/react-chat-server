import * as ActionTypes from '../Constants/ActionTypes';
import * as CommentsApi from '../Api/CommentsApi';

export function createCommentSuccess(comment) {
    return { type: ActionTypes.CREATE_COMMENT_SUCCESS, comment };
};

export function postComment(comment) {
    return dispatch => {
    	return CommentsApi.postComment(comment)
    		.then(comment => {
    			console.log('Posted comment.');
    			dispatch(createCommentSuccess(comment))
    		})
    		.catch(err => {
    			console.log('Error in posting comment.');
    			throw(err);
    		});
    };
};

export function loadCommentsSuccess(comments) {
    return { type: ActionTypes.LOAD_COMMENTS_SUCCESS, comments };
};

export function loadComments(roomId) {
    return dispatch => {
    	return CommentsApi.loadComments(roomId)
    		.then(comments => {
    			console.log('Comments loaded.');
    			dispatch(loadCommentsSuccess(comments))
    		})
    		.catch(err => {
    			console.log('Error in loading comments.');
    			throw(err);
    		});
    };
};
