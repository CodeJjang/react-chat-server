import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RoomList from './RoomList';
import AddButton from './AddButton';
import AddRoomPopover from './AddRoomPopover';
import './RoomBox.css';

class Rooms extends Component {
	constructor(props) {
		super( props );
		this.state = {
			showAddRoom: false
		};
		this.toggleAddRoom = this.toggleAddRoom.bind(this);
		this.onHide = this.onHide.bind(this);
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
					target={ () => ReactDOM.findDOMNode( this._addButton ) }
					onRoomSubmit={ this.props.onRoomSubmit } />
				<AddButton ref={ (c) => this._addButton = c } onClickHandler={ this.toggleAddRoom } />
				<h4>Rooms</h4>
				<RoomList rooms={ this.props.rooms } />
			</div>
			);
	}
}

export default Rooms;