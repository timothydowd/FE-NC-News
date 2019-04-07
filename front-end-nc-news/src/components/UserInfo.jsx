import React, { Component } from 'react';
import '../App.css';
import guestAvatar from '../images/user.png'




class UserInfo extends Component {
    
    constructor(props) {
        super(props);
    
        this.state = {
          
            LoginStatus: 'Please Log in'
            
        };
        
        this.handleLogOutClick = this.handleLogOutClick.bind(this);
        
    
    }


    render() {
        return (
            
            <div className="userInfo">
           
                <span>{this.state.LoginStatus}<img src={this.props.avatarUrl || guestAvatar} width={50} height={50} /><button onClick={this.handleLogOutClick} disabled={!this.props.userLoggedIn}>Log Out</button></span>

                  
            </div>
        );
    }

    handleLogOutClick(){
        console.log(this.props.setUserLogout)
        this.props.setUserLogout()
          
    }

  componentDidUpdate(prevProps){
      console.log(this.props)
      if(this.props.userLoggedIn && prevProps.userLoggedIn !== this.props.userLoggedIn){
          this.setState({
              LoginStatus: `Logged in as ${this.props.userLoggedIn}`
              
            })
      }

  }

}

export default UserInfo;