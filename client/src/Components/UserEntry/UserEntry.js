import React, { Component } from 'react';

class UserEntry extends Component {
	render() {
		var nickname = this.props.nickname.length > 20
			? this.props.nickname.substring(0,20) + '...' 
			: this.props.nickname;

		return (
			<div>
				<span>{nickname}</span>
			</div>
			);
	}
}

export default UserEntry;