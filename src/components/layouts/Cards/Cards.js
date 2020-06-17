import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from "react-router";

import GridCard from '../View/GridCard/GridCard';
import Paginate from './Paginate/Paginate';
import { singleMedia } from '../../helpers/silgleMedia';

import './Cards.css'

const Cards = ({ results, searchText, totalResults, filteredMediaType, displayTitle, pagesCount = 0, collections }) => {

  // Display the Info for what is being search and if any result found
  const mediainfoTitle = searchText !== '' ? <h6 className='currentyLoadedMedia'>Searched for '{searchText}' - {totalResults} results found</h6> : null;

  // Display the media type being displayed
  const filteredText = searchText === '' ? filteredMediaType === 'movie' ? <h6 className='currentyLoadedMedia uppercase'>{displayTitle + 's'}</h6> : <h6 className='currentyLoadedMedia uppercase'>{displayTitle} series</h6> : null;

  return (
    <section className='card-container-grid' >
      <div className='row-1-cards-title'>
        <div className="cards-title-info-container">
          {mediainfoTitle}
          {filteredText}
          <Paginate
            pagesCount={pagesCount}
            containerClassName='paginate' />
        </div>
      </div>
      {results ? <GridCard
        fechedResults={results}
        collections={collections} />
        : <h6 className='noResults'>No Results Found</h6>}


      <div className='row-3-paginate-last'>
        <Paginate
          pagesCount={pagesCount}
          containerClassName='paginateBottom' />
      </div>
    </section>
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
    collections: state.collections.collections
  }
}

export default connect(mapStateToProps)(React.memo(Cards));
