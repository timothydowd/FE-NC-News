import React, { Component } from 'react';
import '../App.css';
import Articles from '../components/Articles'
import {getArticles} from '../components/apis'
import { Link } from '@reach/router'



class Home extends Component {

  state = {
    inHomePage: true
  }

  render() {
    return (
      <div className="App">
        <h1>Home page</h1>
        <p>this page will show all popular articles, in the mean time you can access articles by using articles by topic  **better viewed in mobile device mode</p>
        <Articles inHomePage = {this.state.inHomePage} />
         
      </div>
    );
  }


}

export default Home;