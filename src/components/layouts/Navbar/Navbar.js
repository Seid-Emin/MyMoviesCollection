import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Navbar.css';

// Redux actions
import * as actions from '../../../store/actions';

// Components
import Search from '../../UI/Search/Search';
import Links from './Links/Links';


class Navbar extends Component {
  state = {
    prevScrollpos: window.pageYOffset,
    visible: true
  };


  // Adds an event listener when the component is mount.
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  // Remove the event listener when the component is unmount.
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  // Hide or show the menu.
  handleScroll = () => {
    const { prevScrollpos } = this.state;

    const currentScrollPos = window.pageYOffset;
    const visible = prevScrollpos > currentScrollPos;

    this.setState({
      prevScrollpos: currentScrollPos,
      visible
    });
  };

  render() {
    const { uid, collectionStatus, showMenu, toggleSideMenu } = this.props;

    // const collectionPath = uid ? `/collections/${collectionStatus}` : '/signin';

    console.log('Navbar updated');

    let hamburgerAnimateClass = showMenu ? 'hamburger-active' : '';

    let navHidded = !this.state.visible ? 'nav--hidden' : '';

    return (
      <React.Fragment>
        <nav className={`nav ${navHidded}`}>
          <div className="nav-wrapper layout">
            <div className="hamburger-container" onClick={() => toggleSideMenu()}>
              <p className={`hamburger ${hamburgerAnimateClass}`}></p>
            </div>
            <Link to='/' className="brand-logo material-icons center MovieIcon">movie</Link>
            <div className="nav-right-links">
              <Search />
              <ul id="nav-mobile" >
                <li><NavLink to={`/collections/${collectionStatus}`} activeClassName='activeNavLinks'>Collections</NavLink></li>
                <Links />
              </ul>
            </div>
          </div>
        </nav>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    uid: state.firebase.auth.uid,
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