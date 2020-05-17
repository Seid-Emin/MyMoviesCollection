import React from 'react'
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import { withRouter } from "react-router";

import * as actions from '../../../../store/actions'

const Paginate = ({ history, pagesCount, containerClassName, fetchFilteredMedia, filterType, mediaType, selected }) => {

  // Handle Page Change
  const handlePageChange = data => {
    const selectedPage = data.selected;
    const paginatePage = selectedPage + 1;
    fetchFilteredMedia(mediaType, filterType, paginatePage, selectedPage);

    // Update the url according the page
    history.push(`/${mediaType}/${filterType}/page=${paginatePage}`);

    //Set hash for preloading from url
    history.location.hash = paginatePage;
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
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Paginate));