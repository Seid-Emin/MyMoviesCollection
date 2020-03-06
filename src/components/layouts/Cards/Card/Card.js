import React, { Component } from 'react'
import { connect } from 'react-redux';

import * as actions from '../../../../store/actions/index'

import './Card.css'
import Modal from '../../../UI/Modal/Modal'

class Card extends Component {

  getSelectedVideo = (e) => {
    e.preventDefault();
    this.props.fetchSelected(this.props.result.id, this.props.result.media_type);
    this.props.selectedMediaType(this.props.result.media_type);
  }
  render() {
    const { result } = this.props;

    return (

      <div className="col s12 m6 l3">
        <div className="card hoverable">
          <div className="card-image">
            <img src={'https://image.tmdb.org/t/p/w500/' + result.poster_path} alt={result.original_name} />
          </div>
          <span className="card-title ">{result.original_name || result.original_title}</span>
          <div className="card-action">
            <button className="blue darken-4 waves-effect waves-light btn modal-trigger" data-target="modal1" onClick={this.getSelectedVideo}>Info</button>
            <Modal />
          </div>
        </div>
      </div>

    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSelected: (id, mediaType) => dispatch(actions.fetchSelected(id, mediaType)),
    selectedMediaType: (type) => dispatch(actions.selectedMediaType(type))
  }
}

export default connect(null, mapDispatchToProps)(Card)
