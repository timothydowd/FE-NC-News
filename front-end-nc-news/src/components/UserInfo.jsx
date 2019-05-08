import React, { Component } from 'react';
import '../App.css';
import guestAvatar from '../images/user.png'

import { Link } from '@reach/router'
import { Image, Button }from 'react-bootstrap'



class UserInfo extends Component {
    
    constructor(props) {
        super(props);
    
        this.state = {
          
            LoginStatus: <Link to='/login'>Log in</Link>,
            UserContentLink: false
            
        };
        
        this.handleLogOutClick = this.handleLogOutClick.bind(this);
        
    
    }


    render() {
        return (
            
            <div className="userInfo">
           
                <span>{this.state.LoginStatus}   <Image src={this.props.avatarUrl || guestAvatar} roundedCircle width={30} height={30} />   {this.state.UserContentLink}   <Button onClick={this.handleLogOutClick} disabled={!this.props.userLoggedIn}>Log Out</Button></span>

                  
            </div>
        );
    }

    handleLogOutClick(){
       
        this.props.setUserLogout()
        this.setState({
            LoginStatus: <Link to='/login'>Log in</Link>,
            UserContentLink: false
        })
          
    }

  componentDidUpdate(prevProps){
     
      if(this.props.userLoggedIn && prevProps.userLoggedIn !== this.props.userLoggedIn){
          this.setState({
              LoginStatus: `Logged in as ${this.props.userLoggedIn}`,
              UserContentLink: <Link to='/usercontent'>Your Content</Link>
              
            })
      }

  }

}

export default UserInfo;