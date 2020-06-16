import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { withRouter } from "react-router";

import './Card.css';

// Colors object for conditional style and configs
import { colorThemes } from '../../../UI/Styles/colorThemes';
import { cardStatusConfig } from '../Card/cardStatusConfig';
import TheMovieDB from '../../../../configs/ApiMovies';
import * as actions from '../../../../store/actions/index';

import Select from '../../../UI/Select/Select';



const Card = (
  { result: { name, id, media_type, title, original_name, original_title, poster_path },
    filterType, currentPage, filteredMediaType, fetchSelected, selectedMediaType, showModal, singleMedia,
    collections: { collections } }) => {

  // Check the state - searching or fetching data
  const media = media_type ? media_type : filteredMediaType;

  // Check for existing media in collection
  let findById = collections.filter(item => item.mediaId === id);
  console.log(findById);

  // Check by mediaType too
  let matchType = findById.mediaType == media_type || findById.mediaName == name || title || original_name || original_title ? findById : null;

  let isMediaInCollection;
  if (matchType !== null) {
    isMediaInCollection = matchType[0];
  }
  console.log(isMediaInCollection);

  // Card image check
  let currentCardImage = poster_path ? `url(${TheMovieDB.API_Img}${poster_path})` : 'url(https://cdn.bestmoviehd.net/share/images/no-cover.png)';

  const loadSingleMedia = () => {
    singleMedia(media, id, fetchSelected, selectedMediaType, showModal)
  }

  return (
    <div className="movie-grid-item">
      <div className="item-wrapper">
        <Link to={`/${media}/${filterType}/page=${currentPage}/id=${id}`} className='card-link'>
          <div className='item-image-container'>
            <div className="card-title">
              <span className="title" onClick={() => loadSingleMedia()}>{name ? name : title || original_name || original_title}</span>
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
