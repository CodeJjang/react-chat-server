import React, { Component } from 'react';
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

export default RoomList;