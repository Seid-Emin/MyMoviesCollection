import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index'

import Modal from '../Modal'
import './SimilarMovies.css'

class SimilarMovies extends Component {
  getSelectedVideo = (e) => {
    e.preventDefault();
    this.props.fetchSelected(this.props.result.id, this.props.mediaType);
  }
  render() {
    console.log(this.props);
    const { result } = this.props;
    return (
      <div className="card-action" onClick={this.getSelectedVideo}>
        <a className="modal-trigger" href="#modal1" target='_blank'>
          <img className='similarMovie-img' src={'https://image.tmdb.org/t/p/w500/' + result.poster_path} alt={result.original_name} />
          {result.title || result.name}
        </a>
        <Modal />
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchSelected: (id, mediaType) => dispatch(actions.fetchSelected(id, mediaType))
  }
}

export default connect(null, mapDispatchToProps)(SimilarMovies)
