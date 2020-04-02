import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';

import Card from './Card/Card'

const Cards = ({ results, searchText, totalResults, filteredMediaType, displayTitle, pagesCount }) => {
  let singleCard = results ? results.map(card => {
    return <Card key={card.id} result={card} />
  }) : <h6 className='noResults'>No Results Found</h6>

  const mediainfoTitle = searchText !== '' ? <h6 className='currentyLoadedMedia'>Searched for '{searchText}' - {totalResults} results found</h6> : null;
  const filteredText = searchText === '' ? filteredMediaType === 'movie' ? <h6 className='currentyLoadedMedia uppercase'>{displayTitle + 's'}</h6> : <h6 className='currentyLoadedMedia uppercase'>{displayTitle} series</h6> : null;

  // const pagination = 

  return (
    <div className='movie-grid'>

      <ReactPaginate
        containerClassName='paginate'
        pageLinkClassName='paginateA'
        activeLinkClassName='paginateActiveA'
        previousLinkClassName='paginateA'
        nextLinkClassName='paginateA'
        pageClassName='paginateLi'
        // initialPage=
        pageCount={pagesCount}
        pageRangeDisplayed='2'
        marginPagesDisplayed='1' />

      {mediainfoTitle}
      {filteredText}
      {singleCard}

      <ReactPaginate
        containerClassName='paginateBottom'
        pageLinkClassName='paginateA'
        activeLinkClassName='paginateActiveA'
        previousLinkClassName='paginateA'
        nextLinkClassName='paginateA'
        pageClassName='paginateLi'
        pageCount={pagesCount}
        pageRangeDisplayed='2'
        marginPagesDisplayed='1' />

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

export default connect(mapStateToProps)(Cards)
