import React, { Component } from 'react';
import { Image, Dropdown, Form, Button, NavDropdown, FormControl, Nav, Navbar }from 'react-bootstrap'

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../App.css'
import guestAvatar from '../images/user.png'
import { Link } from '@reach/router'
import '../../node_modules/bootstrap-css-only'
import ncnewsLogo from '../images/ncnews2.jpg'



class Navi extends Component {

  constructor(props) {
    super(props);

    this.state = {
      
        // LoginStatus: <Link to='/login' className='verticalCenterNav' >Log in</Link>,
        LoginStatus: <Nav.Link href="/login" className='verticalCenterNav' >Log in</Nav.Link>
        // UserContentLink: false
        
    };
    
    this.handleLogOutClick = this.handleLogOutClick.bind(this);

}
  
    // render() {
    //   console.log('in navi', this.props.avatarUrl)
    //   return (
    //     <div className="App">
    //       <Navbar bg="dark" expand="lg">
    //         {/* <Navbar.Collapse id="basic-navbar-nav"> */}
    //           <Nav className="mr-auto">
    //             <Nav.Link className='text-light bg-dark' href='/'> Top Articles </Nav.Link>
    //             <Nav.Link className='text-light bg-dark' href='/topics'> Articles By Topic </Nav.Link>
    //             {/* <UserInfo className='userInfo' userLoggedIn={this.props.userLoggedIn} setUserLogout={this.props.setUserLogout} avatarUrl={this.props.avatarUrl}/>  */}
    //             <div className="userInfo">
            
           
    //             <span className="navbar-right">{this.state.LoginStatus}   

    //             <Dropdown>
    //                 <Dropdown.Toggle variant="success" id="dropdown-basic">
    //                     <Image src={this.props.avatarUrl || guestAvatar} roundedCircle width={30} height={30} />
    //                 </Dropdown.Toggle>

    //                 <Dropdown.Menu>
    //                     <Dropdown.Item href="#/action-1">Your Articles</Dropdown.Item>
    //                     <Dropdown.Item href="#/action-2">LogOut</Dropdown.Item>
    //                 </Dropdown.Menu>
    //             </Dropdown>

                
    //             {this.state.UserContentLink}   
    //             <Button onClick={this.handleLogOutClick} disabled={!this.props.userLoggedIn}>Log Out</Button>
    //             </span>

                  
    //             </div>
    //           </Nav>
    //         {/* </Navbar.Collapse> */}
    //       </Navbar>
    //     </div>
    //   );
    // }


    render() {
      return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/"> 
            <Image src={ncnewsLogo} height='50px' rounded />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Top Articles</Nav.Link>
            <Nav.Link href="/topics">Topics</Nav.Link>
          </Nav>
          <Nav>
          <span className='loginStatus'>{this.state.LoginStatus}</span>

          {this.props.userLoggedIn ? 
            <Dropdown alignRight >
                     <Dropdown.Toggle variant="success" id="dropdown-basic">
                         <Image src={this.props.avatarUrl || guestAvatar} roundedCircle width={30} height={30} />
                     </Dropdown.Toggle>

                     <Dropdown.Menu right >
                         <Dropdown.Item href="/usercontent">Your Articles</Dropdown.Item>
                         <Dropdown.Divider />
                         <Dropdown.Item onClick={this.handleLogOutClick} >LogOut</Dropdown.Item>
                     </Dropdown.Menu>
            </Dropdown> : 
            <Image className='avatarAlign' src={guestAvatar} roundedCircle width={30} height={30} />
          }
            
              
            
          </Nav>
          </Navbar.Collapse>
        </Navbar>
      )
    }


    handleLogOutClick(){
       
      this.props.setUserLogout()
      this.setState({
        // LoginStatus: <Link to='/login' className='verticalCenterNav' >Log in</Link>,
        LoginStatus: <Nav.Link href="/login" className='verticalCenterNav' >Log in</Nav.Link>
          // UserContentLink: false
      })
        
    }

    componentDidUpdate(prevProps){
      
        if(this.props.userLoggedIn && prevProps.userLoggedIn !== this.props.userLoggedIn){
            this.setState({
                LoginStatus: `Logged in as ${this.props.userLoggedIn}`,
                // UserContentLink: <Link to='/usercontent'>Your Content</Link>
                
              })
        }

    }
  }

export default Navi;

