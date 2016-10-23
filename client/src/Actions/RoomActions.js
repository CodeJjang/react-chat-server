import * as ActionTypes from '../Constants/ActionTypes';
import * as RoomsApi from '../Api/RoomsApi';
import { BEGIN, COMMIT, REVERT } from 'redux-optimist';

function createRoom(room, transactionId) {
	return {
		type: ActionTypes.CREATE_ROOM,
		optimist: {
			type: BEGIN,
			id: transactionId
		},
		room
	};
}

function createRoomSuccess(room, transactionId) {
	return {
		type: ActionTypes.CREATE_ROOM_SUCCESS,
		optimist: {
			type: COMMIT,
			id: transactionId
		},
		room
	};
}

function createRoomFailed(room, transactionId) {
	return {
		type: ActionTypes.CREATE_ROOM_FAILED,
		optimist: {
			type: REVERT,
			id: transactionId
		},
		room
	};
}

export function postRoom(room) {
	return dispatch => {
		// create a transaction ID
		let transactionId = Date.now();
		dispatch(createRoom(room, transactionId));

		return RoomsApi.postRoom(room)
			.then(room => {
				console.log('Posted room.');
				dispatch(createRoomSuccess(room, transactionId));
			})
			.catch(err => {
				console.log('Error in posting room.');
				dispatch(createRoomFailed(room, transactionId));
				throw (err);
			});
	};
};

function loadRoomsSuccess(rooms) {
	return {
		type: ActionTypes.LOAD_ROOMS_SUCCESS,
		rooms
	};
}

export function loadRooms(roomId) {
	return dispatch => {
		return RoomsApi.loadRooms(roomId)
			.then(rooms => {
				console.log('Rooms loaded.');
				dispatch(loadRoomsSuccess(rooms))
			})
			.catch(err => {
				console.log('Error in loading rooms.');
				throw (err);
			});
	};
};
