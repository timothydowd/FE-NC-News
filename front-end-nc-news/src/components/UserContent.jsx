import React, { Component } from 'react';
import '../App.css';
import Articles from '../components/Articles'





class UserContent extends Component {

  state = {
    userQuery: ''
  }

  render() {
    return (
      <div className="App">
        <h1>Your Content</h1>
        <Articles  userQuery = {this.state.userQuery} />
        
         
      </div>
    );
  }

 componentDidMount() {
   this.setState({userQuery: `?author=${this.props.userLoggedIn}`})
   console.log('inusercontent')
 }


}

export default UserContent;