import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './Content.css';

// Redux actions
import * as actions from '../../../store/actions';

// Components
import Cards from '../Cards/Cards';
import Categories from '../Categories/Categories';
import Spinner from '../../UI/Spinner/Spinner';
import Modal from '../../UI/Modal/Modal';
import SignIn from '../../auth/SignIn';
import SignUp from '../../auth/SingUp';
import Collections from '../../layouts/Collections/Collections';
import SideMenu from '../../SideMenu/SideMenu';

class Content extends Component {
  componentDidMount() {
    const { preloadSelected, preloadFilteredMedia, getCollectionFromFirestore, fetchMultiSearch,
      collections: { collections },
      history } = this.props;
    let pathName = history.location.pathname;

    const authorId = localStorage.getItem('userId');
    if (authorId) {
      getCollectionFromFirestore();
    }
    // else if (pathName.includes('collections')) {
    //   this.props.history.push('/signin')
    // }

    // Check initial URL. If inluced id, load that media
    if (pathName.includes('/id=')) {
      // let path = pathName.replace('/id=', '');
      let pathID = pathName.slice(pathName.lastIndexOf('/'), pathName.length).replace('/', ''); // remove '/id=' later
      pathName = pathName.replace(`/${pathID}`, '');

      // Check initial path and set pathMediaType
      let pathMediaType = null;
      if (pathName.includes('collections')) {
        pathMediaType = pathName.slice(pathName.lastIndexOf('/'), pathName.length).replace('/', '');
      } else {
        let pathFilterType = pathName.slice(pathName.lastIndexOf('/'), pathName.length).replace('/', '');
        pathMediaType = pathName.replace(`/${pathFilterType}`, '');
      }

      pathMediaType = pathMediaType.replace('/', '');
      pathID = pathID.replace('id=', ''); // get only numbers

      let initialMediaPath = `/${pathMediaType}/${pathID}`;
      preloadSelected(initialMediaPath);
    } else if (pathName.includes('/page=')) {

      // Get the page number, MediaType and FilterType needed for initial fetch
      let pageNum = pathName.slice(pathName.lastIndexOf('/'), pathName.length);
      let path = pathName.replace(pageNum, '');// remove pageNum from path

      let pathFilterType = path.slice(path.lastIndexOf('/'), path.length).replace('/', '');
      let pathMediaType = path.replace(`/${pathFilterType}`, '').replace('/', '');


      let selected = pageNum.replace('/page=', '') - 1; // Get correct numbering for state
      pageNum = pageNum.replace('/', '');
      console.log(pageNum);
      preloadFilteredMedia(pathMediaType, pathFilterType, pageNum, selected, path);
    } else if (pathName.includes('/search')) {
      let query = pathName.replace('/search=', '');
      fetchMultiSearch(query);
    } else {
      history.push('collections/all_media');
    }
  }

  handleHideModal = () => {
    const { mediaType, filterType, currentPage, searchText, hideModal,
      collections: { status } } = this.props;

    // route to last path according to state
    const pathName = this.props.history.location.pathname;
    if (searchText) {
      this.props.history.push(`/search=${searchText}`)
    } else if (pathName.includes('collections')) {
      this.props.history.push(`/collections/${status}`)
    } else {
      this.props.history.push(`/${mediaType}/${filterType}/page=${currentPage}`)
    }

    hideModal();
  }

  render() {
    const { showInfo, loadingSearch, showMenu } = this.props;
    const modal = showInfo ?
      <CSSTransition
        in={showInfo}
        appear={showInfo}
        key='modal'
        timeout={300}
        classNames="modalAnimate"
        mountOnEnter
        unmountOnExit >
        <Modal handler={this.handleHideModal} showInfo={showInfo} />
      </CSSTransition>
      : null;

    return (
      <React.Fragment>
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
        <main className='content-grid layout'>
          <Categories />
          <Switch>
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            {loadingSearch ? <Spinner /> :
              <>
                <Route path='/:mediaType/:filterType/page=:number' component={Cards} />
                <Route path='/search=:query' component={Cards} />
                <Route path='/collections/:status' component={Collections} />
              </>
            }
          </Switch>
          <TransitionGroup >
            {modal}
          </TransitionGroup>
        </main >
      </React.Fragment >
    )
  }
}

const mapStateToProps = state => {
  return {
    // SingleMedia (Modal) state
    showInfo: state.selectedMedia.showInfo,

    // Search / Fetch state
    loadingSearch: state.search.loading,
    searchText: state.search.searchtext,
    mediaType: state.search.mediaType,
    filterType: state.search.filterType,
    currentPage: state.search.currentPage,

    // Collections state
    collections: state.collections,

    // SideMenu state
    showMenu: state.sideMenu.showMenu
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // searchActions
    fetchMultiSearch: (query) => dispatch(actions.fetchMultiSearch(query)),

    // selectActions
    hideModal: () => dispatch(actions.hideModal()),
    preloadSelected: (pathname) => dispatch(actions.preloadSelected(pathname)),

    // fetchFilteredMediaAction
    fetchFilteredMedia: (mediaType, filterType) => dispatch(actions.fetchFilteredMedia(mediaType, filterType)),
    preloadFilteredMedia: (pathMediaType, pathFilterType, pageNum, selected, path) => dispatch(actions.preloadFilteredMedia(pathMediaType, pathFilterType, pageNum, selected, path)),

    // collectionActions
    getCollectionFromFirestore: () => dispatch(actions.getCollectionFromFirestore()),

    // sideMenuActions
    toggleSideMenu: () => dispatch(actions.toggleSideMenu()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Content));