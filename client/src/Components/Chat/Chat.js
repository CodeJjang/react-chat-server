import React, { Component, PropTypes } from 'react';
import $ from 'jquery';
import CommentBox from './CommentBox';
import UserBox from './UserBox';
import RoomBox from './RoomBox';

class Chat extends Component {
	constructor(props) {
		super( props );
		this.state = {
			authenticated: false,
			commentsApiUrl: 'http://localhost:1337/comment',
			usersApiUrl: 'http://localhost:1337/user',
			roomsApiUrl: 'http://localhost:1337/room',
			comments: [],
			users: [],
			rooms: []
		};

		// comments methods
		this.loadComments = this.loadComments.bind( this );
		this.postComment = this.postComment.bind( this );
		this.handleCommentSubmit = this.handleCommentSubmit.bind( this );
		this.registerToCommentsSyncMessages = this.registerToCommentsSyncMessages.bind(this);

		// users methods
		this.loadUsers = this.loadUsers.bind( this );		
		this.registerToUsersSyncMessages = this.registerToUsersSyncMessages.bind(this);

		// rooms methods
		this.loadRooms = this.loadRooms.bind( this );
		this.registerToRoomsSyncMessages = this.registerToRoomsSyncMessages.bind( this );
		this.postRoom = this.postRoom.bind(this);
		this.handleRoomSubmit = this.handleRoomSubmit.bind(this);

		// general methods
		this.joinRoom = this.joinRoom.bind(this);
		this.onAuthenticated = this.onAuthenticated.bind(this);
		this.registerToSyncMessages = this.registerToSyncMessages.bind(this);
		this.loadData = this.loadData.bind(this);

	}
	joinRoom() {
		(this.props.params.id
			? this.props.socket.joinRoom(this.props.params.id)
			: this.props.socket.joinGlobalRoom())
				.then( () => {
					this.setState( {
						authenticated: true
					} );
					this.onAuthenticated();
				} )
				.catch( err => {
					if (err) {
						console.log( err );
					}
				} );
	}
	componentDidMount() {
		this.joinRoom();
	}
	componentDidUpdate(prevProps, prevState) {
		if(prevProps.params.id !== this.props.params.id) {
			this.joinRoom();
		}
	}
	onAuthenticated() {
		this.registerToSyncMessages()
			.then(this.loadData)
			.catch(err => {
					console.log(err);
				});
	}
	registerToSyncMessages() {
		return this.registerToCommentsSyncMessages()
			.then(this.registerToUsersSyncMessages)
			.then(this.registerToRoomsSyncMessages);
	}
	registerToCommentsSyncMessages() {
		this.props.socket.commentsSyncCallback = this.loadComments;
		return Promise.resolve();
	}
	registerToUsersSyncMessages() {
		this.props.socket.usersSyncCallback = this.loadUsers;
		return Promise.resolve();
	}
	registerToRoomsSyncMessages() {
		this.props.socket.roomsSyncCallback = this.loadRooms;
		return Promise.resolve();
	}
	loadData() {
		return this.loadComments()
			.then(this.loadUsers)
			.then(this.loadRooms);
	}
	loadRooms() {
		return $.ajax( {
			url: this.state.roomsApiUrl,
			dataType: 'json',
			xhrFields: {
				withCredentials: true
			},
			success: function(rooms) {
				this.setState( {
					rooms: rooms
				} );
			}.bind( this ),
			error: function(xhr, status, err) {
				console.error( this.state.roomsApiUrl, status, err.toString() );
			}.bind( this )
		} );
	}
	loadUsers() {
		return $.ajax( {
			url: this.state.usersApiUrl,
			dataType: 'json',
			data: { roomId: this.props.params.id },
			xhrFields: {
		    	withCredentials: true
		   	},
			success: function(users) {
				this.setState( {
					users: users
				} );
			}.bind( this ),
			error: function(xhr, status, err) {
				console.error( this.state.usersApiUrl, status, err.toString() );
			}.bind( this )
		} );
	}
	loadComments() {
		return $.ajax( {
			url: this.state.commentsApiUrl,
			dataType: 'json',
			data: { roomId: this.props.params.id },
			xhrFields: {
		    	withCredentials: true
		   	},
			success: function(comments) {
				console.log('Comments loaded.');
				this.setState( {
					comments: comments
				} );
			}.bind( this ),
			error: function(xhr, status, err) {
				console.error( this.state.commentsApiUrl, status, err.toString() );
			}.bind( this )
		} );
	}
	postComment(comment) {
		// add roomId to comment
		comment.roomId = this.props.params.id;
		
		// optimistic posting
		var oldComments = this.state.comments;
		comment.id = Date.now();
		var newComments = oldComments.concat([comment]);
		this.setState( {
			comments: newComments
		} );
		$.ajax( {
			url: this.state.commentsApiUrl,
			xhrFields: {
		    	withCredentials: true
		   	},
			type: 'POST',
			dataType: 'json',
			data: comment,
			success: function(comment) {
				this.setState( {
					comments: oldComments.concat([comment])
				});
			}.bind( this ),
			error: function(xhr, status, err) {
				this.setState( {
					comments: oldComments
				});
				console.error( this.state.commentsApiUrl, status, err.toString() );
			}.bind( this )
		} );
	}
	postRoom(room) {
		var oldRooms = this.state.rooms;
		$.ajax( {
			url: this.state.roomsApiUrl,
			xhrFields: {
		    	withCredentials: true
		   	},
			type: 'POST',
			dataType: 'json',
			data: room,
			success: function(room) {
				this.setState( {
					rooms: oldRooms.concat([room])
				});
			}.bind( this ),
			error: function(xhr, status, err) {
				this.setState( {
					rooms: oldRooms
				});
				console.error( this.state.roomsApiUrl, status, err.toString() );
			}.bind( this )
		} );
	}
	handleRoomSubmit(room) {
		this.postRoom(room);
	}
	handleCommentSubmit(comment) {
		this.postComment( comment );
	}
	render() {
		return (
			<div>
				<UserBox users={this.state.users} />
				<CommentBox
					onCommentSubmit={this.handleCommentSubmit}
					comments={this.state.comments} />
				<RoomBox 
					onRoomSubmit={this.handleRoomSubmit}
					rooms={this.state.rooms} />
			</div>
			);
	}
}

Chat.propTypes = {
	params: PropTypes.shape({
		id: PropTypes.string
	}),
	socket: PropTypes.object
};

export default Chat;