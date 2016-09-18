import React, { Component } from 'react';

class Comment extends Component {
	render() {
		return (
			<div>
				<h2>
					{this.props.author}
				</h2>
			</div>
		);
	}
}

export default Comment;