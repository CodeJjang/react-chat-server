import React, { Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import './AddButton.css';

class AddButton extends Component {
	render() {
		return (
			<Button 
				className='AddButton'
				onClick={ this.props.onClickHandler }
				bsStyle='success'
				bsSize='xsmall'>
				<Glyphicon glyph='plus' />
			</Button>
			);
	}
}

export default AddButton;