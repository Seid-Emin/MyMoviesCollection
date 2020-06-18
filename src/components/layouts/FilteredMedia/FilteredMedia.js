import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import Card from '../Cards/Card/Card'

const FilteredMedia = ({ results, filteredMediaType, displayTitle, searching }) => {
  let singleCard = results ? results.map(card => {
    return <Card key={card.id} result={card} mediaType={filteredMediaType} />
  }) : <h6 className='noResults'>No Results Found. Try Again Later...</h6>;

  const fetchedFilteredTitle = filteredMediaType === 'movie' ? <h6 className='currentyLoadedMedia uppercase'>{displayTitle}s</h6> : <h6 className='currentyLoadedMedia uppercase'>{displayTitle} series</h6>;
  return (
    <div className='movie-grid'>
      {fetchedFilteredTitle}
      {singleCard}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    results: state.search.filteredMediaResults,
    filteredMediaType: state.search.mediaType,
    displayTitle: state.search.displayTitle,
    searching: state.search.searching,
  }
}

export default connect(mapStateToProps)(FilteredMedia)
