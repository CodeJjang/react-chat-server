import React, { Component } from 'react';
import UserList from './UserList';
import './UserBox.css';

class UserBox extends Component {
	render() {
		return (
			<div className='UserBox'>
				<h4>Online Users</h4>
				<UserList users={this.props.users} />
			</div>
			);
	}
}

UserBox.propTypes = {
	users: UserList.propTypes.users
};

export default UserBox;