import React from 'react';
import { Link } from 'react-router-dom';
//import { connect } from 'react-redux';

import SignedInLinks from './SignedInLinks';
//import SignedOutLinks from './SignedOutLinks';

import './Navbar.css';


const Navbar = (props) => {
  // const { auth, profile } = props;
  //console.log(auth.uid);
  //const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />
  return (
    <React.Fragment>
      <nav className='blue darken-4'>
        <div className="nav-wrapper">
          <Link to='/' className="brand-logo material-icons center MovieIcon">movie</Link>
          <SignedInLinks />
        </div>
      </nav>
    </React.Fragment>
  )
}

// const mapStateToProps = (state, props) => {
//   console.log(state);

//   return {
//     auth: state.firebase.auth,
//     profile: state.firebase.profile
//   }
// }



export default Navbar;
