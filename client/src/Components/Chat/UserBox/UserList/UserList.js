import React, { Component, PropTypes } from 'react';
import UserEntry from './UserEntry';
import './UserList.css';

class UserList extends Component {
	render() {
		const userElements = this.props.users.map((user) => {
			return (
				<UserEntry key={user.id}
					nickname={user.nickname} />
				);
		});
		return (
			<div className='UserList'>
				{userElements}
			</div>
			);
	}
}

UserList.propTypes = {
	users: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			nickname: PropTypes.string.isRequired,
		})
	).isRequired
};

export default UserList;