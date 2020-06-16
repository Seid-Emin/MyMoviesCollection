import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import Search from '../UI/Search/Search';

import * as actions from '../../store/actions/index';

import './Navbar.css';


const Navbar = (props) => {
  const { auth, profile } = props;

  const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />
  const collectionPath = auth.uid ? '/Collections/all_media' : '/signin'

  return (
    <React.Fragment>
      <nav className='blue darken-4 layoutMB'>
        <div className="nav-wrapper layout">
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
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     getCollectionFromFirestore: () => dispatch(actions.getCollectionFromFirestore())
//   }
// }



export default connect(mapStateToProps)(Navbar);
