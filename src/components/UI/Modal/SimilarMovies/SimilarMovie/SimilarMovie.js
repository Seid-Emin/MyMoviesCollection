import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions/index'

import './SimilarMovie.css'
import { Link } from 'react-router-dom';

class SimilarMovie extends Component {
  getSelectedVideo = (e) => {
    const { result, mediaType, fetchSelected, showSelected } = this.props;
    e.preventDefault();
    fetchSelected(result.id, mediaType);
    showSelected();
    console.log('i was excecuted *times');
  }
  render() {
    const { result, mediaType } = this.props;
    return (
      <div className="card-action" onClick={this.getSelectedVideo}>
        <Link to={`/${mediaType}/id=${result.id}`}>
          <img className='similarMovie-img' src={'https://image.tmdb.org/t/p/w500/' + result.poster_path} alt={result.original_name} />
          <p className='similarMovie-title'>{result.title || result.name}</p>
        </Link>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSelected: (id, mediaType) => dispatch(actions.fetchSelected(id, mediaType)),
    showSelected: () => dispatch(actions.showSelected())
  }
}

export default connect(null, mapDispatchToProps)(SimilarMovie)
