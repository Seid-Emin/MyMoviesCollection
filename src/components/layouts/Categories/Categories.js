import React from 'react'
import { connect } from 'react-redux'

import * as actions from '../../../store/actions/index'

import Movies from './Movies/Movies';
import Tv from './TV/Tv';

import './Categories.css'

const Categories = ({ fetchFilteredMedia }) => {
  return (
    <div className='Categories-wrapper'>
      <Movies fetchData={fetchFilteredMedia} />
      <Tv fetchData={fetchFilteredMedia} />
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    fetchFilteredMedia: (mediaType, filterType) => dispatch(actions.fetchFilteredMedia(mediaType, filterType))
  }
}

export default connect(null, mapDispatchToProps)(Categories)
