import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './Navbar.css';

// Redux actions
import * as actions from '../../../store/actions';

// Components
import Search from '../../UI/Search/Search';
import Links from './Links/Links';
import SideMenu from './SideMenu/SideMenu';


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

  toggleMenu = () => {
    const { search: { mediaType, filterType, currentPage },
      collections: { status }, toggleSideMenu, history } = this.props;

    // get pathName and change url state to prevent BackButton action
    let pathName = history.location.pathname;
    if (pathName.includes('/page=')) {
      history.push(`/${mediaType}/${filterType}/page=${currentPage}/sideMenu=1`)
    } else {
      history.push(`/collections/${status}/sideMenu=1`)
    }
    toggleSideMenu();
  }

  handleViewing = () => {
    const { search: { viewing }, currentlyViewing } = this.props;
    if (viewing) {
      currentlyViewing();
    }
  }

  render() {
    const { collections: { status }, showMenu,
      search: { mediaType, filterType, currentPage, searching, searchText } } = this.props;

    let navHidded = !this.state.visible ? 'nav--hidden' : '';

    let pathToDisplay = searching ? `/search=${searchText}` : `/${mediaType}/${filterType}/page=${currentPage}`;

    return (
      <React.Fragment>
        <nav className={`nav ${navHidded}`}>
          <div className="nav-wrapper layout">
            <div className="hamburger-container" onClick={() => this.toggleMenu()}>
              <p className='hamburger'></p>
            </div>
            <Link to={pathToDisplay} className="brand-logo material-icons center MovieIcon">movie</Link>
            <div className="nav-right-links">
              <Search />
              <ul id="nav-mobile" >
                <li><NavLink to={`/collections/${status}`} activeClassName='activeNavLinks' onClick={() => this.handleViewing()}>Collections</NavLink></li>
                <Links />
              </ul>
            </div>
          </div>
        </nav>
        <TransitionGroup className='transitionSideMenu'>
          {showMenu ?
            <CSSTransition
              in={showMenu}
              appear={true}
              key='sideMenu'
              timeout={300}
              classNames="sideMenuAnimate"
              mountOnEnter
              unmountOnExit >
              <SideMenu />
            </CSSTransition> : null}
        </TransitionGroup>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // auth state
    uid: state.firebase.auth.uid,

    // search state
    search: state.search,

    // collections state
    collections: state.collections,

    // side menu state
    showMenu: state.sideMenu.showMenu
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // collectionActions
    getCollectionFromFirestore: () => dispatch(actions.getCollectionFromFirestore()),

    // searchAction
    currentlyViewing: () => dispatch(actions.currentlyViewing()),

    //sideMenuActions
    toggleSideMenu: () => dispatch(actions.toggleSideMenu()),
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(React.memo(withRouter(Navbar)));
