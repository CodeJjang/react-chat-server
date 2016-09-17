import React, { Component } from 'react';
import CommentForm from '../CommentForm';
import CommentList from '../CommentList';

class CommentBox extends Component {
	render() {
		return (
			<div>My Comments</div>
			<CommentForm />
			<CommentList />
		);
	}
}

export default CommentBox;