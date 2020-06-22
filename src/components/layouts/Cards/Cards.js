import React from 'react';
import { connect } from 'react-redux';

import './Cards.css';

// Components
import GridCards from '../View/GridCard/GridCards';
import Paginate from './Paginate/Paginate';


const Cards = ({ search: { searchResult, searchText, searching, totalResults, mediaType, displayTitle, pagesTotal = 0 } }) => {

  // Display the Info for what is being search and if any result found
  const mediainfoTitle = searching ? <h6 className='currentyLoadedMedia'>Searched for '{searchText}' - {totalResults} results found</h6> : null;

  // Display the media type being displayed
  const filteredText = !searching ? mediaType === 'movie' ? <h6 className='currentyLoadedMedia uppercase'>{displayTitle + 's'}</h6> : <h6 className='currentyLoadedMedia uppercase'>{displayTitle} series</h6> : null;
  console.log('cards');


  return (
    <section className='card-container-grid' >
      <div className='row-1-cards-title'>
        <div className="cards-title-info-container">
          {mediainfoTitle}
          {filteredText}
          <Paginate
            pagesCount={pagesTotal}
            containerClassName='paginate' />
        </div>
      </div>
      <GridCards
        fechedResults={searchResult} />
      <div className='row-3-paginate-last'>
        <Paginate
          pagesCount={pagesTotal}
          containerClassName='paginateBottom' />
      </div>
    </section>
  )
}

const mapStateToProps = state => {
  return {
    // search state
    search: state.search
  }
}

export default connect(mapStateToProps)(Cards);
