import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './Card.css';
import noCoverImg from '../../../../assets/images/no-cover.png';

// Colors object for conditional style and configs
import { colorThemes } from '../../../UI/Styles/colorThemes';
import { cardStatusConfig } from './cardStatusConfig';
import TheMovieDB from '../../../../configs/ApiMovies';
import * as actions from '../../../../store/actions/index';

const Card = (
  { name, id, media_type, poster_path, fechedResults, filterType, currentPage, filteredMediaType, fetchSelected, selectedMediaType, showModal, singleMedia, collections: { collections, status }, collectionMedia, }) => {

  // Check the state - searching or fetching data
  const media = media_type ? media_type : filteredMediaType;

  // Check by mediaType too
  let isMediaInCollection;

  // Check passed props if collection is passed find media in collection
  // else use the passed one
  if (fechedResults) {
    // Check for existing media in collection
    let findById = collections.filter(item => item.mediaId === id);
    console.log(findById);
    let matchType = findById.mediaType == media_type || findById.mediaName == name ? findById : null;


    if (matchType !== null) {
      isMediaInCollection = matchType[0];
    }
  } else {
    isMediaInCollection = collectionMedia;
  }

  // Link path
  let linkPath = collectionMedia ? `/collections/${status}/id=${id}` : `/${media}/${filterType}/page=${currentPage}/id=${id}`;

  // Card image check
  let currentCardImage = poster_path ? `url(${TheMovieDB.API_Img}${poster_path})` : `url(${noCoverImg})`;

  const loadSingleMedia = () => {
    singleMedia(media, id, fetchSelected, selectedMediaType, showModal)
  }

  console.log('çard');

  return (
    <div className="movie-grid-item">
      <div className="item-wrapper">
        <Link to={linkPath} className='card-link'>
          <div className='item-image-container'>
            {collectionMedia ?
              <div className="card-top">
                <div className="card-top-rating-container">
                  <div className="card-top-mediaType">{media}</div>
                  {collectionMedia.userRating != 'select' ?
                    <div className="rating-star">
                      <span className={`card-top-rating ${colorThemes.userRating[collectionMedia.userRating]}`}>{collectionMedia.userRating}</span>
                    </div> : null}
                </div>
              </div> : null}
            <div className="card-bottom">
              <span className="title" onClick={() => loadSingleMedia()}>{name}</span>
              {isMediaInCollection ? <span className={`fl ${colorThemes.statuStyle[isMediaInCollection.watchStatus]}`}>{cardStatusConfig.title[isMediaInCollection.watchStatus]}</span> : null}
            </div>
            <div className='singleImg' style={{ backgroundImage: `${currentCardImage}` }} onClick={() => loadSingleMedia()}></div>
          </div>
        </Link>
      </div>
    </div >
  )
}
const mapStateToProps = state => {
  return {
    filteredMediaType: state.search.mediaType,
    filterType: state.search.filterType,
    currentPage: state.search.currentPage,
    collections: state.collections
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSelected: (id, mediaType) => dispatch(actions.fetchSelected(id, mediaType)),
    selectedMediaType: (type) => dispatch(actions.selectedMediaType(type)),
    showModal: () => dispatch(actions.showModal()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Card));
