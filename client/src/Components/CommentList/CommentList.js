import React, { Component } from 'react';
import Comment from '../Comment';
import './CommentList.css';

class CommentList extends Component {
	constructor(props) {
		super(props);
		this.scrollDown = this.scrollDown.bind(this);
	}
	scrollDown() {
		this._commentsListDiv.scrollTop = this._commentsListDiv.scrollHeight;
	}
	componentDidMount() {
		this.scrollDown();
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
			<div ref={ (c) => this._commentsListDiv = c } className='CommentList'>
				{ commentElements }
			</div>
			);
	}
}

export default CommentList;