import React, { Component } from 'react';
import { Media } from 'react-bootstrap';
import './Comment.css';
import moment from 'moment';

class Comment extends Component {
	render() {
		// return (
		// 	<div className='Comment'>
		// 		<div className='Comment-title'>
		// 			<span className='Author-name'>{ this.props.author }</span>
		// 			<span className='Comment-timestamp'>{ moment(this.props.timestamp).fromNow() }</span>
		// 		</div>
		// 		<p className='Comment-text'>{ this.props.text }</p>
		// 	</div>
		// 	);
		return (
			<Media className='Comment'>
				<Media.Left>
					<img width={ 64 }
						height={ 64 }
						src='/assets/thumbnail.png'
						alt='Image' />
				</Media.Left>
				<Media.Body>
					<Media.Heading >
						<Media.Left className='Author-name'>{this.props.author}</Media.Left>
						<Media.Right >{moment(this.props.timestamp).fromNow()}</Media.Right>
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