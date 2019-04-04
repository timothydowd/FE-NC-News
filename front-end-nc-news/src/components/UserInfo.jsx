import React, { Component } from 'react';
import '../App.css';



class UserInfo extends Component {
    
    state = {
        LoginStatus: 'Please Log in'
    }

    
  
    render() {
        return (
            
            <div className="articleContainer">
                <span>{this.state.LoginStatus}<img src={this.props.avatarUrl} alt='../public/user.png' width={50} height={50} /></span>
                  
            </div>
        );
    }

  componentDidUpdate(prevProps){
      if(this.props.userLoggedIn && prevProps.userLoggedIn !== this.props.userLoggedIn){
          this.setState({LoginStatus: `Logged in as ${this.props.userLoggedIn}`})
      }

  }


}

export default UserInfo;