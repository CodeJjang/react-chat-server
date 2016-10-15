import React, { Component } from 'react';
import UserEntry from '../UserEntry';
import './UserList.css';

class UserList extends Component {
	render() {
		var userElements= this.props.users.map((user) => {
			return (
				<UserEntry key={ user.id }
					nickname={ user.nickname }  />
				);
		});
		return (
			<div className='UserList'>
				{ userElements }
			</div>
			);
	}
}

export default UserList;