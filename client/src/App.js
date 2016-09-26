import React, { Component } from 'react';
import './App.css';

import NavigationBar from './Components/NavigationBar';
import CommentBox from './Components/CommentBox';

class App extends Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <CommentBox />
      </div>
      );
  }
}

export default App;
