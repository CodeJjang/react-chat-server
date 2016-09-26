import React, { Component } from 'react';
import { Media } from 'react-bootstrap';
import './Comment.css';
import moment from 'moment';

class Comment extends Component {
	render() {
		return (
			<Media className='Comment'>
				<Media.Body>
					<Media.Heading>
						<span className='Comment-author'>{this.props.author.nickname}</span>
						<span className='Comment-timestamp'>{moment(this.props.timestamp).fromNow()}</span>
					</Media.Heading>
					<Media.Left>
					<p >
						{this.props.text}
					</p>
					</Media.Left>
				</Media.Body>
			</Media>
			);
	}
}

export default Comment;