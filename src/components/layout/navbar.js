import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

function Navbar() {
  return (
    
      <navbar className = "navbar">     
              <div className = "border">
                <ul id = "navtabs">
                  <li><Link className="link" to="/">Home</Link> </li>
                  <li><Link className="link" to="/about">About</Link> </li>
                  <li><Link className="link" to="/forum">Forum</Link> </li>
                </ul>
            </div>   
      </navbar>
    
  )
}

export default Navbar;
