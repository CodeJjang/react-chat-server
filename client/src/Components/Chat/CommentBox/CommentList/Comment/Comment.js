import React, { Component, PropTypes } from 'react';
import { Media } from 'react-bootstrap';
import './Comment.css';
import moment from 'moment';

class Comment extends Component {
	render() {
		return (
			<Media className='Comment'>
				<Media.Body>
					<Media.Heading>
						<span className='Comment-author'>{this.props.author}</span>
						<span className='Comment-timestamp'>{moment(this.props.timestamp).fromNow()}</span>
					</Media.Heading>
					<Media.Left>
						<p>
							{this.props.text}
						</p>
					</Media.Left>
				</Media.Body>
			</Media>
			);
	}
}

Comment.propTypes = {
	author: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	timestamp: PropTypes.string.isRequired
};

export default Comment;