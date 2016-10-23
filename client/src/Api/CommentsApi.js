import $ from 'jquery';

export function loadComments(roomId) {
	return $.ajax({
		url: process.env.REACT_APP_COMMENTS_API_URL,
		dataType: 'json',
		data: {
			roomId: roomId
		},
		xhrFields: {
			withCredentials: true
		}
	});
};