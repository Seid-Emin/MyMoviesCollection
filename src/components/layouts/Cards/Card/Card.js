import React, { Component } from 'react'
import { connect } from 'react-redux';

import * as actions from '../../../../store/actions/index'

import './Card.css'

class Card extends Component {
  getSelectedVideo = (e) => {
    e.preventDefault();
    let mediaType = this.props.result.media_type ? this.props.result.media_type : this.props.mediaType;

    this.props.fetchSelected(this.props.result.id, mediaType);
    this.props.selectedMediaType(mediaType);
    this.props.showSelected();
  }
  render() {
    const { result } = this.props;
    return (
      <div className="movie-grid-item">
        <div className="item-wrapper">
          <div className='item-image' onClick={this.getSelectedVideo}>
            <div className="card-imagePoster">
              <img src={'https://image.tmdb.org/t/p/w500/' + result.poster_path} alt={result.original_name} />
            </div>
          </div>
          <span className="card-title">{result.original_name || result.original_title}</span>
          <div className="card-action">
            <button className="blue darken-4 waves-effect waves-light btn modal-trigger" onClick={this.getSelectedVideo}>Info</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSelected: (id, mediaType) => dispatch(actions.fetchSelected(id, mediaType)),
    selectedMediaType: (type) => dispatch(actions.selectedMediaType(type)),
    showSelected: () => dispatch(actions.showSelected())
  }
}

export default connect(null, mapDispatchToProps)(Card)
