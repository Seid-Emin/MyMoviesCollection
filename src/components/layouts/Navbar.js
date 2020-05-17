import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

import './Navbar.css';


const Navbar = (props) => {
  const { auth, profile } = props;

  const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />
  const collectionPath = auth.uid ? '/myCollection' : '/signin'

  return (
    <React.Fragment>
      <nav className='blue darken-4'>
        <div className="nav-wrapper">
          <NavLink to='/' className="brand-logo material-icons center MovieIcon">movie</NavLink>
          <ul id="nav-mobile" className="right">
            <li><NavLink to={collectionPath} activeClassName='activeNavLinks'>My Collection</NavLink></li>
            {links}
          </ul>


        </div>
      </nav>
    </React.Fragment>
  )
}

const mapStateToProps = (state, props) => {
  console.log(state);

  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}



export default connect(mapStateToProps)(Navbar);
