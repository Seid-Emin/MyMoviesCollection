import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from "react-router";

import './SideMenu.css';

// Redux actions and helper methods
import * as actions from '../../../store/actions';

// Components
import Backdrop from '../../UI/Backdrop/Backdrop';
import Categories from '../Categories/Categories';
import Links from '../Navbar/Links/Links';


class SideMenu extends Component {

  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
    window.addEventListener('popstate', this.onBackButtonEvent, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
    window.removeEventListener('popstate', this.onBackButtonEvent, false);
  }

  // On EXC key pushed - close modal 
  escFunction = (e) => {
    if (e.keyCode === 27) {
      const { toggleSideMenu, history } = this.props;
      toggleSideMenu();
      this.backActionHandler(history);
    }
  }

  // On Broser back button clicked - close modal 
  onBackButtonEvent = (e) => {
    e.preventDefault();
    this.props.toggleSideMenu();
  }

  sideMenuBackHandler = () => {
    const { toggleSideMenu, history } = this.props;
    toggleSideMenu();

    this.backActionHandler(history);
  }

  // handle menu closing action and correct the path
  backActionHandler = (history) => {
    let pathName = history.location.pathname.replace('/sideMenu=1', '');
    history.push(pathName);
  }

  handleViewing = () => {
    const { search: { viewing }, currentlyViewing } = this.props;
    if (viewing) {
      currentlyViewing();
    }
  }

  render() {
    const { collections: { status }, uid, showMenu, toggleSideMenu } = this.props;

    const collectionPath = uid ? `/collections/${status}` : '/signin';

    let hamburgerAnimateClass = showMenu ? 'hamburger-active' : '';

    return (
      <React.Fragment>
        <aside className="sideMenu layout">

          <ul id="nav-mobile" >
            <div className="hamburger-container" onClick={() => this.sideMenuBackHandler()}>
              <p className={`hamburger ${hamburgerAnimateClass}`}></p>
            </div>
            <Links toggleSideMenu={this.sideMenuBackHandler} />
            <li className='collectionLink' onClick={toggleSideMenu}><NavLink to={collectionPath} activeClassName='activeNav' onClick={() => this.handleViewing()}>Collections</NavLink></li>
            <Categories toggleSideMenu={this.sideMenuBackHandler} />
          </ul>

        </aside >
        <Backdrop handler={this.sideMenuBackHandler} />
      </React.Fragment>

    )
  }
}

const mapStateToProps = state => {
  return {
    // auth state
    uid: state.firebase.auth.uid,

    // Search / Fetch state
    search: state.search,

    // collections state
    collections: state.collections,

    // sideMenu state
    showMenu: state.sideMenu.showMenu
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // fetchFilteredMediaAction
    currentlyViewing: () => dispatch(actions.currentlyViewing()),

    // sideMenuActions
    toggleSideMenu: () => dispatch(actions.toggleSideMenu())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SideMenu));
