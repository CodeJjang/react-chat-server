import React, { Component } from 'react';
import './App.css';
import Socket from './Services/Socket';
import NavigationBar from './Components/NavigationBar';

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
        {React.cloneElement(this.props.children, {socket: this.state.socket})}
      </div>
      );
  }
}

export default App;
