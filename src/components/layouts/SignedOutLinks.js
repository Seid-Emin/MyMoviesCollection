import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedOutLinks = ({ toggleSideMenu }) => {
  return (
    <React.Fragment>
      <li className='signup' onClick={toggleSideMenu}><NavLink to='/signup'>Signup</NavLink></li>
      <li className='login' onClick={toggleSideMenu}><NavLink to='/signin'>Login</NavLink></li>
    </React.Fragment>
  )
}

export default SignedOutLinks;