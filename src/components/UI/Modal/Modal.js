import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import * as actions from '../../../store/actions/index';

import MovieDB from '../../../configs/ApiMovies';
import Video from './Video/Video';
import Spinner from '../Spinner/Spinner';
import SimilarMovies from './SimilarMovies/SimilarMovies';

import './Modal.css'

const Modal = ({
  selectedMediaData: { id, original_title, poster_path, original_name, videos, vote_average, genres, similar, release_date, overview, first_air_date, name },
  loading_selected, history, clicked, addMediaToFirestoreCollection, collections: { filteredCollections, collections }, updateMediaStatus }) => {

  const hideModal = () => {
    clicked();
  }

  const addMedia = (e, watchStatus, collections) => {
    e.preventDefault();

    const pathName = history.location.pathname;

    let title = original_title;
    let mediaType = 'movie';
    if (pathName.includes('tv')) {
      mediaType = 'tv'
      title = original_name
    }
    addMediaToFirestoreCollection(mediaType, id, title, poster_path, watchStatus, collections);
  }

  // handleStatus
  const handleStatus = (e) => {
    const { value } = e.target;
    updateMediaStatus(id, value, collections);
  }

  //check video file existing in the response
  const video = videos ? videos.results.slice(0, 3).map(video => {
    return <Video key={video.id} video={video} />
  }) : null;

  //change ratings color depending on the rating
  const ratingClasses = [];
  if (vote_average >= 7) {
    ratingClasses.push('green-text accent-3');
  } else if (vote_average >= 5) {
    ratingClasses.push('lime-text accent-3');
  } else {
    ratingClasses.push('red-text lighten-1');
  }

  //display ganres of the media
  let modalGenres = [];
  if (genres) {
    genres.map(genre => modalGenres.push(genre.name))
  }

  //check if poster_path exist in the responce
  let posterPath = poster_path ? <img src={MovieDB.API_Img + poster_path} alt={original_name} /> : null;

  //check is there any similar movies in the DB
  let similarMovies = similar && similar.total_results !== 0 ? <SimilarMovies /> : null;

  // Check for existing media in collection
  let currentMedia = collections.filter(media => media.mediaId == id);
  console.log(currentMedia);



  return (
    <div className='modal-info'>
      {loading_selected ? <Spinner /> :
        <>
          <div className='info-wrapper'>
            <div className='card-image'>
              {posterPath}
              <div className='trailer'>
                {video}
              </div>
            </div>
            <div className='movie-info-wrap'>
              <div className='title'>
                <h3 className="card-main-title">{name ? name : original_name || original_title}
                  <span className='releaseDate'> ({release_date ? release_date.substring(0, 4) : first_air_date.substring(0, 4)})</span>
                </h3>
              </div>
              <div className='ratingAdd'>
                <p className='card-inner-title'>Rating: <span className={ratingClasses.join(' ')}>{vote_average}</span></p>
                {!filteredCollections || !currentMedia[0] ? <p className='btn_addMedia' onClick={(e) => addMedia(e, 'watching', collections)}>Add to List</p>
                  : <select className='select_mediaStatus' name='mediaStatus' onChange={(e) => handleStatus(e)} value={currentMedia[0].watchStatus}>
                    <option value="watching">Watching</option>
                    <option value="completed">Completed</option>
                    <option value="on_hold">On Hold</option>
                    <option value="dropped">Dropped</option>
                    <option value="plan_to_watch">Plan To Watch</option>
                  </select>}


              </div>
              <div className='genre'>
                <p className='card-inner-title'>Genre: <span className="card-info">{modalGenres.join(', ')}</span></p>
              </div>
              <div className='overwiev'>
                <p className='card-inner-title'>Overview: </p>
                <p className="card-info">{overview}</p>
              </div>
            </div>
          </div>
          {similarMovies}
          <div className='btn-wrapper'>
            <button className="blue darken-4 waves-effect waves-light btn closeModal" onClick={() => hideModal()}>Close</button>
          </div>
        </>}
    </div>)

}

const mapStateToProps = state => {
  return {
    selectedMediaData: state.selectedMedia.selectedMedia,
    loading_selected: state.selectedMedia.loading,
    collections: state.collections
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addMediaToFirestoreCollection: (selectedMediaType, id, title, poster_path, watchStatus, collections) => dispatch(actions.addMediaToFirestoreCollection(selectedMediaType, id, title, poster_path, watchStatus, collections)),
    updateMediaStatus: (id, watchStatus, collections) => dispatch(actions.updateMediaStatus(id, watchStatus, collections))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps))(withRouter(Modal));
