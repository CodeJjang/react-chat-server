import React, { Component } from 'react';
import Comment from '../Comment';

class CommentList extends Component {
	render() {
		var commentElements = this.props.comments.map( (comment) => {
			return (
				<Comment key={ comment.id } author={ comment.author } text={ comment.text } />
				);
		} );
		return (
			<div>
				{ commentElements }
			</div>
		);
	}
}

export default CommentList;