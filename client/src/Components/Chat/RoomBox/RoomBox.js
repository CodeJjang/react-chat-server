import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import RoomList from './RoomList';
import AddButton from './AddButton';
import AddRoomPopover from './AddRoomPopover';
import './RoomBox.css';

class Rooms extends Component {
	constructor(props) {
		super( props );
		this.state = {
			roomsApiUrl: 'http://localhost:1337/room',
			rooms: [],
			showAddRoom: false
		};
		this.loadRooms = this.loadRooms.bind( this );
		this.registerToRoomsSyncMessages = this.registerToRoomsSyncMessages.bind( this );
		this.toggleAddRoom = this.toggleAddRoom.bind(this);
		this.onHide = this.onHide.bind(this);
	}
	loadRooms() {
		return $.ajax( {
			url: this.state.roomsApiUrl,
			dataType: 'json',
			xhrFields: {
				withCredentials: true
			},
			success: function(rooms) {
				this.setState( {
					rooms: rooms
				} );
			}.bind( this ),
			error: function(xhr, status, err) {
				console.error( this.state.roomsApiUrl, status, err.toString() );
			}.bind( this )
		} );
	}
	registerToRoomsSyncMessages() {
		this.props.socket.roomsSyncCallback = this.loadRooms;
		return Promise.resolve();
	}
	componentDidUpdate(prevProps) {
		if (!prevProps.authenticated && this.props.authenticated) {
			this.registerToRoomsSyncMessages()
				.then( this.loadRooms )
				.catch( (err) => {
					console.log( err );
				} );
		}
	}
	toggleAddRoom() {
		this.setState( {
			showAddRoom: !this.state.showAddRoom
		} );
	}
	onHide() {
		this.setState( {
			showAddRoom: false
		} );
	}
	render() {
		return (
			<div className='RoomsBox'>
				<AddRoomPopover show={ this.state.showAddRoom }
					onHide={ this.onHide }
					container={ this }
					target={ () => ReactDOM.findDOMNode( this._addButton ) } />
				<AddButton ref={ (c) => this._addButton = c } onClickHandler={ this.toggleAddRoom } />
				<h4>Rooms</h4>
				<RoomList rooms={ this.state.rooms } />
			</div>
			);
	}
}

export default Rooms;