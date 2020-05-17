import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from "react-router";

import Card from './Card/Card';
import Paginate from './Paginate/Paginate';

const Cards = ({ results, searchText, totalResults, filteredMediaType, displayTitle, pagesCount = 0 }) => {

  // Show media Card ( fetched )
  let singleCard = results ? results.map(card => {
    return <Card key={card.id} result={card} />
  }) : <h6 className='noResults'>No Results Found</h6>

  // Display the Info for what is being search and if any result found
  const mediainfoTitle = searchText !== '' ? <h6 className='currentyLoadedMedia'>Searched for '{searchText}' - {totalResults} results found</h6> : null;

  // Display the media type being displayed
  const filteredText = searchText === '' ? filteredMediaType === 'movie' ? <h6 className='currentyLoadedMedia uppercase'>{displayTitle + 's'}</h6> : <h6 className='currentyLoadedMedia uppercase'>{displayTitle} series</h6> : null;

  return (
    <div className='movie-grid'>

      <Paginate
        pagesCount={pagesCount}
        containerClassName='paginate' />

      {mediainfoTitle}
      {filteredText}
      {singleCard}

      <Paginate
        pagesCount={pagesCount}
        containerClassName='paginateBottom' />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    results: state.search.searchResult,
    searchText: state.search.searchText,
    totalResults: state.search.totalResults,
    filteredMediaType: state.search.mediaType,
    displayTitle: state.search.displayTitle,
    pagesCount: state.search.pagesTotal,
  }
}

export default connect(mapStateToProps)(withRouter(Cards));
