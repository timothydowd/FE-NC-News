import React, { Component } from 'react';
import '../App.css';
import Articles from '../components/Articles'
import {getArticles} from '../components/apis'
import { Link } from '@reach/router'



const Home = () => {

  

 
    return (
      <div className="App">
        <h1>Home page</h1>
       
        <Articles inHomePage={true} />
         
      </div>
    );
  


}

export default Home;