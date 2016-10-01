import React, { Component } from 'react';
import './App.css';

import Socket from './Services/Socket';
import NavigationBar from './Components/NavigationBar';
import CommentBox from './Components/CommentBox';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: new Socket({url: 'http://localhost:1337'})
    };
  }
  render() {
    return (
      <div>
        <NavigationBar />
        <CommentBox socket={this.state.socket}/>
      </div>
      );
  }
}

export default App;
