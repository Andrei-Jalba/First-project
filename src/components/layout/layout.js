import React from 'react';
import Header from './header';
import Footer from './footer';
import Navbar from './navbar';


import './layout.css';

function Layout (props) {
  return (
    <div className="layout-container">
      <Header />
      <Navbar/>
      <div className="layout-body">
        {props.children}
      </div>
      { <Footer /> }
    </div>
  )
}

export default Layout;