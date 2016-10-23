import * as ActionTypes from '../Constants/ActionTypes';
import * as UsersApi from '../Api/UsersApi';

function loadUsersSuccess(users) {
	return {
		type: ActionTypes.LOAD_USERS_SUCCESS,
		users
	};
}

export function loadUsers(roomId) {
	return dispatch => {
		return UsersApi.loadUsers(roomId)
			.then(users => {
				console.log('Users loaded.');
				dispatch(loadUsersSuccess(users))
			})
			.catch(err => {
				console.log('Error in loading users.');
				throw (err);
			});
	};
}