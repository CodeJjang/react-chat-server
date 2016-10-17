import React, { Component } from 'react';
import $ from 'jquery';
import UserList from './UserList';
import './UserBox.css';

class UserBox extends Component {
	constructor(props) {
		super( props );
		this.state = {
			usersApiUrl: 'http://localhost:1337/user',
			users: []
		};
		this.loadUsers = this.loadUsers.bind( this );		
		this.registerToUsersSyncMessages = this.registerToUsersSyncMessages.bind(this);
	}
	loadUsers() {
		return $.ajax( {
			url: this.state.usersApiUrl,
			dataType: 'json',
			data: { roomId: this.props.currentRoomId },
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
	registerToUsersSyncMessages() {
		this.props.socket.usersSyncCallback = this.loadUsers;
		return Promise.resolve();
	}
	componentDidUpdate(prevProps) {
		if(!prevProps.authenticated && this.props.authenticated) {
			this.registerToUsersSyncMessages()
				.then(this.loadUsers)
				.catch((err)=> {
					console.log(err);
				});
		}
	}
	render() {
		return (
			<div className='UserBox'>
				<h4>Online Users</h4>
				<UserList users={this.state.users}/>
			</div>
			);
	}
}

export default UserBox;