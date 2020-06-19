import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from "react-router";

import './Cards.css';

// Components
import GridCard from '../View/GridCard/GridCard';
import Paginate from './Paginate/Paginate';


const Cards = ({ results, searchText, searching, totalResults, filteredMediaType, displayTitle, pagesCount = 0, collections }) => {

  // Display the Info for what is being search and if any result found
  const mediainfoTitle = searching ? <h6 className='currentyLoadedMedia'>Searched for '{searchText}' - {totalResults} results found</h6> : null;

  // Display the media type being displayed
  const filteredText = !searching ? filteredMediaType === 'movie' ? <h6 className='currentyLoadedMedia uppercase'>{displayTitle + 's'}</h6> : <h6 className='currentyLoadedMedia uppercase'>{displayTitle} series</h6> : null;
  console.log('cards');


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
      <GridCard
        fechedResults={results} />
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
    searching: state.search.searching,
    totalResults: state.search.totalResults,
    filteredMediaType: state.search.mediaType,
    displayTitle: state.search.displayTitle,
    pagesCount: state.search.pagesTotal,
    collections: state.collections.collections
  }
}

export default connect(mapStateToProps)(Cards);
