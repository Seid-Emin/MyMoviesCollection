import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../../store/actions';

// Combined links
const Links = ({ uid, initials, toggleSideMenu, signOut, clearCollections, search, sideMenu, fetchFilteredMedia, removeSelectedId, selectedMedia: { selectedId } }) => {
  return (uid ?
    <SignedInLinks
      toggleSideMenu={toggleSideMenu}
      initials={initials}
      signOut={signOut}
      search={search}
      clearCollections={clearCollections}
      sideMenu={sideMenu}
      fetchFilteredMedia={fetchFilteredMedia}
      removeSelectedId={removeSelectedId}
      selectedId={selectedId} />
    : <SignedOutLinks toggleSideMenu={toggleSideMenu} />
  )
}


// Inner Component SignOutLinks
const SignedOutLinks = ({ toggleSideMenu }) => {
  return (
    <React.Fragment>
      <li className='signup' onClick={toggleSideMenu}><NavLink to='/signup' activeClassName='activeNavLinks'>Signup</NavLink></li>
      <li className='signin' onClick={toggleSideMenu}><NavLink to='/signin' activeClassName='activeNavLinks'>Signin</NavLink></li>
    </React.Fragment>
  )
}


// Inner Component SignedInLinks
const SignedInLinks = ({ initials, signOut, clearCollections, toggleSideMenu, fetchFilteredMedia, removeSelectedId, selectedId,
  search: { searchText, searchResult, mediaType, filterType, currentPage, searching } }) => {

  const signOutCleanState = () => {
    // check is there any result, if not get them
    if (!searchResult[0]) {
      fetchFilteredMedia(mediaType, filterType)
    }

    // remove selected id after logout for correct routing
    if (selectedId) {
      removeSelectedId();
    }

    signOut();
    clearCollections();
  }

  let pathToDisplay = searching ? `/search=${searchText}` : `/${mediaType}/${filterType}/page=${currentPage}`;

  return (
    <React.Fragment>
      <li className='logout' onClick={toggleSideMenu}><NavLink onClick={() => signOutCleanState()} to='/movie/now_playing/page=1' >Log Out</NavLink></li>
      <li className='initials' onClick={toggleSideMenu}><NavLink to={pathToDisplay} className='btn btn-floating pink lighten-1'>{initials}</NavLink></li>
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

    // selectedMedia state
    selectedMedia: state.selectedMedia,

    // sideMenu
    sideMenu: state.sideMenu.showMenu
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(actions.signOut()),
    clearCollections: () => dispatch(actions.clearCollections()),

    // fetchFilteredMediaAction
    fetchFilteredMedia: (mediaType, filterType) => dispatch(actions.fetchFilteredMedia(mediaType, filterType)),
    removeSelectedId: () => dispatch(actions.removeSelectedId()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Links);