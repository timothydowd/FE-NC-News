import React, { Component } from 'react';
import './App.css';
import { Router } from '@reach/router'

import Articles from './components/Articles'
import SingleArticle from './components/SingleArticle'


class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>NC NEWS</h1>
          <Router>
            <Articles path='/' />
            <SingleArticle path='/articles/:article_id' />
          </Router>
      </div>
    );
  }
}

export default App;
