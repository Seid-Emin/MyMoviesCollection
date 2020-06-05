import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { withRouter } from "react-router";
import TheMovieDB from '../../../../configs/ApiMovies';

import * as actions from '../../../../store/actions/index';
import { singleMedia } from '../../../helpers/silgleMedia';

import './Card.css';

class Card extends Component {
  getSelectedVideo = (e) => {
    singleMedia(this.props, e);
  }
  render() {
    const media = this.props.result.media_type ? this.props.result.media_type : this.props.filteredMediaType;
    const { result, filterType, currentPage } = this.props;
    return (
      <div className="movie-grid-item">
        <div className="item-wrapper">
          <div className='item-image' onClick={this.getSelectedVideo}>
            <div className="card-imagePoster">
              <Link to={`/${media}/${filterType}/page=${currentPage}/id=${result.id}`}>
                <img src={TheMovieDB.API_Img + result.poster_path} alt={result.original_name} />
              </Link>
            </div>
          </div>
          <span className="card-title">{result.original_name || result.title}</span>
          <div className="card-action">
            <button className="blue darken-4 waves-effect waves-light btn modal-trigger" onClick={this.getSelectedVideo}><Link to={`/${media}/id=${result.id}`}>Info</Link></button>
          </div>

        </div>
      </div>
    )
  }
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
    showSelected: () => dispatch(actions.showSelected())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Card))
