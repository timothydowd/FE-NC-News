import React, { Component } from 'react';
import './App.css';
import { Router } from '@reach/router'
import Navi from './components/Nav'

import SingleArticle from './components/SingleArticle'
import Home from './components/Home'
import Topics from './components/Topics'
import SingleTopicAndArticles from './components/SingleTopicAndArticles'
import Login from './components/Login'

import Header from './components/Header' 
import UserContent from './components/UserContent'
import '../node_modules/bootstrap-css-only'


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userLoggedIn: null,
      avatar_url: null,
     
      
    };
    
    this.setUserLogin = this.setUserLogin.bind(this);
    this.setUserLogout = this.setUserLogout.bind(this);
    this.logInSessionStorage = this.logInSessionStorage.bind(this);
    
  }

  componentDidMount(){
    this.setState({user: null})
    this.checkUserLoggedInSessionStorage()
  }

  componentDidUpdate(){

  }

 

  setUserLogin(username, avatarUrl){
   
    this.setState({userLoggedIn: username, avatar_url: avatarUrl})
   
  }

  checkUserLoggedInSessionStorage() {
    if(sessionStorage.getItem('userLoggedIn')){
     
      this.setState({userLoggedIn: sessionStorage.getItem('userLoggedIn'), avatar_url: sessionStorage.getItem('avatar_url')})
    }
    else{
      this.setState({userLoggedIn: null, avatar_url: null})
      
    }
  }

  logInSessionStorage(username, avatar_url){
    sessionStorage.setItem('userLoggedIn', username)
    sessionStorage.setItem('avatar_url', avatar_url)
    this.checkUserLoggedInSessionStorage()
    //this.setState({userLoggedIn: sessionStorage.getItem('userLoggedIn'), avatar_url: sessionStorage.getItem('avatar_url')})
  }

  

  setUserLogout(){
    sessionStorage.clear()
    this.checkUserLoggedInSessionStorage()
  }

 

  render() {
    
    return (
      <div className="App">

         {/* <Header /> */}
         
        
          <Navi userLoggedIn={this.state.userLoggedIn} setUserLogout={this.setUserLogout} avatarUrl={this.state.avatar_url}/>
          <Router>
            
            <Home path='/' />
            <Login path='/login' setUserLogin={this.setUserLogin} logInSessionStorage={this.logInSessionStorage}/>
            <Topics path='/topics' userLoggedIn={this.state.userLoggedIn} />
            <SingleTopicAndArticles path='/articles' userLoggedIn={this.state.userLoggedIn} />
            {/* <Articles path='/articles' /> */}
            <SingleArticle path='/articles/:article_id' userLoggedIn={this.state.userLoggedIn} />
            <UserContent path='/usercontent' userLoggedIn={this.state.userLoggedIn}  />
          </Router>
      </div>
    );
  }
}

export default App;
