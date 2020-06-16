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
    filterType, currentPage, filteredMediaType, fetchSelected, selectedMediaType, showModal, singleMedia, updateMediaStatus,
    collections: { collections, type, status } }) => {

  // Check the state - searching or fetching data
  const media = media_type ? media_type : filteredMediaType;

  // Check for existing media in collection
  let findById = collections.filter(item => item.mediaId === id);

  // Check by mediaType too
  let matchType = findById.mediaType == media_type ? findById : null;
  let isMediaInCollection = matchType[0];
  console.log(matchType);

  const loadSingleMedia = () => {
    singleMedia(media, id, fetchSelected, selectedMediaType, showModal)
  }

  const handleStatusAndRating = (e) => {
    const { value, name } = e.target;
    updateMediaStatus(status, id, value, name, type, collections);
  }

  return (
    <div className="movie-grid-item">
      <div className="item-wrapper">
        <div className='item-image-container'>
          <div className="card-title">
            <Link to={`/${media}/${filterType}/page=${currentPage}/id=${id}`} className='card-link'>
              <span className="title" onClick={() => loadSingleMedia()}>{name ? name : title || original_name || original_title}</span>
            </Link>
            {isMediaInCollection ?
              <Select
                selectName='cardStatus'
                selectClass={`fl ${colorThemes.statuStyle[isMediaInCollection.watchStatus]}`}
                value={isMediaInCollection.watchStatus}

                handler={handleStatusAndRating}
              /> : null}

            {/* {isMediaInCollection ? <span className={`fl ${colorThemes.statuStyle[isMediaInCollection.watchStatus]}`}>{cardStatusConfig.title[isMediaInCollection.watchStatus]}</span> : null} */}
          </div>
          <Link to={`/${media}/${filterType}/page=${currentPage}/id=${id}`} className='card-link'>
            <div className='singleImg' style={{ backgroundImage: "url(" + TheMovieDB.API_Img + poster_path + ")" }} onClick={() => loadSingleMedia()}></div>
          </Link>
        </div>
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
    updateMediaStatus: (status, id, watchStatus, name, type, collections) => dispatch(actions.updateMediaStatus(status, id, watchStatus, name, type, collections)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Card));
