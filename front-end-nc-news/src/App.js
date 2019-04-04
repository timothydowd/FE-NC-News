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

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userLoggedIn: null,
      avatar_url: null
      
    };
    
    this.setUserLogin = this.setUserLogin.bind(this);
    
  }

  componentDidMount(){
    this.setState({user: null})
  }

  componentDidUpdate(){
    if(this.state.userLoggedIn !== null){
      console.log(this.state.userLoggedIn, 'is logged in', this.state.avatar_url)

    }
  }

  setUserLogin(username, avatarUrl){
    
    this.setState({userLoggedIn: username, avatar_url: avatarUrl})
   
  }

  render() {
    return (
      <div className="App">
        <h1>NC NEWS</h1> <UserInfo userLoggedIn={this.state.userLoggedIn} avatarUrl={this.state.avatar_url}/>
        
          <Nav />
          <Router>
            
            <Home path='/' />
            <Login path='/login' setUserLogin={this.setUserLogin}/>
            <Topics path='/topics' userLoggedIn={this.state.userLoggedIn} />
            <SingleTopicAndArticles path='/articles' userLoggedIn={this.state.userLoggedIn} />
            {/* <Articles path='/articles' /> */}
            <SingleArticle path='/articles/:article_id' />
          </Router>
      </div>
    );
  }
}

export default App;
