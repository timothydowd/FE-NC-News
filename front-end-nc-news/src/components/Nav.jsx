import React from 'react';
import { Link } from '@reach/router'


const Nav = props => {           
       return <nav>
           <Link to='/'>Home</Link>
           <Link to='/articles'>Articles</Link>
           <Link to='/topics'>Topics</Link>
           
           </nav>
    }

export default Nav;