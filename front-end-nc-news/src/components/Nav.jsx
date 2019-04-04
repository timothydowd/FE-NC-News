import React from 'react';
import { Link } from '@reach/router'


const Nav = props => {           
       return <nav>
           <Link to='/'>Home</Link>
           <span> - </span>
           <Link to='/topics'>Articles By Topic</Link>
           {/* <span> - </span>
           <Link to='/articles'>All Articles</Link> */}
           
           </nav>
    }

export default Nav;