import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { withRouter } from "react-router";
import TheMovieDB from '../../../../configs/ApiMovies';

import * as actions from '../../../../store/actions/index';

import './Card.css';

const Card = (
  { result: { name, id, media_type, title, original_name, poster_path },
    filterType, currentPage, filteredMediaType, fetchSelected, selectedMediaType, showModal, singleMedia }) => {

  // Check the state - searching or fetching data
  const media = media_type ? media_type : filteredMediaType;

  return (
    <div className="movie-grid-item">
      <div className="item-wrapper">
        <div className='item-image-container' onClick={() => singleMedia(media, id, fetchSelected, selectedMediaType, showModal)}>
          <Link to={`/${media}/${filterType}/page=${currentPage}/id=${id}`} className='card-link'>
            <span className="card-title">{name ? name : original_name || title}</span>
            <div className='singleImg' style={{ backgroundImage: "url(" + TheMovieDB.API_Img + poster_path + ")" }} ></div>
          </Link>
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = state => {
  return {
    filteredMediaType: state.search.mediaType,
    filterType: state.search.filterType,
    currentPage: state.search.currentPage
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSelected: (id, mediaType) => dispatch(actions.fetchSelected(id, mediaType)),
    selectedMediaType: (type) => dispatch(actions.selectedMediaType(type)),
    showModal: () => dispatch(actions.showModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Card))
