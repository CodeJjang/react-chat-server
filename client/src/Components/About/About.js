import React, { Component } from 'react';
import { Jumbotron, Media } from 'react-bootstrap';
import './About.css';
import profile from '../../Assets/profile.jpg';

class About extends Component {
	render() {
		return (
			<div className='container'>
				<Jumbotron>
					<Media>
						<Media.Left>
							<img width={150}
								height={150}
								src={profile}
								alt='Profile' />
						</Media.Left>
						<Media.Body>
							<Media.Heading className='media About-heading'>
								React Chat
							</Media.Heading>
							<p>
								This chat was created by Aviad Moreshet with React frontend and Node.js backend.
							</p>
						</Media.Body>
					</Media>
				</Jumbotron>
			</div>
			);
	}
}

export default About;