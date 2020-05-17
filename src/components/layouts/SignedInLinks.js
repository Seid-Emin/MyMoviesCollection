import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

const SignedInLinks = (props) => {
  return (
    <>
      <li><NavLink onClick={props.signOut} to='/movie/now_playing' >Log Out</NavLink></li>
      <li><NavLink to='/' className='btn btn-floating pink lighten-1'>SS</NavLink></li>
    </>
  )
}

const mapStateToProps = (state, props) => {
  console.log(state);

  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(actions.signOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks);
