import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index'

import './Content.css'

import Cards from '../Cards/Cards';
//import FilteredMedia from '../FilteredMedia/FilteredMedia'
import Categories from '../Categories/Categories'
import Spinner from '../../UI/Spinner/Spinner'
import Modal from '../../UI/Modal/Modal'
import Backdrop from '../../UI/Backdrop/Backdrop'

class Content extends Component {
  componentDidMount() {
    const { mediaType, filterType } = this.props
    this.props.fetchFilteredMedia(mediaType, filterType);
    console.log('Content mounted');

  }
  render() {
    const { showInfo, loadingSearch } = this.props;
    const modal = showInfo ?
      <React.Fragment>
        <Backdrop clicked={this.props.hideSelected} show={showInfo} />
        <Modal />
      </React.Fragment>
      : null;

    return (
      <div className='content-grid'>
        <Categories />
        {loadingSearch ? <Spinner /> :
          <Cards />
        }
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
    mediaType: state.filteredMedia.mediaType,
    filterType: state.filteredMedia.filterType,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    hideSelected: () => dispatch(actions.hideSelected()),
    fetchFilteredMedia: (mediaType, filterType) => (actions.fetchFilteredMedia(mediaType, filterType))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content)
