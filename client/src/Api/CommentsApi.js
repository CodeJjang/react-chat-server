import $ from 'jquery';
import * as config from '../Config';

export function loadComments(roomId) {
	return $.ajax({
		url: config.COMMENTS_API_URL,
		dataType: 'json',
		data: {
			roomId: roomId
		},
		xhrFields: {
			withCredentials: true
		}
	});
};