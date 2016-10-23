import $ from 'jquery';

export function loadUsers(roomId) {
	return $.ajax({
		url: process.env.REACT_APP_USERS_API_URL,
		dataType: 'json',
		data: {
			roomId: roomId
		},
		xhrFields: {
			withCredentials: true
		}
	});
};