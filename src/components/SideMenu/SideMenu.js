import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup, Transition } from 'react-transition-group';

import './SideMenu.css';

// Redux actions and helper methods
import * as actions from '../../store/actions';

// Components
import Backdrop from '../UI/Backdrop/Backdrop';
import Categories from '../layouts/Categories/Categories';
import Links from '../layouts/Navbar/Links/Links';


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
      this.props.toggleSideMenu();
    }
  }

  // On Broser back button clicked - close modal 
  onBackButtonEvent(e) {
    e.preventDefault();
    this.props.toggleSideMenu()
  }

  render() {
    const { uid, toggleSideMenu, collectionStatus, showMenu } = this.props;

    const collectionPath = uid ? `/collections/${collectionStatus}` : '/signin';

    let hamburgerAnimateClass = showMenu ? 'hamburger-active' : '';

    return (
      <React.Fragment>
        <aside className="sideMenu layout">

          <ul id="nav-mobile" >
            <div className="hamburger-container" onClick={() => toggleSideMenu()}>
              <p className={`hamburger ${hamburgerAnimateClass}`}></p>
            </div>
            <Links toggleSideMenu={toggleSideMenu} />
            <li className='collectionLink' onClick={toggleSideMenu}><NavLink to={collectionPath} activeClassName='activeNav'>Collections</NavLink></li>
            <Categories toggleSideMenu={toggleSideMenu} />
          </ul>

        </aside >
        <Backdrop handler={toggleSideMenu} />
      </React.Fragment>

    )
  }
}

const mapStateToProps = state => {
  return {
    // auth state
    uid: state.firebase.auth.uid,

    // collections state
    collectionStatus: state.collections.status,

    // sideMenu state
    showMenu: state.sideMenu.showMenu
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // sideMenuActions
    toggleSideMenu: () => dispatch(actions.toggleSideMenu())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
