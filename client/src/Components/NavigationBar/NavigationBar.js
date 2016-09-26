import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import logo from '../../assets/logo.svg';

class NavigationBar extends Component {
	render() {
		return (
			<Navbar inverse>
				<Navbar.Header className='App-header'>
					<img src={ logo } className='App-logo' alt='logo' />
					<Navbar.Brand>
						<a href='#'>Chat</a>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
			</Navbar>
			);
	}
}

export default NavigationBar;