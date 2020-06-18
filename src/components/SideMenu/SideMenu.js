import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import './SideMenu.css';
// import noCoverImg from '../../../assets/images/no-cover.png';


// Redux actions and helper methods
import * as actions from '../../store/actions';

// Colors object for conditional style and configs
// import MovieDB from '../../../configs/ApiMovies';
// import { colorThemes } from '../Styles/colorThemes';

// Components
import Categories from '../layouts/Categories/Categories'

// import Video from './Video/Video';
// import Spinner from '../Spinner/Spinner';
// import SimilarMovies from './SimilarMovies/SimilarMovies';
// import Select from '../Select/Select';


import SignedInLinks from '../layouts/SignedInLinks';
import SignedOutLinks from '../layouts/SignedOutLinks';


class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.escFunction = this.escFunction.bind(this);
    this.onBackButtonEvent = this.onBackButtonEvent.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
    window.addEventListener('popstate', this.onBackButtonEvent, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
    window.removeEventListener('popstate', this.onBackButtonEvent, false);
  }

  // On EXC key pushed - close modal 
  escFunction(e) {
    if (e.keyCode === 27) {
      this.props.hideModal();
    }
  }

  // On Broser back button clicked - close modal 
  onBackButtonEvent(e) {
    e.preventDefault();
    this.props.hideModal()
  }



  render() {
    const { uid, showMenu, toggleSideMenu, hideModal, profile, collectionStatus } = this.props;

    const links = uid ? <SignedInLinks profile={profile} toggleSideMenu={toggleSideMenu} />
      : <SignedOutLinks toggleSideMenu={toggleSideMenu} />

    const collectionPath = uid ? `/collections/${collectionStatus}` : '/signin';



    return (
      <aside className="sideMenu layout">
        <ul id="nav-mobile" >
          <li className='collectionLink'><NavLink to={collectionPath} activeClassName='activeNav'>Collections</NavLink></li>
          {links}
          <Categories toggleSideMenu={toggleSideMenu} />
        </ul>

      </aside>

    )
  }
}

const mapStateToProps = state => {
  return {
    profile: state.firebase.profile,
    uid: state.firebase.auth.uid,
    collectionStatus: state.collections.status,
    showMenu: state.sideMenu.showMenu
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleSideMenu: () => dispatch(actions.toggleSideMenu()),
    hideModal: () => dispatch(actions.hideModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
