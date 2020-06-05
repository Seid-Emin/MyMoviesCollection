import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { withRouter } from "react-router";
import { useSelector } from 'react-redux'

import * as actions from '../../../../store/actions/index';

import TheMovieDB from '../../../../configs/ApiMovies';
import { singleMedia } from '../../../helpers/silgleMedia';

import './CollectionItem.css'

const CollectionItem = ({ media: { mediaId, mediaName, mediaType, posterURL, watchStatus }, number, clicked }) => {

  let statuStyle = {
    watching: 'watching',
    completed: 'completed',
    on_hold: 'onHold',
    dropped: 'dropped',
    plan_to_watch: 'planToWatch'
  }

  return (
    <tbody className='list-item' >
      <tr className="list-table-data">
        <td className={"data status " + statuStyle[watchStatus]}></td>
        <td className="data number">{number + 1}</td>
        <td className="data image">
          <NavLink to={'/Collections/all_media/id=' + mediaId} className="link sort"  >
            <img src={TheMovieDB.API_Img + posterURL} alt={mediaName + ' image'} className="hover-info image" onClick={() => clicked(mediaId, mediaType)} />
          </NavLink>
        </td>
        <td className="data title clearfix">
          <NavLink to={'/Collections/all_media/id=' + mediaId} className="link sort" onClick={() => clicked(mediaId, mediaType)}> {mediaName}</NavLink>
          <div className="delete-media">
            <span href="#" className="List_LightBox">delete</span>
          </div>
        </td>
        <td className="data score">
          <span className="score-label score-na">-</span>
        </td>
        <td className="data type">{mediaType}</td>
      </tr>
    </tbody>
  )
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CollectionItem))
