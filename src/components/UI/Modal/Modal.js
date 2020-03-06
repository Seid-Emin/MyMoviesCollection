import React from 'react'
import { connect } from 'react-redux';

import MovieDB from '../../../configs/ApiMovies'
import Video from './Video/Video'
import SimilarMovies from './SimilarMovies/SimilarMovies'

import './Modal.css'

const Modal = ({ selectedMediaData, media, selectedMediaType }) => {
  const videos = selectedMediaData.videos;

  console.log(selectedMediaData);


  //check video file existing in the response
  const video = videos ? videos.results.map(video => {
    return <Video key={video.id} video={video} />
  }) : null;

  //change ratings color depending on the rating
  const ratingClasses = [];
  if (selectedMediaData.vote_average >= 7) {
    ratingClasses.push('green-text accent-3');
  } else if (selectedMediaData.vote_average >= 5) {
    ratingClasses.push('lime-text accent-3');
  } else {
    ratingClasses.push('red-text lighten-1');
  }

  //display ganres of the media
  let genres = [];
  if (selectedMediaData.genres) {
    selectedMediaData.genres.map(genre => genres.push(genre.name))
  }

  //display similar movies
  let fewSimilarMovies = selectedMediaData.similar ? selectedMediaData.similar.results.splice(0, 10) : null;
  let similar = selectedMediaData.similar ? fewSimilarMovies.map(result => {
    return <SimilarMovies key={result.id} result={result} mediaType={selectedMediaType} />
  }) : null

  //display similar media type
  let type = selectedMediaType === 'movie' ? 'movies' : 'tv series';


  //check if poster_path exist in the responce
  let posterPath = selectedMediaData.poster_path ? <img src={MovieDB.API_Img + selectedMediaData.poster_path} alt={selectedMediaData.original_name} /> : null;
  return (
    <div id="modal1" className="modal">
      <div className="modal-content row">
        <div className="col s4 m4 l4">
          <div className="card-image">
            {posterPath}
          </div>
          <div className='trailer'>
            {video}
          </div>
        </div>
        <div className="col s8 m8 l8">
          <h3 className="card-main-title">{selectedMediaData.original_name || selectedMediaData.original_title}
            <span className='releaseDate'> ({selectedMediaData.release_date || selectedMediaData.first_air_date})</span>
          </h3>
          <div className='row s4 m2 l1'>
            <div className="col s12 m6 l4">
              <p className='card-inner-title'>rating: <span className={ratingClasses.join(' ')}>{selectedMediaData.vote_average}</span></p>
            </div>
            <div className="col s12 m6 l4">
              <p className="material-icons">playlist_add</p>
            </div>
            <div className="col s12 m6 l4">
              <p className="material-icons">list</p>
            </div>
          </div>
          <div className='row s4 m2 l1'>
            <div className="col">
              <p className='card-inner-title'>Genre: <span className="card-info">{genres.join(', ')}</span></p>
            </div>

          </div>
          <div className='row s4 m2 l1'>
            <div className="col s12 m6 l4">
              <p className='card-inner-title'>Overview</p>
            </div>
            <div className="col">
              <p className="card-info">{selectedMediaData.overview}</p>
            </div>
          </div>
        </div>
      </div>
      <p className="card-info similarMovies-info">Similar {type}</p>
      <div className='similar-movies-wrapper'>
        <div className='inner-wrapper'>
          {similar}
        </div>
      </div>
      <div className="modal-footer">
        <a href="#!" className="modal-close waves-effect waves-green btn-flat">Close</a>
      </div>
    </div >
  )
}

const mapStateToProps = state => {
  return {
    selectedMediaData: state.selectedMedia.selectedMedia,
    selectedMediaType: state.selectedMedia.selectedMediaType
  }
}


export default connect(mapStateToProps)(Modal)
