import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from "react-router";

import SimilarMovie from './SimilarMovie/SimilarMovie'

import './SimilarMovies.css'

const SimilarMovies = ({ selectedMediaData, selectedMediaType, history }) => {

  // Need in case URL is pasted
  const pathName = history.location.pathname;
  let mediaType = 'movie';
  if (pathName.includes('tv')) {
    mediaType = 'tv'
  }
  // Check is there any mediaType selected or URL is pasted
  let mediaToPass = selectedMediaType == '' ? mediaType : selectedMediaType

  //display similar movies
  let fewSimilarMovies = selectedMediaData.similar ? selectedMediaData.similar.results.splice(0, 10) : null;
  let similarMovie = selectedMediaData.similar ? fewSimilarMovies.map(result => {
    return <SimilarMovie key={result.id} result={result} mediaType={mediaToPass} />
  }) : null

  //display similar media type
  let type = selectedMediaType === 'movie' ? 'movies' : 'tv series';
  return (
    <div className='similarMedia'>
      <div className='similarMedia-wrapper'>
        <div className='similarMedia-title'>
          <p className="card-info">Similar {type}</p>
        </div>
        <div className='similarMedia-content'>
          <div className='inner-wrapper'>
            {similarMovie}
          </div>
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = state => {
  return {
    selectedMediaData: state.selectedMedia.selectedMedia,
    selectedMediaType: state.selectedMedia.selectedMediaType,
  }
}

export default connect(mapStateToProps)(withRouter(SimilarMovies));






