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
       
        <Articles inHomePage = {this.state.inHomePage} />
         
      </div>
    );
  }


}

export default Home;