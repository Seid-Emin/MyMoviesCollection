import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import * as actions from '../../../store/actions/index';

import MovieDB from '../../../configs/ApiMovies';
import Video from './Video/Video';
import Spinner from '../Spinner/Spinner';
import SimilarMovies from './SimilarMovies/SimilarMovies';

import './Modal.css'

class Modal extends Component {

  componentDidMount() {
    let mediaType = 'movie';
    const pathName = this.props.history.location.pathname;
    if (pathName.includes('tv')) {
      mediaType = 'tv'
    }
    this.props.getMoviesCollection(mediaType);
  }
  hideModal = () => {
    this.props.clicked();
  }

  addToWatched = () => {
    const { projects } = this.props;
    const { id, original_title, poster_path, original_name } = this.props.selectedMediaData;
    let mediaType = 'movie';
    let title = original_title;
    const pathName = this.props.history.location.pathname;
    if (pathName.includes('tv')) {
      mediaType = 'tv'
      title = original_name
    }

    this.props.addMediaToWatched(mediaType, id, title, poster_path);
  }

  addToWatchList = () => {
    const { projects } = this.props;
    const { id, original_title, poster_path, original_name } = this.props.selectedMediaData;
    let mediaType = 'movie';
    let title = original_title;
    const pathName = this.props.history.location.pathname;
    if (pathName.includes('tv')) {
      mediaType = 'tv'
      title = original_name
    }

    this.props.addMediaToWatchList(mediaType, id, title, poster_path);
  }

  render() {
    const { selectedMediaData, loading_selected } = this.props;
    const videos = selectedMediaData.videos;

    console.log(selectedMediaData);



    //check video file existing in the response
    const video = videos ? videos.results.slice(0, 3).map(video => {
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

    //check if poster_path exist in the responce
    let posterPath = selectedMediaData.poster_path ? <img src={MovieDB.API_Img + selectedMediaData.poster_path} alt={selectedMediaData.original_name} /> : null;

    //check is there any similar movies in the DB
    let similarMovies = selectedMediaData.similar && selectedMediaData.similar.total_results !== 0 ? <SimilarMovies /> : null;

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
                  <h3 className="card-main-title">{selectedMediaData.original_name || selectedMediaData.original_title}
                    <span className='releaseDate'> ({selectedMediaData.release_date ? selectedMediaData.release_date.substring(0, 4) : selectedMediaData.first_air_date.substring(0, 4)})</span>
                  </h3>
                </div>
                <div className='ratingAdd'>
                  <p className='card-inner-title'>Rating: <span className={ratingClasses.join(' ')}>{selectedMediaData.vote_average}</span></p>
                  <p className="material-icons" title='Add to Collection' alt='Add to Collection' onClick={() => this.addToWatched()}>playlist_add</p>
                  <p className="material-icons" title='Add to WishList' alt='Add to WishList'
                    onClick={() => this.addToWatchList()}>list</p>
                </div>
                <div className='genre'>
                  <p className='card-inner-title'>Genre: <span className="card-info">{genres.join(', ')}</span></p>
                </div>
                <div className='overwiev'>
                  <p className='card-inner-title'>Overview: </p>
                  <p className="card-info">{selectedMediaData.overview}</p>
                </div>
              </div>
            </div>
            {similarMovies}
            <div className='btn-wrapper'>
              <button className="blue darken-4 waves-effect waves-light btn closeModal" onClick={this.hideModal}>Close</button>
            </div>
          </>}
      </div>)
  }
}
const userId = localStorage.getItem('userId');

const mapStateToProps = state => {
  const projects = state.firestore;
  console.log(projects);

  return {
    selectedMediaData: state.selectedMedia.selectedMedia,
    selectedMediaType: state.selectedMedia.selectedMediaType,
    loading_selected: state.selectedMedia.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addMediaToWatched: (selectedMediaType, id, title, poster_path) => dispatch(actions.addMediaToWatched(selectedMediaType, id, title, poster_path)),
    addMediaToWatchList: (selectedMediaType, id, title, poster_path) => dispatch(actions.addMediaToWatchList(selectedMediaType, id, title, poster_path)),
    getMoviesCollection: (mediaType) => dispatch(actions.getMoviesCollection(mediaType))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {
      collection: 'users',
      doc: userId,
      subcollections: [
        {
          collection: 'watched',
          doc: 'watched',
          subcollections: [
            {
              collection: 'movies',
              orderBy: ['createdAt', 'desc']
            },

          ]
        }
      ],
      storeAs: 'watched-movies'
    },
    {
      collection: 'users',
      doc: userId,
      subcollections: [
        {
          collection: 'watched',
          doc: 'watched',
          subcollections: [
            {
              collection: 'tvs',
              orderBy: ['createdAt', 'desc']
            },
          ]
        }
      ],
      storeAs: 'watched-tvs'
    },
    {
      collection: 'users',
      doc: userId,
      subcollections: [
        {
          collection: 'watchList',
          doc: 'watchList',
          subcollections: [
            {
              collection: 'movies',
              orderBy: ['createdAt', 'desc']
            },
          ]
        }
      ],
      storeAs: 'watchList-movies'
    },
    {
      collection: 'users',
      doc: userId,
      subcollections: [
        {
          collection: 'watchList',
          doc: 'watchList',
          subcollections: [
            {
              collection: 'tvs',
              orderBy: ['createdAt', 'desc']
            },
          ]
        }
      ],
      storeAs: 'watchList-tvs'
    },
  ])
)(withRouter(Modal));
