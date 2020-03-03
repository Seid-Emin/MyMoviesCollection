import React from 'react';
import { NavLink } from 'react-router-dom';
//import { connect } from 'react-redux';
//import { signOut } from '../../store/actions/authAction';

const SignedInLinks = (props) => {
  return (
    <ul id="nav-mobile" className="right">
      <li><NavLink to='/myCollection'>My Collection</NavLink></li>
      <li><a >Log Out</a></li>
      <li><NavLink to='/' className='btn btn-floating pink lighten-1'>SS</NavLink></li>
    </ul>
  )
}

// const mapStateToProps = (state, props) => {
//   return {

//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     signOut: () => dispatch(signOut())
//   }
// }

export default SignedInLinks;
