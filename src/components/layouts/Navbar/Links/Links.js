import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../../store/actions';

// Combined links
const Links = ({ uid, initials, toggleSideMenu, signOut, clearCollections, search }) => {
  return (uid ? <SignedInLinks toggleSideMenu={toggleSideMenu} initials={initials} signOut={signOut} search={search} clearCollections={clearCollections} />
    : <SignedOutLinks toggleSideMenu={toggleSideMenu} />
  )
}


// Inner Component SignOutLinks
const SignedOutLinks = ({ toggleSideMenu }) => {
  return (
    <React.Fragment>
      <li className='signup' onClick={toggleSideMenu}><NavLink to='/signup' activeClassName='activeNavLinks'>Signup</NavLink></li>
      <li className='login' onClick={toggleSideMenu}><NavLink to='/signin' activeClassName='activeNavLinks'>Login</NavLink></li>
    </React.Fragment>
  )
}


// Inner Component SignedInLinks
const SignedInLinks = ({ initials, signOut, clearCollections, toggleSideMenu,
  search: { mediaType, filterType, currentPage } }) => {

  const signOutCleanState = () => {
    signOut();
    clearCollections();
  }

  return (
    <React.Fragment>
      <li className='logout' onClick={toggleSideMenu}><NavLink onClick={() => signOutCleanState()} to='/movie/now_playing/page=1' >Log Out</NavLink></li>
      <li className='initials'><NavLink to={`/${mediaType}/${filterType}/page=${currentPage}`} className='btn btn-floating pink lighten-1'>{initials}</NavLink></li>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    // auth state
    uid: state.firebase.auth.uid,

    // firebase state
    initials: state.firebase.profile.initials,

    // search state
    search: state.search,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(actions.signOut()),
    clearCollections: () => dispatch(actions.clearCollections())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Links);