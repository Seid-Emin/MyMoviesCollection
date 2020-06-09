import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

const SignedInLinks = (props) => {
  let { initials } = props.profile;

  return (
    <>
      <li><NavLink onClick={props.signOut} to='/movie/now_playing/page=1' >Log Out</NavLink></li>
      <li><NavLink to='/movie/now_playing/page=1' className='btn btn-floating pink lighten-1'>{initials}</NavLink></li>
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(actions.signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks);
