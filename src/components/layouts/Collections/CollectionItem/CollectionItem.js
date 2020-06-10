import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { withRouter } from "react-router";

import * as actions from '../../../../store/actions/index';
import { filterMatch } from '../../../helpers/filter';

import TheMovieDB from '../../../../configs/ApiMovies';

import './CollectionItem.css';
import { colorThemes } from '../../../helpers/colorThemes';

const CollectionItem = ({ media: { mediaId, mediaName, mediaType, posterURL, watchStatus }, number, clicked, deleteMediaFromFirestore, collections: {
  collections, filteredCollections, status } }) => {

  // Get selected media userRating
  let currentMedia = filterMatch(collections, 'mediaId', mediaId);

  return (
    <tbody className='list-item' >
      <tr className="list-table-data">
        <td className={"data status " + colorThemes.statuStyle[watchStatus]}></td>
        <td className="data number">{number + 1}</td>
        <td className="data image">
          <NavLink to={`/Collections/${status}/id=${mediaId}`} className="link sort"  >
            <img src={TheMovieDB.API_Img + posterURL} alt={mediaName + ' image'} className="hover-info image" onClick={() => clicked(mediaId, mediaType)} />
          </NavLink>
        </td>
        <td className="data title clearfix">
          <NavLink to={`/Collections/${status}/id=${mediaId}`} className="link sort" onClick={() => clicked(mediaId, mediaType)}> {mediaName}</NavLink>
          <div className="delete-media">
            <span className="List_LightBox" onClick={() => deleteMediaFromFirestore(mediaId, collections, filteredCollections)}>delete</span>
          </div>
        </td>
        <td className="data score">
          {currentMedia[0].userRating !== 'select' && currentMedia[0].userRating ? <span className="score-label score-na">{currentMedia[0].userRating}</span> : <span className="score-label score-na">-</span>}
        </td>
        <td className="data type">{mediaType}</td>
      </tr>
    </tbody>
  )
}

const mapStateToProps = state => {
  return {
    filteredMediaType: state.search.mediaType,
    collections: state.collections
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSelected: (id, mediaType) => dispatch(actions.fetchSelected(id, mediaType)),
    selectedMediaType: (type) => dispatch(actions.selectedMediaType(type)),
    showSelected: () => dispatch(actions.showSelected()),
    deleteMediaFromFirestore: (mediaId, collections, filteredCollections) => dispatch(actions.deleteMediaFromFirestore(mediaId, collections, filteredCollections))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CollectionItem))
