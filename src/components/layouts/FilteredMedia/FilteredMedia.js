import React from 'react'
import { connect } from 'react-redux';

import Card from '../Cards/Card/Card'

const FilteredMedia = ({ results, filteredMediaType, displayTitle }) => {
  console.log(filteredMediaType);

  let singleCard = results ? results.map(card => {
    return <Card key={card.id} result={card} mediaType={filteredMediaType} />
  }) : <h6 className='noResults'>No Results Found</h6>;

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
    results: state.filteredMedia.filteredMediaResults,
    filteredMediaType: state.filteredMedia.mediaType,
    displayTitle: state.filteredMedia.displayTitle
  }
}

export default connect(mapStateToProps)(FilteredMedia)
