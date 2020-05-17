import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from "react-router";

import * as actions from '../../../store/actions/index'
import MovieDB from '../../../configs/ApiMovies'

import './Content.css'

import Cards from '../Cards/Cards';
//import FilteredMedia from '../FilteredMedia/FilteredMedia'
import Categories from '../Categories/Categories'
import Spinner from '../../UI/Spinner/Spinner'
import Modal from '../../UI/Modal/Modal'
import Backdrop from '../../UI/Backdrop/Backdrop'
import SignIn from '../../auth/SignIn';
import SignUp from '../../auth/SingUp';

class Content extends Component {
  componentDidMount() {
    const { mediaType, filterType, fetchFilteredMedia, preloadSelected, preloadFilteredMedia, currentPage } = this.props;
    const pathName = this.props.history.location.pathname;

    if (pathName.includes('page=')) {
      console.log(pathName);
      let pageNum = pathName.slice(pathName.lastIndexOf('/'), pathName.length);
      let path = pathName.replace(pageNum, '');
      console.log(path);
      let pathFilterType = path.slice(path.lastIndexOf('/'), path.length).replace('/', '');
      let pathMediaType = path.replace(`/${pathFilterType}`, '').replace('/', '');


      let selected = pageNum.replace('/page=', '') - 1;
      pageNum = pageNum.replace('/', '');
      console.log(pageNum);
      preloadFilteredMedia(pathMediaType, pathFilterType, pageNum, selected, path);
    } else if (pathName.includes('id=')) {
      let path = pathName.replace('id=', '');
      preloadSelected(path);
    } else if (pathName === '/') {
      fetchFilteredMedia(mediaType, filterType);
      this.props.history.push(`/${mediaType}/${filterType}/page=${currentPage}`)
    } else {
      fetchFilteredMedia(mediaType, filterType);
      console.log(this.props);
      this.props.history.push(`/${mediaType}/${filterType}/page=${currentPage}`)
      console.log('Content mounted');
    }

  }
  hideSelectedBackdrop = () => {
    const { mediaType, filterType, fetchFilteredMedia, preloadSelected, preloadFilteredMedia, currentPage, searchText } = this.props;
    this.props.hideSelected();
    if (searchText) {
      this.props.history.push(`/search=${searchText}`)
    } else {
      this.props.history.push(`/${mediaType}/${filterType}/page=${currentPage}`)
    }
  }
  render() {
    const { showInfo, loadingSearch, mediaType, filterType } = this.props;
    const modal = showInfo ?
      <>
        <Backdrop clicked={this.hideSelectedBackdrop} show={showInfo} />
        <Modal clicked={this.hideSelectedBackdrop} />
      </>
      : null;

    return (
      <div className='content-grid'>
        <Categories />

        <Switch>
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
          {loadingSearch ? <Spinner /> :
            <>
              <Route path='/:mediaType/:filterType/page=:number' component={Cards} />
              <Route path='/search=:query' component={Cards} />
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
    showInfo: state.selectedMedia.showInfo,
    loadingSearch: state.search.loading,
    searchText: state.search.searchtext,
    mediaType: state.search.mediaType,
    filterType: state.search.filterType,
    currentPage: state.search.currentPage,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    hideSelected: () => dispatch(actions.hideSelected()),
    fetchFilteredMedia: (mediaType, filterType) => dispatch(actions.fetchFilteredMedia(mediaType, filterType)),
    preloadFilteredMedia: (pathMediaType, pathFilterType, pageNum, selected, path) => dispatch(actions.preloadFilteredMedia(pathMediaType, pathFilterType, pageNum, selected, path)),
    preloadSelected: (pathname) => dispatch(actions.preloadSelected(pathname))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Content))
