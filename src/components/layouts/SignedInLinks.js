import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

const SignedInLinks = (props) => {
<<<<<<< HEAD
  let { initials } = props.profile;
=======
>>>>>>> collections

  return (
    <>
      <li><NavLink onClick={props.signOut} to='/movie/now_playing/page=1' >Log Out</NavLink></li>
<<<<<<< HEAD
      <li><NavLink to='/movie/now_playing/page=1' className='btn btn-floating pink lighten-1'>{initials}</NavLink></li>
=======
      <li><NavLink to='/movie/now_playing/page=1' className='btn btn-floating pink lighten-1'>{props.profile.initials}</NavLink></li>
>>>>>>> collections
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(actions.signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks);
