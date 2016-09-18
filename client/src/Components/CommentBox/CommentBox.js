import React, { Component } from 'react';
import $ from 'jquery';
import CommentForm from '../CommentForm';
import CommentList from '../CommentList';

class CommentBox extends Component {
	constructor(props) {
		super( props );
		this.state = { commentsApiUrl: 'http://localhost:1337/comment' };
	}
	componentDidMount() {
		$.ajax({
	      url: this.state.commentsApiUrl,
	      dataType: 'json',
	      cache: false,
	      success: function(data) {
	        this.setState({data: data});
	      }.bind(this),
	      error: function(xhr, status, err) {
	        console.error(this.state.commentsApiUrl, status, err.toString());
	      }.bind(this)
	    });
	}
	handleCommentSubmit(comment) {
		$.ajax({
	      url: this.state.commentsApiUrl,
	      dataType: 'json',
	      type: 'POST',
	      data: comment,
	      success: function(data) {
	        this.setState({data: data});
	      }.bind(this),
	      error: function(xhr, status, err) {
	        console.error(this.state.commentsApiUrl, status, err.toString());
	      }.bind(this)
	    });
	}
	render() {
		return (
			<div>
			<CommentForm />
			<CommentList onCommentSubmit={ this.handleCommentSumit }/>
			</div>
		);
	}
}

export default CommentBox;