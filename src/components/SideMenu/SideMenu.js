import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import './SideMenu.css';

// Redux actions and helper methods
import * as actions from '../../store/actions';

// Components
import Categories from '../layouts/Categories/Categories'
import Links from '../layouts/Navbar/Links/Links'


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
    const { uid, toggleSideMenu, collectionStatus } = this.props;

    const collectionPath = uid ? `/collections/${collectionStatus}` : '/signin';

    return (
      <aside className="sideMenu layout">
        <ul id="nav-mobile" >
          <Links toggleSideMenu={toggleSideMenu} />
          <li className='collectionLink' onClick={toggleSideMenu}><NavLink to={collectionPath} activeClassName='activeNav'>Collections</NavLink></li>
          <Categories toggleSideMenu={toggleSideMenu} />
        </ul>
      </aside>
    )
  }
}

const mapStateToProps = state => {
  return {
    uid: state.firebase.auth.uid,
    collectionStatus: state.collections.status
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleSideMenu: () => dispatch(actions.toggleSideMenu())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
