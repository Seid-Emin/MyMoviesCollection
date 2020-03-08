import React from 'react'
import { connect } from 'react-redux';

import Card from './Card/Card'

const Cards = ({ results, searchText, totalResults }) => {
  let singleCard = totalResults !== 0 ? results.map(card => {
    return <Card key={card.id} result={card} />
  }) : <h6 className='noResults'>No Results Found</h6>

  const mediainfoTitle = searchText !== '' ? <h6 className='currentyLoadedMedia'>Searched for '{searchText}' - {totalResults} results found</h6> : null;
  return (
    <div className='movie-grid'>
      {mediainfoTitle}
      {singleCard}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    results: state.search.searchResult,
    searchText: state.search.searchText,
    totalResults: state.search.totalResults
  }
}

export default connect(mapStateToProps)(Cards)
