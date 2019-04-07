import React from 'react';
import { Link } from '@reach/router'


const Nav = props => {           
       return <nav className="nav">
           <Link to='/'>Home</Link>
          
           <Link to='/topics'>Articles By Topic</Link>
            
           {/*<Link to='/articles'>All Articles</Link> */}
           <Link to='/login'>Log in</Link>
           
           </nav>
    }

export default Nav;