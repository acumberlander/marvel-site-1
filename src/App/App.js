import React, { Component } from 'react';
import Characters from '../Characters/Characters';
import MyNavbar from '../MyNavbar/MyNavbar';
import './App.scss';

class App extends Component {

  render() {
    return (
      <div className="App">
        <MyNavbar />
        <Characters />
      </div>
    );
  }
}

export default App;
