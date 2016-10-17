import React, { Component } from 'react';
import $ from 'jquery';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import './CommentBox.css';

class CommentBox extends Component {
	constructor(props) {
		super( props );
		this.state = {
			commentsApiUrl: 'http://localhost:1337/comment',
			comments: []
		};
		this.loadComments = this.loadComments.bind( this );
		this.postComment = this.postComment.bind( this );
		this.handleCommentSubmit = this.handleCommentSubmit.bind( this );
		this.registerToCommentsSyncMessages = this.registerToCommentsSyncMessages.bind(this);
	}
	registerToCommentsSyncMessages() {
		this.props.socket.commentsSyncCallback = this.loadComments;
		return Promise.resolve();
	}
	loadComments() {
		return $.ajax( {
			url: this.state.commentsApiUrl,
			dataType: 'json',
			data: { roomId: this.props.currentRoomId },
			xhrFields: {
		    	withCredentials: true
		   	},
			success: function(comments) {
				this.setState( {
					comments: comments
				} );
				this._commentList.scrollDown();
			}.bind( this ),
			error: function(xhr, status, err) {
				console.error( this.state.commentsApiUrl, status, err.toString() );
			}.bind( this )
		} );
	}
	postComment(comment) {
		// optimistic posting
		var oldComments = this.state.comments;
		comment.id = Date.now();
		var newComments = oldComments.concat([comment]);
		this.setState( {
			comments: newComments
		} );
		$.ajax( {
			url: this.state.commentsApiUrl,
			xhrFields: {
		    	withCredentials: true
		   	},
			type: 'POST',
			dataType: 'json',
			data: comment,
			success: function(comment) {
				this.setState( {
					comments: oldComments.concat([comment])
				});
			}.bind( this ),
			error: function(xhr, status, err) {
				this.setState( {
					comments: oldComments
				});
				console.error( this.state.commentsApiUrl, status, err.toString() );
			}.bind( this )
		} );
	}
	componentDidUpdate(prevProps) {
		if(!prevProps.authenticated && this.props.authenticated) {
			this.registerToCommentsSyncMessages()
				.then(this.loadComments)
				.catch(err => {
					console.log(err);
				});
		}
	}
	handleCommentSubmit(comment) {
		this.postComment( comment );
	}
	render() {
		return (
			<div className='CommentBox'>
				<CommentList ref={ (c) => this._commentList = c } comments={ this.state.comments }/>
				<CommentForm onCommentSubmit={ this.handleCommentSubmit } />
			</div>
			);
	}
}

export default CommentBox;