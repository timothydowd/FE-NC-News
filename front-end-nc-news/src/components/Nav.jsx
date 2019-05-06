import React, { Component } from 'react';
import { Form, Button, NavDropdown, FormControl, Nav, Navbar }from 'react-bootstrap'
import UserInfo from './UserInfo'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../App.css'


class Navi extends Component {
    render() {
      return (
        <div className="App">
          <Navbar bg="dark" expand="lg">
            {/* <Navbar.Collapse id="basic-navbar-nav"> */}
              <Nav className="mr-auto">
                <Nav.Link className='text-light bg-dark' href='/'> Top Articles </Nav.Link>
                <Nav.Link className='text-light bg-dark' href='/topics'> Articles By Topic </Nav.Link>
                <UserInfo className='userInfo' userLoggedIn={this.props.userLoggedIn} setUserLogout={this.props.setUserLogout} avatarUrl={this.props.avatar_url}/> 
              </Nav>
            {/* </Navbar.Collapse> */}
          </Navbar>
        </div>
      );
    }
  }

// const Nav = props => {    
//     console.log(props)       
//        return <nav className="nav">
//            <Link to='/'>Top Articles</Link>
          
//            <Link to='/topics'>Articles By Topic</Link>
            
//            <UserInfo userLoggedIn={props.userLoggedIn} setUserLogout={props.setUserLogout} avatarUrl={props.avatar_url}/>
           
           
//            </nav>
//     }

export default Navi;