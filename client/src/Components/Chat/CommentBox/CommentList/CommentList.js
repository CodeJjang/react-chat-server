import React, { Component, PropTypes } from 'react';
import Comment from './Comment';
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
		const commentElements = this.props.comments.map((comment) => {
			return (
				<Comment key={comment.id}
					author={comment.author}
					text={comment.text}
					timestamp={comment.createdAt} />
				);
		});
		return (
			<div ref={(c) => this._commentsListDiv = c}
				className='CommentList'>
				{commentElements}
			</div>
			);
	}
}

CommentList.propTypes = {
	comments: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			author: PropTypes.string.isRequired,
			text: PropTypes.string.isRequired,
			createdAt: PropTypes.string.isRequired
		})
	).isRequired
};

export default CommentList;