import React, { Component } from 'react';
import $ from 'jquery';
import CommentForm from '../CommentForm';
import CommentList from '../CommentList';

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
	}
	loadComments() {
		$.ajax( {
			url: this.state.commentsApiUrl,
			dataType: 'json',
			success: function(comments) {
				this.setState( {
					comments: comments
				} );
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
			type: 'POST',
			data: comment,
			success: function(comment) {
				this.setState( {
					comment: comment
				} );
				this.loadComments();
			}.bind( this ),
			error: function(xhr, status, err) {
				console.error( this.state.commentsApiUrl, status, err.toString() );
			}.bind( this )
		} );
	}
	componentDidMount() {
		this.loadComments();
	}
	handleCommentSubmit(comment) {
		this.postComment( comment );
	}
	render() {
		return (
			<div className='Comment-box'>
				<CommentList comments={ this.state.comments } onCommentSubmit={ this.handleCommentSubmit } />
				<CommentForm onCommentSubmit={ this.handleCommentSubmit } />
			</div>
			);
	}
}

export default CommentBox;