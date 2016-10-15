import React, { Component } from 'react';
import './App.css';

import Socket from './Services/Socket';
import NavigationBar from './Components/NavigationBar';
import Chat from './Components/Chat';

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
        <Chat socket={this.state.socket}/>
      </div>
      );
  }
}

export default App;
