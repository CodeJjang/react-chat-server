import React, { Component, PropTypes } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import './AddRoomContent.css';

class AddRoomContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRoomNameChange = this.handleRoomNameChange.bind(this);
  }
  handleRoomNameChange(e) {
    this.setState({
      roomName: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    var roomName = this.state.roomName.trim();
    if(!roomName) {
      return;
    }
    this.props.onRoomSubmit({
      name: roomName
    });
    this.setState({
      roomName: ''
    });
  }
  render() {
    const contentStyle = {
      ...this.props.style,
      position: 'absolute',
      backgroundColor: '#EEE',
      boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
      border: '1px solid #CCC',
      borderRadius: 3,
      marginLeft: -5,
      marginTop: 5,
      padding: 10,
    };

    return (
      <div style={ contentStyle }>
        <Form inline>
          <FormControl type='text'
            value={ this.state.roomName }
            onChange={ this.handleRoomNameChange }
            placeholder='Enter room name' />
          <Button className='AddRoomContent-button'
            bsStyle='success'
            type='submit'
            onClick={ this.handleSubmit }
            value='Post'>
            Create
          </Button>
        </Form>
      </div>
      );
  }
}

AddRoomContent.propTypes = {
  onRoomSubmit: PropTypes.func.isRequired
};

export default AddRoomContent;
