import React, { Component } from 'react';

class UserEntry extends Component {
	render() {
		return (
			<span>{this.props.nickname}</span>
			);
	}
}

export default UserEntry;