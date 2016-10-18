import React, { Component } from 'react';
import './AddRoomContent.css';

class AddRoomContent extends Component {
	render() {
		const contentStyle = {
          ...this.props.style,
          position: 'absolute',
          backgroundColor: '#EEE',
          boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
          border: '1px solid #CCC',
          borderRadius: 3,
          marginLeft: -5,
          marginTop: 5,
          padding: 10,
        };

		return (
			<div style={contentStyle}>
        My Content
      </div>
			);
	}
}

export default AddRoomContent;
