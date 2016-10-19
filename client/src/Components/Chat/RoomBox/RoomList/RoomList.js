import React, { Component, PropTypes } from 'react';
import RoomEntry from './RoomEntry';
import './RoomList.css';

class RoomList extends Component {
	render() {
		var roomElements = this.props.rooms.map((room) => {
			return (
				<RoomEntry key={ room.id }
					id={ room.id }
					name={ room.name }  />
				);
		});
		return (
			<div className='RoomList'>
				{ roomElements }
			</div>
			);
	}
}

RoomList.propTypes = {
	rooms: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string.isRequired,
				name: PropTypes.string.isRequired
			})
		).isRequired
};

export default RoomList;