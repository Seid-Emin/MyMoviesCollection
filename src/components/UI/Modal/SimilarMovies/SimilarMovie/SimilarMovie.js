import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";

import './SimilarMovie.css';
import noCoverImg from '../../../../../assets/images/no-cover.png';

// Redux actions and helper methods
// Object  configs
import * as actions from '../../../../../store/actions';
import TheMovieDB from '../../../../../configs/ApiMovies';


class SimilarMovie extends Component {
  getSelectedVideo = (e) => {
    const { result, mediaType, fetchSelected, showModal } = this.props;
    e.preventDefault();
    fetchSelected(result.id, mediaType);
    showModal();
    console.log('i was excecuted *times');
  }


  render() {
    const { result: { id, name, title, original_name, poster_path },
      mediaType, filterType, currentPage, history, collections: { status } } = this.props;


    let posterPath = poster_path ? TheMovieDB.API_Img + poster_path : noCoverImg;

    let linkPath = history.location.pathname.includes('collections') ? `/collections/${status}/id=${id}` : `/${mediaType}/${filterType}/page=${currentPage}/id=${id}`
    return (
      <div className="card-action" onClick={this.getSelectedVideo}>
        <Link to={linkPath}>
          <img className='similarMovie-img' src={posterPath} alt={original_name} />
          <p className='similarMovie-title'>{title || name}</p>
        </Link>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    filterType: state.search.filterType,
    currentPage: state.search.currentPage,
    collections: state.collections
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSelected: (id, mediaType) => dispatch(actions.fetchSelected(id, mediaType)),
    showModal: () => dispatch(actions.showModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SimilarMovie))
