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

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userLoggedIn: null
      
    };
    
    this.setUserLogin = this.setUserLogin.bind(this);
    
  }

  componentDidMount(){
    this.setState({user: null})
  }

  componentDidUpdate(){
    if(this.state.userLoggedIn !== null){
      console.log(this.state.userLoggedIn, 'is logged in')
    }
  }

  setUserLogin(user){
    
    this.setState({userLoggedIn: user})
   
  }

  render() {
    return (
      <div className="App">
        <h1>NC NEWS</h1>
        
          <Nav />
          <Router>
            
            <Home path='/' />
            <Login path='/login' setUserLogin={this.setUserLogin}/>
            <Topics path='/topics' userLoggedIn={this.state.userLoggedIn} />
            <SingleTopicAndArticles path='/articles' />
            {/* <Articles path='/articles' /> */}
            <SingleArticle path='/articles/:article_id' />
          </Router>
      </div>
    );
  }
}

export default App;
