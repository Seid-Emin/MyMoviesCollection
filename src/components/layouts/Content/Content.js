import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from "react-router";

import './Content.css'

// Redux actions
import * as actions from '../../../store/actions/index'

// Components
import Cards from '../Cards/Cards';
import Categories from '../Categories/Categories';
import Spinner from '../../UI/Spinner/Spinner';
import Modal from '../../UI/Modal/Modal';
import Backdrop from '../../UI/Backdrop/Backdrop';
import SignIn from '../../auth/SignIn';
import SignUp from '../../auth/SingUp';
import Collections from '../../layouts/Collections/Collections';

class Content extends Component {
  componentDidMount() {
    const { mediaType, filterType, fetchFilteredMedia, preloadSelected, preloadFilteredMedia, currentPage, getCollectionFromFirestore } = this.props;
    const pathName = this.props.history.location.pathname;

    const authorId = localStorage.getItem('userId');
    if (authorId) {
      getCollectionFromFirestore();
    }

    // if (pathName.includes('Collections')) {
    //   return <Redirect to={`/${mediaType}/${filterType}/page=${currentPage}`} />
    // }
    //   if (pathName.includes('page=')) {
    //     console.log(pathName);
    //     let pageNum = pathName.slice(pathName.lastIndexOf('/'), pathName.length);
    //     let path = pathName.replace(pageNum, '');
    //     console.log(path);
    //     let pathFilterType = path.slice(path.lastIndexOf('/'), path.length).replace('/', '');
    //     let pathMediaType = path.replace(`/${pathFilterType}`, '').replace('/', '');


    //     let selected = pageNum.replace('/page=', '') - 1;
    //     pageNum = pageNum.replace('/', '');
    //     console.log(pageNum);
    //     preloadFilteredMedia(pathMediaType, pathFilterType, pageNum, selected, path);
    //   } else if (pathName.includes('id=')) {
    //     let path = pathName.replace('id=', '');
    //     preloadSelected(path);
    //   } else if (pathName === '/') {
    //     fetchFilteredMedia(mediaType, filterType);
    //     this.props.history.push(`/${mediaType}/${filterType}/page=${currentPage}`)
    //   } else {
    //     fetchFilteredMedia(mediaType, filterType);
    //     console.log(this.props);
    //     this.props.history.push(`/${mediaType}/${filterType}/page=${currentPage}`)
    //     console.log('Content mounted');
    //   }

  }

  componentDidUpdate() {
    const { getCollectionFromFirestore } = this.props;
    const authorId = localStorage.getItem('userId');
    if (authorId) {
      getCollectionFromFirestore();
      console.log('i was here componentDidUpdate - get');
    }
    console.log('i was here componentDidUpdate - did not get');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('i was here shouldComponentUpdate - content');

    return nextProps.auth != this.props.auth;
  }

  handleHideModal = () => {
    const { mediaType, filterType, fetchFilteredMedia, preloadSelected, preloadFilteredMedia, currentPage, searchText, hideModal } = this.props;
    hideModal();
    if (searchText) {
      this.props.history.push(`/search=${searchText}`)
    } else {
      const pathName = this.props.history.location.pathname;
      let pathLast = pathName.slice(pathName.lastIndexOf('/'), pathName.length);
      let path = pathName.replace(pathLast, '');

      this.props.history.push(path)
    }
  }
  render() {
    const { showInfo, loadingSearch } = this.props;
    const modal = showInfo ?
      <>
        <Backdrop handleHideModal={this.handleHideModal} show={showInfo} />
        <Modal handleHideModal={this.handleHideModal} />
      </>
      : null;

    return (
      <div className='content-grid layout'>
        <Categories />

        <Switch>
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
          {loadingSearch ? <Spinner /> :
            <>
              <Route path='/:mediaType/:filterType/page=:number' component={Cards} />
              <Route path='/search=:query' component={Cards} />
              <Route path='/Collections/:status' component={Collections} />
            </>
          }
        </Switch>
        {modal}
      </div >
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    showInfo: state.selectedMedia.showInfo,
    loadingSearch: state.search.loading,
    searchText: state.search.searchtext,
    mediaType: state.search.mediaType,
    filterType: state.search.filterType,
    currentPage: state.search.currentPage
  }
}

const mapDispatchToProps = dispatch => {
  return {
    hideModal: () => dispatch(actions.hideModal()),
    fetchFilteredMedia: (mediaType, filterType) => dispatch(actions.fetchFilteredMedia(mediaType, filterType)),
    preloadFilteredMedia: (pathMediaType, pathFilterType, pageNum, selected, path) => dispatch(actions.preloadFilteredMedia(pathMediaType, pathFilterType, pageNum, selected, path)),
    preloadSelected: (pathname) => dispatch(actions.preloadSelected(pathname)),
    getCollectionFromFirestore: () => dispatch(actions.getCollectionFromFirestore()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(React.memo(Content)));