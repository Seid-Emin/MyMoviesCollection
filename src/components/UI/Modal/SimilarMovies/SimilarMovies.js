import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import Carousel from '@brainhubeu/react-carousel';

import './SimilarMovies.css'
import '@brainhubeu/react-carousel/lib/style.css';

// Components
import SimilarMovie from './SimilarMovie/SimilarMovie';


const SimilarMovies = ({ selectedMedia: { selectedMedia, selectedMediaType }, history }) => {

  // Need in case URL is pasted
  const pathName = history.location.pathname;
  let mediaType = 'movie';
  if (pathName.includes('tv')) {
    mediaType = 'tv'
  }
  // Check is there any mediaType selected or URL is pasted
  const mediaToPass = !selectedMediaType ? mediaType : selectedMediaType;

  //display similar movies
  const similarMovie = selectedMedia.similar ? selectedMedia.similar.results.map(result => {
    return <SimilarMovie key={result.id} result={result} mediaType={mediaToPass} />
  }) : null

  //display similar media type
  const type = mediaToPass === 'movie' ? 'movies' : 'tv series';

  return (
    <div className='similarMedia'>
      <div className='similarMedia-wrapper'>
        <div className='similarMedia-title'>
          <p className="card-info">Similar {type}</p>
        </div>
        <Carousel
          // slidesPerPage={2}
          slidesPerScroll={2}
          animationSpeed={1500}
          autoPlay={3000}
          stopAutoPlayOnHover
          // offset={5}
          itemWidth={115}
          clickToChange
          left
          infinite
          slides={similarMovie} />
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    // selectedMedia state
    selectedMedia: state.selectedMedia,
  }
}

export default connect(mapStateToProps)(withRouter(SimilarMovies));






