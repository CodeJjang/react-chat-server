import React, { Component } from 'react';
import { Overlay } from 'react-bootstrap';
import AddRoomContent from './AddRoomContent';
import './AddRoomPopover.css';

class AddRoomPopover extends Component {
	render() {
		return (
			<Overlay show={ this.props.show }
				onHide={ this.props.onHide }
				placement='left'
				container={ this.props.container }
				target={ this.props.target }>
				<AddRoomContent onRoomSubmit={this.props.onRoomSubmit}/>
			</Overlay>
			);
	}
}

export default AddRoomPopover;
