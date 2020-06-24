import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './GridItem.css';
import noCoverImg from '../../../../../assets/images/no-cover.png';

// Colors object for conditional style and configs
import { colorThemes } from '../../../../UI/Styles/colorThemes';
import { cardStatusConfig } from './cardStatusConfig';
import TheMovieDB from '../../../../../configs/ApiMovies';
import * as actions from '../../../../../store/actions';
import { filterByType } from '../../../../helpers/filter';


const GridItem = ({ name, id, media_type, poster_path, fechedResults, fetchSelected, selectedMediaType, showModal, singleMedia, collectionMedia,
  search: { mediaType, filterType, currentPage },
  collections: { collections, status } }) => {

  // Check the state - searching or fetching data
  const media = media_type ? media_type : mediaType;

  // Check by mediaType too
  let isMediaInCollection;

  // Check passed props if collection is passed find media in collection
  // else use the passed one
  if (fechedResults) {
    // Check for existing media in collection
    let findById = filterByType('match', collections, 'mediaId', id);
    let matchType = findById.mediaType === media_type || findById.mediaName === name ? findById : null;

    if (matchType !== null) {
      isMediaInCollection = matchType[0];
    }
  } else {
    isMediaInCollection = collectionMedia;
  }

  // Link path
  let linkPath = collectionMedia ? `/collections/${status}/id=${id}` : `/${mediaType}/${filterType}/page=${currentPage}/id=${id}`;

  // Card image check
  let currentCardImage = poster_path ? `url(${TheMovieDB.API_Img}${poster_path})` : `url(${noCoverImg})`;

  const loadSingleMedia = () => {
    singleMedia(media, id, fetchSelected, selectedMediaType, showModal)
  }

  return (
    <div className="movie-grid-item">
      <div className="item-wrapper">
        <Link to={linkPath} className='card-link'>
          <div className='item-image-container'>
            {collectionMedia ?
              // Top info of card
              <div className="card-top">
                <div className="card-top-rating-container">
                  <div className="card-top-mediaType">{media}</div>
                  {collectionMedia.userRating !== 'select' ?
                    <div className="rating-star">
                      <span className={`card-top-rating ${colorThemes.userRating[collectionMedia.userRating]}`}>{collectionMedia.userRating}</span>
                    </div> : null}
                </div>
              </div> : null}
            {/* Bottom info of card */}
            <div className="card-bottom">
              <span className="title" onClick={() => loadSingleMedia()}>{name}</span>
              {isMediaInCollection ? <span className={`fl ${colorThemes.statuStyle[isMediaInCollection.watchStatus]}`}>{cardStatusConfig.title[isMediaInCollection.watchStatus]}</span> : null}
            </div>
            {/*  Card image */}
            <div className='singleImg' style={{ backgroundImage: `${currentCardImage}` }} onClick={() => loadSingleMedia()}></div>
          </div>
        </Link>
      </div>
    </div >
  )
}
const mapStateToProps = state => {
  return {
    // search state
    search: state.search,

    // collections state
    collections: state.collections
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // selectedAction
    fetchSelected: (id, mediaType) => dispatch(actions.fetchSelected(id, mediaType)),
    selectedMediaType: (type) => dispatch(actions.selectedMediaType(type)),
    showModal: () => dispatch(actions.showModal()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GridItem);
