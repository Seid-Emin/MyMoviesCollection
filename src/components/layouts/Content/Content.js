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
import Backdrop from '../../UI/Backdrop/Backdrop';
import Spinner from '../../UI/Spinner/Spinner';
import Modal from '../../UI/Modal/Modal';
import SignIn from '../../auth/SignIn';
import SignUp from '../../auth/SingUp';
import Collections from '../../layouts/Collections/Collections';
import SideMenu from '../SideMenu/SideMenu';

class Content extends Component {
  componentDidMount() {

    const { search: { mediaType, filterType, currentPage }, preloadSelected, preloadFilteredMedia, getCollectionFromFirestore, fetchMultiSearch, fetchFilteredMedia, history, currentlyViewing } = this.props;
    let pathName = history.location.pathname;

    // if url with opened sideMenu is entered - remove it
    if (pathName.includes('/sideMenu=1')) {
      history.push('/movie/now_playing/page=1');
    }

    const authorId = localStorage.getItem('userId');
    if (authorId) {
      getCollectionFromFirestore();
    }

    let pathMediaType = null;
    let pathPageNum = null;
    let pageNum = null;
    // Check initial URL. If inluced id, load that media
    if (pathName.includes('/id=')) {
      // let path = pathName.replace('/id=', '');
      let pathID = pathName.slice(pathName.lastIndexOf('/'), pathName.length).replace('/', ''); // remove '/id=' later
      pathName = pathName.replace(`/${pathID}`, '');

      // Check initial path and set pathMediaType

      if (pathName.includes('collections')) {
        pathMediaType = pathName.slice(pathName.lastIndexOf('/'), pathName.length).replace('/', '');
      } else {
        pathPageNum = pathName.slice(pathName.lastIndexOf('/'), pathName.length);
        pageNum = pathPageNum.replace('/page=', '');
        pathName = pathName.replace(pathPageNum, '');

        let pathFilterType = pathName.slice(pathName.lastIndexOf('/'), pathName.length).replace('/', '');
        pathMediaType = pathName.replace(`/${pathFilterType}`, '');
      }

      pathMediaType = pathMediaType.replace('/', '');
      pathID = pathID.replace('id=', ''); // get only numbers

      let initialMediaPath = `/${pathMediaType}/${pathID}`;
      preloadSelected(initialMediaPath);
    } else if (pathName.includes('/page=') && !pathName.includes('/id=')) {

      // Get the page number, MediaType and FilterType needed for initial fetch
      pageNum = pathName.slice(pathName.lastIndexOf('/'), pathName.length);
      let path = pathName.replace(pageNum, '');// remove pageNum from path

      let pathFilterType = path.slice(path.lastIndexOf('/'), path.length).replace('/', '');
      let pathMediaType = path.replace(`/${pathFilterType}`, '').replace('/', '');


      let selected = pageNum.replace('/page=', '') - 1; // Get correct numbering for state
      pageNum = pageNum.replace('/', '');
      preloadFilteredMedia(pathMediaType, pathFilterType, pageNum, selected, path);

    } else if (pathName.includes('/search')) {
      let query = pathName.replace('/search=', '');
      fetchMultiSearch(query);

    } else if (pathName.includes('/collections') || pathName.includes('/Collections')) {
      history.push('/collections/all_media');
    } else {
      history.push(`/${mediaType}/${filterType}/page=${currentPage}`);
      fetchFilteredMedia(mediaType, filterType);

    }

    if (!pathName.includes('/collections')) {
      currentlyViewing();
    }
  }

  handleHideModal = () => {
    const { search: { mediaType, filterType, currentPage, searchText }, hideModal, status } = this.props;

    // route to last path according to state
    const pathName = this.props.history.location.pathname;

    if (pathName.includes('/collections')) {
      console.log(pathName);
      this.props.history.push(`/collections/${status}`)
    } else if (searchText) {

      this.props.history.push(`/search=${searchText}`)
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
          {showInfo ? <Backdrop handler={this.handleHideModal} showInfo={showInfo} /> : null}
          <Categories />
          <Switch>
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            {loadingSearch ? <Spinner /> :
              <>
                <Route path='/:mediaType/:filterType/page=:number' component={() => <Cards backdropHandler={this.handleHideModal} />} />
                <Route path='/search=:query' component={() => <Cards backdropHandler={this.handleHideModal} />} />
                <Route path='/collections/:status' component={() => <Collections backdropHandler={this.handleHideModal} />} />
              </>
            }
          </Switch>
          <TransitionGroup className='transitionModal'>
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
    search: state.search,

    // Collections state
    status: state.collections.status,

    // SideMenu state
    showMenu: state.sideMenu.showMenu
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // searchActions
    fetchMultiSearch: (query) => dispatch(actions.fetchMultiSearch(query)),

    // selectedActions
    hideModal: () => dispatch(actions.hideModal()),
    preloadSelected: (pathname) => dispatch(actions.preloadSelected(pathname)),

    // fetchFilteredMediaAction
    fetchFilteredMedia: (mediaType, filterType) => dispatch(actions.fetchFilteredMedia(mediaType, filterType)),
    preloadFilteredMedia: (pathMediaType, pathFilterType, pageNum, selected, path) => dispatch(actions.preloadFilteredMedia(pathMediaType, pathFilterType, pageNum, selected, path)),
    currentlyViewing: () => dispatch(actions.currentlyViewing()),

    // collectionActions
    getCollectionFromFirestore: () => dispatch(actions.getCollectionFromFirestore()),

    // sideMenuActions
    toggleSideMenu: () => dispatch(actions.toggleSideMenu()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Content));