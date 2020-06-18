import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import Search from '../UI/Search/Search';

import * as actions from '../../store/actions/index';

import './Navbar.css';


const Navbar = ({ uid, profile, collectionStatus, showMenu, toggleSideMenu }) => {

  const links = uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />
  const collectionPath = uid ? `/collections/${collectionStatus}` : '/signin';

  console.log('Navbar updated');

  let hamburgerAnimateClass = showMenu ? 'hamburger-active' : '';
  return (
    <React.Fragment>
      <nav className='nav'>
        <div className="nav-wrapper layout">
          <div className="hamburger-container" onClick={() => toggleSideMenu()}>
            <p className={`hamburger ${hamburgerAnimateClass}`}></p>
          </div>
          <Link to='/' className="brand-logo material-icons center MovieIcon">movie</Link>
          <div className="nav-right-links">
            <Search />
            <ul id="nav-mobile" >
              <li><NavLink to={collectionPath} activeClassName='activeNavLinks'>Collections</NavLink></li>
              {links}
            </ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    uid: state.firebase.auth.uid,
    profile: state.firebase.profile,
    collectionStatus: state.collections.status,
    showMenu: state.sideMenu.showMenu
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCollectionFromFirestore: () => dispatch(actions.getCollectionFromFirestore()),
    toggleSideMenu: () => dispatch(actions.toggleSideMenu())
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Navbar));
