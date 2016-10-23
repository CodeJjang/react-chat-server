import $ from 'jquery';

export function loadRooms() {
	return $.ajax({
		url: process.env.REACT_APP_ROOMS_API_URL,
		dataType: 'json',
		xhrFields: {
			withCredentials: true
		}
	});
};

export function postRoom(room) {
	return $.ajax({
			url: process.env.REACT_APP_ROOMS_API_URL,
			xhrFields: {
				withCredentials: true
			},
			type: 'POST',
			dataType: 'json',
			data: room
		});
};