import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../../store/actions';

const Links = ({ uid, initials, toggleSideMenu, signOut }) => {

  return (uid ? <SignedInLinks toggleSideMenu={toggleSideMenu} initials={initials} signOut={signOut} />
    : <SignedOutLinks toggleSideMenu={toggleSideMenu} />
  )
}

const SignedOutLinks = ({ toggleSideMenu }) => {
  return (
    <React.Fragment>
      <li className='signup' onClick={toggleSideMenu}><NavLink to='/signup'>Signup</NavLink></li>
      <li className='login' onClick={toggleSideMenu}><NavLink to='/signin'>Login</NavLink></li>
    </React.Fragment>
  )
}

const SignedInLinks = ({ initials, signOut, toggleSideMenu }) => {

  return (
    <React.Fragment>
      <li className='logout' onClick={toggleSideMenu}><NavLink onClick={signOut} to='/movie/now_playing/page=1' >Log Out</NavLink></li>
      <li className='initials'><NavLink to='/movie/now_playing/page=1' className='btn btn-floating pink lighten-1'>{initials}</NavLink></li>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    uid: state.firebase.auth.uid,
    initials: state.firebase.profile.initials,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(actions.signOut())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Links);