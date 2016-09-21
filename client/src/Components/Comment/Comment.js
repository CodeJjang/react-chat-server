import React, { Component } from 'react';
import './Comment.css';
import moment from'moment';

class Comment extends Component {
	render() {
		return (
			<div className='Comment'>
				<div className='Comment-title'>
					<span className='Author-name'>{ this.props.author }</span>
					<span className='Comment-timestamp'>{ moment(this.props.timestamp).fromNow() }</span>
				</div>
				<p className='Comment-text'>{ this.props.text }</p>
			</div>
			);
	}
}

export default Comment;