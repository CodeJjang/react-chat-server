import React, { Component } from 'react';

class UserEntry extends Component {
	render() {
		var name = this.props.name.length > 20
			? this.props.name.substring(0,20) + '...' 
			: this.props.name;

		return (
			<div>
				<span>{name}</span>
			</div>
			);
	}
}

export default UserEntry;