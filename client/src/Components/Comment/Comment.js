import React, { Component } from 'react';

class Comment extends Component {
	render() {
		return (
			<div>
				<h2>{ this.props.author }</h2>
				<span>{ this.props.text }</span>
			</div>
		);
	}
}

export default Comment;