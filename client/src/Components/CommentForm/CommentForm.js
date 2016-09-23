import React, { Component } from 'react';
import { FormControl, Button } from 'react-bootstrap';

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
		// return (
		// 	<div>
		// 		<form className='form-control' onSubmit={ this.handleSubmit }>
		// 			<input type='text'
		// 				value={ this.state.author }
		// 				onChange={ this.handleAuthorChange }
		// 				placeholder='Your nickname'
		// 				className='form-control' />
		// 			<input type='text'
		// 				value={ this.state.text }
		// 				onChange={ this.handleTextChange }
		// 				placeholder='Say something...' 
		// 				className='form-control' />
		// 			<input type='submit' value='Post' className='btn btn-success'/>
		// 		</form>
		// 	</div>
		// 	);
		return (

			<form>
				<FormControl id='formControlsText'
					type='text'
					value={ this.state.author }
					onChange={ this.handleAuthorChange }
					placeholder='Your nickname' />
				<FormControl
				componentClass='textarea'
				value={ this.state.text }
				placeholder='Say something...' />
				    <Button bsStyle="success"
				    type='submit'
				    value='Post'>
				    	Send
				    </Button>

			</form>

			);
	}
}

export default CommentForm;