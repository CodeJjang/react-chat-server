import React, { Component } from 'react';
import { Link } from 'react-router';

class UserEntry extends Component {
	render() {
		var name = this.props.name.length > 20
			? this.props.name.substring(0,20) + '...' 
			: this.props.name;
		var path = `/room/${this.props.id}`;
		return (
			<div>
				<Link to={path}>{name}</Link>
			</div>
			);
	}
}

export default UserEntry;