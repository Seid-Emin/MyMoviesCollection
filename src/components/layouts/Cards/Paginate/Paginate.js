import React from 'react';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import { withRouter } from "react-router";

import './Paginate.css';

import * as actions from '../../../../store/actions';


const Paginate = ({ history, pagesCount, containerClassName, fetchFilteredMedia, fetchMultiSearch,
  search: { searchText, searching, mediaType, filterType, selected } }) => {

  // Handle Page Change
  const handlePageChange = data => {
    const selectedPage = data.selected;
    const paginatePage = selectedPage + 1;

    if (!searching) {
      fetchFilteredMedia(mediaType, filterType, paginatePage, selectedPage);

      // Update the url according the page
      history.push(`/${mediaType}/${filterType}/page=${paginatePage}`);
    } else {
      fetchMultiSearch(searchText, paginatePage, selectedPage)
    }


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
    // search state
    search: state.search
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // fetchFilteredMediaAction
    fetchFilteredMedia: (mediaType, filterType, paginatePage, selectedPage) => dispatch(actions.fetchFilteredMedia(mediaType, filterType, paginatePage, selectedPage)),
    fetchMultiSearch: (query, page, selectedPage) => dispatch(actions.fetchMultiSearch(query, page, selectedPage))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Paginate));