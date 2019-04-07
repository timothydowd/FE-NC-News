import React from 'react';
import { Link } from '@reach/router'
import UserInfo from './UserInfo'


const Nav = props => {    
    console.log(props)       
       return <nav className="nav">
           <Link to='/'>Top Articles</Link>
          
           <Link to='/topics'>Articles By Topic</Link>
            
           <UserInfo userLoggedIn={props.userLoggedIn} setUserLogout={props.setUserLogout} avatarUrl={props.avatar_url}/>
           
           
           </nav>
    }

export default Nav;