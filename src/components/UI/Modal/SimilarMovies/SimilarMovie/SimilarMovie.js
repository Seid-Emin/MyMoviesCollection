import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './SimilarMovie.css';

// Redux actions and helper methods
import * as actions from '../../../../../store/actions/index';

// Object  configs
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
    const { result, mediaType, filterType, currentPage } = this.props;
    return (
      <div className="card-action" onClick={this.getSelectedVideo}>
        <Link to={`/${mediaType}/${filterType}/page=${currentPage}/id=${result.id}`}>
          <img className='similarMovie-img' src={TheMovieDB.API_Img + result.poster_path} alt={result.original_name} />
          <p className='similarMovie-title'>{result.title || result.name}</p>
        </Link>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    filterType: state.search.filterType,
    currentPage: state.search.currentPage
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSelected: (id, mediaType) => dispatch(actions.fetchSelected(id, mediaType)),
    showModal: () => dispatch(actions.showModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SimilarMovie)
