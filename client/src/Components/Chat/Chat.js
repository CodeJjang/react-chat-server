import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CommentActions from '../../Actions/CommentActions';
import $ from 'jquery';
import CommentBox from './CommentBox';
import UserBox from './UserBox';
import RoomBox from './RoomBox';

class Chat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			commentsApiUrl: 'http://localhost:1337/comment',
			usersApiUrl: 'http://localhost:1337/user',
			roomsApiUrl: 'http://localhost:1337/room',
			comments: [],
			users: [],
			rooms: []
		};

		// comments methods
		this.loadComments = this.loadComments.bind(this);
		this.postComment = this.postComment.bind(this);
		this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
		this.registerToCommentsSyncMessages = this.registerToCommentsSyncMessages.bind(this);
		this.unregisterToCommentsSyncMessages = this.unregisterToCommentsSyncMessages.bind(this);

		// users methods
		this.loadUsers = this.loadUsers.bind(this);
		this.registerToUsersSyncMessages = this.registerToUsersSyncMessages.bind(this);
		this.unregisterToUsersSyncMessages = this.unregisterToUsersSyncMessages.bind(this);

		// rooms methods
		this.loadRooms = this.loadRooms.bind(this);
		this.registerToRoomsSyncMessages = this.registerToRoomsSyncMessages.bind(this);
		this.unregisterToRoomsSyncMessages = this.unregisterToRoomsSyncMessages.bind(this);
		this.postRoom = this.postRoom.bind(this);
		this.handleRoomSubmit = this.handleRoomSubmit.bind(this);

		// general methods
		this.joinRoom = this.joinRoom.bind(this);
		this.onAuthenticated = this.onAuthenticated.bind(this);
		this.registerToSyncMessages = this.registerToSyncMessages.bind(this);
		this.unregisterToSyncMessages = this.unregisterToSyncMessages.bind(this);
		this.loadData = this.loadData.bind(this);

		this.requests = [];

	}
	joinRoom() {
		(this.props.params.id
			? this.props.socket.joinRoom(this.props.params.id)
			: this.props.socket.joinGlobalRoom())
			.then(() => {
				return this.onAuthenticated();
			})
			.catch(err => {
				if (err) {
					console.log(err);
				}
			});
	}
	componentDidMount() {
		this.joinRoom();
	}
	componentWillUnmount() {
		this.unregisterToSyncMessages();
		this.requests.forEach((req) => req.abort());
	}
	onAuthenticated() {
		return this.registerToSyncMessages()
			.then(this.loadData);
	}
	registerToSyncMessages() {
		return this.registerToCommentsSyncMessages()
			.then(this.registerToUsersSyncMessages)
			.then(this.registerToRoomsSyncMessages);
	}
	unregisterToSyncMessages() {
		return this.unregisterToCommentsSyncMessages()
			.then(this.unregisterToUsersSyncMessages)
			.then(this.unregisterToRoomsSyncMessages);
	}
	registerToCommentsSyncMessages() {
		this.props.socket.commentsSyncCallback = this.loadComments;
		return Promise.resolve();
	}
	unregisterToCommentsSyncMessages() {
		this.props.socket.commentsSyncCallback = undefined;
		return Promise.resolve();
	}
	registerToUsersSyncMessages() {
		this.props.socket.usersSyncCallback = this.loadUsers;
		return Promise.resolve();
	}
	unregisterToUsersSyncMessages() {
		this.props.socket.usersSyncCallback = undefined;
		return Promise.resolve();
	}
	registerToRoomsSyncMessages() {
		this.props.socket.roomsSyncCallback = this.loadRooms;
		return Promise.resolve();
	}
	unregisterToRoomsSyncMessages() {
		this.props.socket.roomsSyncCallback = undefined;
		return Promise.resolve();
	}
	loadData() {
		return this.loadComments()
			.then(this.loadUsers)
			.then(this.loadRooms);
	}
	loadRooms() {
		var req = $.ajax({
			url: this.state.roomsApiUrl,
			dataType: 'json',
			xhrFields: {
				withCredentials: true
			},
			success: function(rooms) {
				this.setState({
					rooms: rooms
				});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.state.roomsApiUrl, status, err.toString());
			}.bind(this)
		});
		this.requests.push(req);
		return req;
	}
	loadUsers() {
		var req = $.ajax({
			url: this.state.usersApiUrl,
			dataType: 'json',
			data: {
				roomId: this.props.params.id
			},
			xhrFields: {
				withCredentials: true
			},
			success: function(users) {
				this.setState({
					users: users
				});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.state.usersApiUrl, status, err.toString());
			}.bind(this)
		});
		this.requests.push(req);
		return req;
	}
	loadComments() {
		var req = $.ajax({
			url: this.state.commentsApiUrl,
			dataType: 'json',
			data: {
				roomId: this.props.params.id
			},
			xhrFields: {
				withCredentials: true
			},
			success: function(comments) {
				console.log('Comments loaded.');
				this.setState({
					comments: comments
				});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.state.commentsApiUrl, status, err.toString());
			}.bind(this)
		});
		this.requests.push(req);
		return req;
	}
	postComment(comment) {
		// add roomId to comment
		comment.roomId = this.props.params.id;

		// optimistic posting
		const oldComments = this.state.comments;
		comment.id = Date.now();
		const newComments = oldComments.concat([comment]);
		this.setState({
			comments: newComments
		});
		var req = $.ajax({
			url: this.state.commentsApiUrl,
			xhrFields: {
				withCredentials: true
			},
			type: 'POST',
			dataType: 'json',
			data: comment,
			success: function(comment) {
				this.setState({
					comments: oldComments.concat([comment])
				});
			}.bind(this),
			error: function(xhr, status, err) {
				this.setState({
					comments: oldComments
				});
				console.error(this.state.commentsApiUrl, status, err.toString());
			}.bind(this)
		});
		this.requests.push(req);
		return req;
	}
	postRoom(room) {
		var oldRooms = this.state.rooms;
		var req = $.ajax({
			url: this.state.roomsApiUrl,
			xhrFields: {
				withCredentials: true
			},
			type: 'POST',
			dataType: 'json',
			data: room,
			success: function(room) {
				this.setState({
					rooms: oldRooms.concat([room])
				});
			}.bind(this),
			error: function(xhr, status, err) {
				this.setState({
					rooms: oldRooms
				});
				console.error(this.state.roomsApiUrl, status, err.toString());
			}.bind(this)
		});
		this.requests.push(req);
		return req;
	}
	handleRoomSubmit(room) {
		this.postRoom(room);
	}
	handleCommentSubmit(comment) {
		this.postComment(comment);
	}
	render() {
		return (
			<div>
				<UserBox users={this.state.users} />
				<CommentBox onCommentSubmit={this.handleCommentSubmit}
					comments={this.state.comments} />
				<RoomBox onRoomSubmit={this.handleRoomSubmit}
					rooms={this.state.rooms} />
			</div>
			);
	}
}

Chat.propTypes = {
	params: PropTypes.shape({
		id: PropTypes.string
	}),
	socket: PropTypes.object,
	comments: CommentBox.propTypes.comments,
	actions: PropTypes.object
};

function mapStateToProps(state, ownProps) {
	return {
		comments: state.comments
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(CommentActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);