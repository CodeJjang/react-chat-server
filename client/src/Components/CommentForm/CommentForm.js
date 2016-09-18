import React, { Component } from 'react';

class CommentForm extends Component {
	getInitialState() {
		return { author: '', text: ''};
	}
	handleAuthorChange(e) {
		this.setState({ author: e.target.value });
	}
	handleTextChange(e) {
		this.setState({ text: e.target.value });
	}
	render() {
		return (
			<div>
			<form className="commentForm">
	        	<input
	        		type="text"
	        		value={ this.state.author }
	        		onChange= {this.handleAuthorChange }
	        		placeholder="Your name"
	        		/>
	        	<input
	        		type="text"
	        		value={ this.state.text }
	        		onChange= {this.handleTextChange }
	        		placeholder="Say something..."
	        		/>
	        	<input type="submit" value="Post" />
      		</form>
			</div>
		);
	}
}

export default CommentForm;