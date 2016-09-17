import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import CommentBox from './Components/CommentBox';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Aviad's React Test Project.</h2>
        </div>
        <p>This is a basic app with a comment box.</p>
        <CommentBox />
      </div>
    );
  }
}

export default App;
