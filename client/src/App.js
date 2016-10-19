import React, { Component, PropTypes } from 'react';
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

App.propTypes = {
  children: PropTypes.oneOfType([
      PropTypes.arrayOf(React.PropTypes.node),
      PropTypes.node
    ])
};

export default App;
