import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import Search from '../UI/Search/Search';

import * as actions from '../../store/actions/index';

import './Navbar.css';


const Navbar = (props) => {
  const { auth, profile, collectionStatus } = props;

  const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />
  const collectionPath = auth.uid ? `/collections/${collectionStatus}` : '/signin'

  console.log('Navbar updated');


  return (
    <React.Fragment>
      <nav className='nav'>
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
    profile: state.firebase.profile,
    collectionStatus: state.collections.status
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     getCollectionFromFirestore: () => dispatch(actions.getCollectionFromFirestore())
//   }
// }



export default connect(mapStateToProps)(React.memo(Navbar));
