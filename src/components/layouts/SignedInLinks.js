import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

const SignedInLinks = ({ profile: { initials }, signOut, toggleSideMenu }) => {

  return (
    <React.Fragment>
      <li className='logout' onClick={toggleSideMenu}><NavLink onClick={signOut} to='/movie/now_playing/page=1' >Log Out</NavLink></li>
      <li className='initials'><NavLink to='/movie/now_playing/page=1' className='btn btn-floating pink lighten-1'>{initials}</NavLink></li>
    </React.Fragment>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(actions.signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks);
