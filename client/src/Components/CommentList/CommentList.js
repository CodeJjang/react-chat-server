import React, { Component } from 'react';
import Comment from '../Comment';

class CommentList extends Component {
	render() {
		return (
			<div>
			<Comment author="Aviad"/>
			<Comment author="Bar Inline"/>
			</div>
		);
	}
}

export default CommentList;