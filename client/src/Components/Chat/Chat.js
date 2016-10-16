import React, { Component } from 'react';
import CommentBox from './CommentBox';
import UserBox from './UserBox';
import RoomBox from './RoomBox';

class Chat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			authenticated: false
		}
	}
	componentDidMount() {
		this.props.socket.joinGlobalRoom()
			.then(() => {
				this.setState({
					authenticated: true
				});
			})
			.catch(err => {
				if(err) {
					console.log('Failed joining global room.');
					console.log(err);
				}
			})
	}
	render() {
		return (
			<div>
				<UserBox authenticated={this.state.authenticated} socket={ this.props.socket } />
				<CommentBox authenticated={this.state.authenticated} socket={ this.props.socket } />
				<RoomBox authenticated={this.state.authenticated} socket={ this.props.socket } />
			</div>
			);
	}
}

export default Chat;