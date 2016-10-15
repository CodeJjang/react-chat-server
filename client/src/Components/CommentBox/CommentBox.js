import React, { Component } from 'react';
import $ from 'jquery';
import CommentForm from '../CommentForm';
import CommentList from '../CommentList';
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
		$.ajax( {
			url: this.state.commentsApiUrl,
			dataType: 'json',
			xhrFields: {
		    	withCredentials: true
		   	},
			type: 'POST',
			data: comment,
			success: function(comment) {
				this.setState( {
					comment: comment
				} );
			}.bind( this ),
			error: function(xhr, status, err) {
				console.error( this.state.commentsApiUrl, status, err.toString() );
			}.bind( this )
		} );
	}
	componentDidUpdate(prevProps) {
		if(!prevProps.authenticated && this.props.authenticated) {
			this.registerToCommentsSyncMessages()
				.then(this.loadComments)
				.catch((err)=> {
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