import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class UserEntry extends Component {
	render() {
		const name = this.props.name.length > 20
			? this.props.name.substring(0, 20) + '...'
			: this.props.name;
		const path = `/room/${this.props.id}`;
		return (
			<div>
				<Link to={path}>
				{name}
				</Link>
			</div>
			);
	}
}

UserEntry.propTypes = {
	name: PropTypes.string.isRequired
};

export default UserEntry;