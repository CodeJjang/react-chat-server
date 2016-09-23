import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap'
import logo from './logo.svg';
import './App.css';

import CommentBox from './Components/CommentBox';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar inverse>
          <Navbar.Header className='App-header'>
            <img src={ logo } className='App-logo' alt='logo' />
            <Navbar.Brand>
              <a href='#'>Aviad's React Test Project</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
        </Navbar>
        <CommentBox />
      </div>
      );
  }
}

export default App;
