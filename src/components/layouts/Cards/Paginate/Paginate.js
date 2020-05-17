import React from 'react'
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';

import * as actions from '../../../../store/actions'

const Paginate = ({ pagesCount, containerClassName, fetchFilteredMedia, filterType, mediaType, selected }) => {

  // Handle Page Change
  const handlePageChange = data => {
    const selectedPage = data.selected;
    const paginatePage = selectedPage + 1;
    fetchFilteredMedia(mediaType, filterType, paginatePage, selectedPage);
  }

  return pagesCount && pagesCount > 1 ?
    <ReactPaginate
      containerClassName={containerClassName}
      pageLinkClassName='paginateA'
      activeLinkClassName='paginateActiveA'
      previousLinkClassName='paginateA'
      nextLinkClassName='paginateA'
      pageClassName='paginateLi'
      onPageChange={handlePageChange}
      pageCount={pagesCount}
      pageRangeDisplayed='2'
      marginPagesDisplayed='1'
      forcePage={selected}
    /> : null;
}

const mapStateToProps = state => {
  return {
    mediaType: state.search.mediaType,
    filterType: state.search.filterType,
    selected: state.search.selected,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchFilteredMedia: (mediaType, filterType, paginatePage, selectedPage) => dispatch(actions.fetchFilteredMedia(mediaType, filterType, paginatePage, selectedPage))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Paginate);