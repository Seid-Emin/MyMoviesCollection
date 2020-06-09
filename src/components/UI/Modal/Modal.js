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
  selectedMediaData: { id, original_title, poster_path, original_name, videos, vote_average, genres, similar, release_date, overview, first_air_date, name, popularity, vote_count },
  loading_selected, history, clicked, addMediaToFirestoreCollection, collections: { filteredCollections, collections }, updateMediaStatus, deleteMediaFromFirestore }) => {

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
    addMediaToFirestoreCollection('select', mediaType, id, title, poster_path, watchStatus, collections);
  }

  // handleStatus
  const handleStatusAndRating = (e) => {
    const { value, name } = e.target;
    updateMediaStatus(id, value, name, collections);
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

  // ColotThemes accorting to user watch_status and rating
  let colorThemes = {
    watchStatus: {
      watching: 'status_watching',
      completed: 'status_completed',
      on_hold: 'status_onHold',
      dropped: 'status_dropped',
      plan_to_watch: 'status_planToWatch'
    },
    userRating: {
      10: 'rating_masterpiece',
      9: 'rating_great',
      8: 'rating_veryGood',
      7: 'rating_good',
      6: 'rating_fine',
      5: 'rating_average',
      4: 'rating_bad',
      3: 'rating_veryBad',
      2: 'rating_Horrible',
      1: 'rating_appalling'
    }
  }

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
              {/* Actions for Collection Create/Update/Delete - start */}
              <div className='ratingAdd collectionActions'>
                {!filteredCollections || !currentMedia[0] ? <p className='btn_addMedia' onClick={(e) => addMedia(e, 'watching', collections)}>Add to List</p>
                  :
                  <>
                    <select
                      name='watchStatus'
                      className={'select_mediaStatus ' + colorThemes.watchStatus[currentMedia[0].watchStatus]}
                      onChange={(e) => handleStatusAndRating(e)}
                      value={currentMedia[0].watchStatus}>
                      <option value="watching">Watching</option>
                      <option value="completed">Completed</option>
                      <option value="on_hold">On Hold</option>
                      <option value="dropped">Dropped</option>
                      <option value="plan_to_watch">Plan To Watch</option>
                    </select>
                    <select
                      name='userRating'
                      className={'user-score ' + colorThemes.userRating[currentMedia[0].userRating]}
                      value={currentMedia[0].userRating}
                      onChange={(e) => handleStatusAndRating(e)}>
                      <option value="select">Select</option>
                      <option value="10">(10) Masterpiece</option>
                      <option value="9">(9) Great</option>
                      <option value="8">(8) Very Good</option>
                      <option value="7">(7) Good</option>
                      <option value="6">(6) Fine</option>
                      <option value="5">(5) Average</option>
                      <option value="4">(4) Bad</option>
                      <option value="3">(3) Very Bad</option>
                      <option value="2">(2) Horrible</option>
                      <option value="1">(1) Appalling</option>
                    </select>
                    <div className="delete-media">
                      <span className="material-icons" onClick={() => deleteMediaFromFirestore(id, collections, filteredCollections)}>delete</span>
                    </div>
                  </>}


              </div>
              {/* Actions for Collection Create/Update/Delete - end */}
              <div className='ratingAdd'>
                <p className='card-inner-title rating'>Rating:
                <span className={ratingClasses.join(' ')}>{vote_average}</span>
                </p>
                <p className='card-inner-title popularity'>Popularity:
                <span>{Math.round(popularity)}</span>
                </p>
                <p className='card-inner-title votes'>Votes:
                <span>{vote_count}</span>
                </p>
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
    </div >)

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
    addMediaToFirestoreCollection: (userRating, selectedMediaType, id, title, poster_path, watchStatus, collections) => dispatch(actions.addMediaToFirestoreCollection(userRating, selectedMediaType, id, title, poster_path, watchStatus, collections)),
    updateMediaStatus: (id, watchStatus, name, collections) => dispatch(actions.updateMediaStatus(id, watchStatus, name, collections)),
    deleteMediaFromFirestore: (mediaId, collections, filteredCollections) => dispatch(actions.deleteMediaFromFirestore(mediaId, collections, filteredCollections))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps))(withRouter(Modal));
