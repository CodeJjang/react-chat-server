import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CommentActions from '../../Actions/CommentActions';
import * as UserActions from '../../Actions/UserActions';
import * as RoomActions from '../../Actions/RoomActions';
import moment from 'moment';
import toastr from 'toastr';
import CommentBox from './CommentBox';
import UserBox from './UserBox';
import RoomBox from './RoomBox';

class Chat extends Component {
	constructor(props) {
		super(props);
		
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
	componentWillReceiveProps(nextProps) {
		if(this.props.params.id !== nextProps.params.id) {
			this.joinRoom();
		}
	}
	componentDidMount() {
		this.joinRoom();
	}
	componentWillUnmount() {
		this.unregisterToSyncMessages();
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
	loadComments() {
		return this.props.commentActions.loadComments(this.props.params.id);
	}
	loadRooms() {
		return this.props.roomActions.loadRooms();
	}
	loadUsers() {
		return this.props.userActions.loadUsers(this.props.params.id);
	}
	postComment(comment) {
		// add roomId to comment
		comment.roomId = this.props.params.id;
		// give the comment a temp ID and createdAt
		comment.id = Date.now().toString();
		comment.createdAt = moment().format();

		return this.props.commentActions.postComment(comment)
			.catch(err => {
				if(err) {
					console.log(err);
					toastr.error('Failed posting comment', undefined, {timeout: 2000});
				}
			});
	}
	postRoom(room) {
		// give the room a temp ID
		room.id = Date.now().toString();
		return this.props.roomActions.postRoom(room)
			.catch(err => {
				if(err) {
					console.log(err);
					toastr.error('Failed creating room', undefined, {timeout: 2000});
				}
			})
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
				<UserBox users={this.props.users} />
				<CommentBox onCommentSubmit={this.handleCommentSubmit}
					comments={this.props.comments} />
				<RoomBox onRoomSubmit={this.handleRoomSubmit}
					rooms={this.props.rooms} />
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
	users: UserBox.propTypes.users,
	rooms: RoomBox.propTypes.rooms,
	commentActions: PropTypes.object.isRequired,
	userActions: PropTypes.object.isRequired,
	roomActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
	return {
		comments: state.comments,
		users: state.users,
		rooms: state.rooms
	};
}

function mapDispatchToProps(dispatch) {
	return {
		commentActions: bindActionCreators(CommentActions, dispatch),
		userActions: bindActionCreators(UserActions, dispatch),
		roomActions: bindActionCreators(RoomActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);