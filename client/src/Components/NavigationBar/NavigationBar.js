import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';
import logo from '../../Assets/logo.svg';

class NavigationBar extends Component {
	render() {
		return (
			<Navbar inverse>
				<Navbar.Header className='App-header'>
					<img src={logo}
						className='App-logo'
						alt='logo' />
					<Navbar.Brand>
						React-Chat
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav>
						<IndexLinkContainer to='/'>
							<NavItem eventKey={1}>
								Chat
							</NavItem>
						</IndexLinkContainer>
						<LinkContainer to='/about'>
							<NavItem eventKey={2}>
								About
							</NavItem>
						</LinkContainer>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
			);
	}
}

export default NavigationBar;