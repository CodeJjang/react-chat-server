import React, { Component } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import './CommentForm.css';

class CommentForm extends Component {
	constructor(props) {
		super( props );
		this.state = {
			author: '',
			text: ''
		};
		this.handleAuthorChange = this.handleAuthorChange.bind( this );
		this.handleTextChange = this.handleTextChange.bind( this );
		this.handleSubmit = this.handleSubmit.bind( this );
	}
	handleAuthorChange(e) {
		this.setState( {
			author: e.target.value
		} );
	}
	handleTextChange(e) {
		this.setState( {
			text: e.target.value
		} );
	}
	handleSubmit(e) {
		e.preventDefault();
		var author = this.state.author.trim();
		var text = this.state.text.trim();
		if (!text || !author) {
			return;
		}
		this.props.onCommentSubmit( {
			author: author,
			text: text
		} );
		this.setState( {
			author: '',
			text: ''
		} );
	}
	render() {
		return (
			
			<Form inline className='CommentForm'>
				<FormControl className='CommentForm-nickname'
					type='text'
					value={ this.state.author }
					onChange={ this.handleAuthorChange }
					placeholder='Your nickname' />
					{ ' '}
				<FormControl className='CommentForm-text'
					type='text'
					value={ this.state.text }
					onChange={ this.handleTextChange }
					placeholder='Say something...' />
				<Button className='CommentForm-button'
				bsStyle='success' 
				type='submit' 
				onClick={ this.handleSubmit }
				value='Post'>
					Send
				</Button>
			</Form>
			);
	}
}

export default CommentForm;
