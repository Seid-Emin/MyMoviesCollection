import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Modal.css';
import noCoverImg from '../../../assets/images/no-cover.png';

// Redux actions and helper methods
import * as actions from '../../../store/actions/index';
import { filterByType } from '../../helpers/filter';

// Colors object for conditional style and configs
import MovieDB from '../../../configs/ApiMovies';
import { colorThemes } from '../Styles/colorThemes';

// Components
import Video from './Video/Video';
import Spinner from '../Spinner/Spinner';
import SimilarMovies from './SimilarMovies/SimilarMovies';
import Select from '../Select/Select';


class Modal extends Component {
  constructor(props) {
    super(props);
    this.escFunction = this.escFunction.bind(this);
    this.onBackButtonEvent = this.onBackButtonEvent.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
    window.addEventListener('popstate', this.onBackButtonEvent, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
    window.removeEventListener('popstate', this.onBackButtonEvent, false);
  }

  // On EXC key pushed - close modal 
  escFunction(e) {
    if (e.keyCode === 27) {
      this.props.handler();
    }
  }

  // On Broser back button clicked - close modal 
  onBackButtonEvent(e) {
    e.preventDefault();
    this.props.hideModal();
  }
  // Add selected/picked media to collections
  addMedia = (watchStatus) => {
    const {
      selectedMediaData: { id, original_title, poster_path, original_name, name, title },
      addMediaToFirestoreCollection, selectedMediaType,
      collections: { filteredCollections, collections } } = this.props;

    // Set correct name
    let selectedtitle = name ? name : title || original_name || original_title;
    addMediaToFirestoreCollection('select', selectedMediaType, id, selectedtitle, poster_path, watchStatus, collections, filteredCollections);
  }

  // Handle Status And Rating
  handleStatusAndRating = (e) => {
    const {
      selectedMediaType,
      selectedMediaData: { id },
      collections: { collections, type, status, filteredCollections },
      updateMediaStatus } = this.props;
    const { value, name } = e.target;

    updateMediaStatus(status, id, value, name, type, collections, filteredCollections, selectedMediaType);
  }

  render() {
    const {
      selectedMediaData: { id, original_title, poster_path, original_name, videos, vote_average, genres, similar, release_date, overview, first_air_date, name, title, popularity, vote_count },
      loading_selected,
      collections: { filteredCollections, collections, deleteMediaId },
      deleteMediaFromFirestore, handler } = this.props;



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
    let posterPath = poster_path ? <img src={MovieDB.API_Img + poster_path} alt={original_name} /> : <img src={noCoverImg} alt={original_name} />;

    //check is there any similar movies in the DB
    let similarMovies = similar && similar.total_results !== 0 ? <SimilarMovies /> : null;

    // Check for existing media in collection
    let findInCollection = filterByType('match', collections, 'mediaId', id);
    let isMediaInCollection = findInCollection[0];


    // const {watchStatus, userRating} = isMediaInCollection
    return (
      <div className='modal-info'>
        {loading_selected ? <Spinner /> :
          <>
            <div className='info-wrapper'>
              {/* card image wrapper */}
              <div className='card-image'>
                {posterPath}
                <div className='trailer'>
                  {video}
                </div>
              </div>
              {/* media info - next to image ( right ) */}
              <div className='movie-info-wrap'>
                <div className='title'>
                  <h3 className="card-main-title">{name ? name : title || original_name || original_title}
                    <span className='releaseDate'> ({release_date ? release_date.substring(0, 4) : first_air_date.substring(0, 4)})</span>
                  </h3>
                </div>
                {/* Actions for Collection Create/Update/Delete - start */}
                <div className='ratingAdd collectionActions'>
                  {!filteredCollections || !isMediaInCollection ? <p className='btn_addMedia' onClick={() => this.addMedia('watching')}>Add to List</p>
                    :
                    <>
                      {/* Status of media */}
                      <Select
                        selectName='watchStatus'
                        selectClass={`select_mediaStatus ${colorThemes.watchStatus[isMediaInCollection.watchStatus]}`}
                        value={isMediaInCollection.watchStatus}
                        handler={this.handleStatusAndRating}
                      />
                      {/* User Rating given to media */}
                      <Select
                        selectName='userRating'
                        selectClass={`user-score ${colorThemes.userRating[isMediaInCollection.userRating]}`}
                        value={isMediaInCollection.userRating}
                        order={false}
                        handler={this.handleStatusAndRating}
                      />
                      {/* delete media */}
                      <div className="delete-media">
                        <span className="material-icons" onClick={() => deleteMediaFromFirestore(isMediaInCollection.customID, collections, filteredCollections)}>delete</span>
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
              <button className="blue darken-4 waves-effect waves-light btn closeModal" onClick={() => handler()}>Close</button>
            </div>
          </>}
      </div >
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedMediaData: state.selectedMedia.selectedMedia,
    selectedMediaType: state.selectedMedia.selectedMediaType,
    loading_selected: state.selectedMedia.loading,
    collections: state.collections
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addMediaToFirestoreCollection: (userRating, selectedMediaType, id, title, poster_path, watchStatus, collections, filteredCollections) => dispatch(actions.addMediaToFirestoreCollection(userRating, selectedMediaType, id, title, poster_path, watchStatus, collections, filteredCollections)),
    updateMediaStatus: (status, id, value, name, type, collections, filteredCollections, selectedMediaType) => dispatch(actions.updateMediaStatus(status, id, value, name, type, collections, filteredCollections, selectedMediaType)),
    deleteMediaFromFirestore: (customID, collections, filteredCollections) => dispatch(actions.deleteMediaFromFirestore(customID, collections, filteredCollections)),
    hideModal: () => dispatch(actions.hideModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
