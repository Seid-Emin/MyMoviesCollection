import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { withRouter } from "react-router";

import * as actions from '../../../../store/actions/index'

import './Card.css'

class Card extends Component {
  getSelectedVideo = (e) => {
    e.preventDefault();
    let media = this.props.result.media_type ? this.props.result.media_type : this.props.filteredMediaType;

    this.props.fetchSelected(this.props.result.id, media);
    this.props.selectedMediaType(media);
    this.props.showSelected();
  }
  render() {
    const media = this.props.result.media_type ? this.props.result.media_type : this.props.filteredMediaType;
    const { result } = this.props;
    return (
      <div className="movie-grid-item">
        <div className="item-wrapper">
          <div className='item-image' onClick={this.getSelectedVideo}>
            <div className="card-imagePoster">
              <Link to={`/${media}/${result.id}`}>
                <img src={'https://image.tmdb.org/t/p/w500/' + result.poster_path} alt={result.original_name} />
              </Link>
            </div>
          </div>
          <span className="card-title">{result.original_name || result.title}</span>
          <div className="card-action">
            <button className="blue darken-4 waves-effect waves-light btn modal-trigger" onClick={this.getSelectedVideo}><Link to={`/${media}/${result.id}`}>Info</Link></button>
          </div>

        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    filteredMediaType: state.search.mediaType
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSelected: (id, mediaType) => dispatch(actions.fetchSelected(id, mediaType)),
    selectedMediaType: (type) => dispatch(actions.selectedMediaType(type)),
    showSelected: () => dispatch(actions.showSelected())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Card))
