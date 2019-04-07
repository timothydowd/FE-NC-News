import React, { Component } from 'react';
import './App.css';
import { Router } from '@reach/router'
import Nav from './components/Nav'
import Articles from './components/Articles'
import SingleArticle from './components/SingleArticle'
import Home from './components/Home'
import Topics from './components/Topics'
import SingleTopicAndArticles from './components/SingleTopicAndArticles'
import Login from './components/Login'
import UserInfo from './components/UserInfo'
import Header from './components/Header' 
import UserContent from './components/UserContent'


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userLoggedIn: null,
      avatar_url: null,
     
      
    };
    
    this.setUserLogin = this.setUserLogin.bind(this);
    this.setUserLogout = this.setUserLogout.bind(this);
    
  }

  componentDidMount(){
    this.setState({user: null})
  }

  componentDidUpdate(){
    if(this.state.userLoggedIn !== null){
      

    }
  }

  setUserLogin(username, avatarUrl){
    
    this.setState({userLoggedIn: username, avatar_url: avatarUrl})
   
  }

  setUserLogout(){
    this.setState({userLoggedIn: null, avatar_url: null})
  }

 

  render() {
    return (
      <div className="App">

         <Header />
         
        
          <Nav userLoggedIn={this.state.userLoggedIn} setUserLogout={this.setUserLogout} avatarUrl={this.state.avatar_url}/>
          <Router>
            
            <Home path='/' />
            <Login path='/login' setUserLogin={this.setUserLogin}/>
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
