import React, { Component } from 'react';
import './App.css';
import { Router } from '@reach/router'
import Nav from './components/Nav'
import Articles from './components/Articles'
import SingleArticle from './components/SingleArticle'
import Home from './components/Home'


class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>NC NEWS</h1>
          <Nav />
          <Router>
            <Home path='/' />
            <Articles path='/articles' />
            <SingleArticle path='/articles/:article_id' />
          </Router>
      </div>
    );
  }
}

export default App;
