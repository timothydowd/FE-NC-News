import React, { Component } from 'react';
import './App.css';
import { Router, Link } from '@reach/router'
import axios from 'axios';
import Articles from './components/Articles'



class App extends Component {
  render() {
    return (
      <div className="App">
        ncs newwwws

          <Articles />
      </div>
    );
  }
}

export default App;
