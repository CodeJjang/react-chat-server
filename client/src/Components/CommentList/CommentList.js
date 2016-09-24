import React, { Component } from 'react';
import Comment from '../Comment';
import $ from 'jquery';
import './CommentList.css';

class CommentList extends Component {
	scrollDown() {
		$("#CommentList").scrollTop = $("#CommentList").scrollHeight;
	}
	render() {
		var commentElements = this.props.comments.map( (comment) => {
			return (
				<Comment key={ comment.id }
					author={ comment.author }
					text={ comment.text }
					timestamp={ comment.createdAt } />
				);
		} );
		return (
			<div id="CommentList" className="CommentList">
				{ commentElements }
			</div>
			);
	}
}

export default CommentList;