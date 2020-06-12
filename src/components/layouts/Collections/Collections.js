import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { withRouter } from "react-router";
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import './Collections.css';

import * as actions from '../../../store/actions/index';
import CollectionItem from './CollectionItem/CollectionItem';

import TheMovieDB from '../../../configs/ApiMovies';
import { singleMedia } from '../../helpers/silgleMedia';
import { spinnerWhileLoading } from '../../helpers/spinnerWhileLoadingpropNames';

export class Collections extends Component {

  componentWillMount() {
    this.props.getCollectionFromFirestore()
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if ((nextProps.mediaCollections !== this.props.mediaCollections)
  //     || (nextProps.collections !== this.props.collections)) {
  //     return true
  //   }

  // }

  getSelectedMedia = (mediaId, mediaType) => {
    const { fetchSelected, selectedMediaType, showSelected } = this.props;
    fetchSelected(mediaId, mediaType);
    showSelected();
  }

  filterByStatus = (e, collections) => {
    const { filterStatusAndType, collections: { status, type } } = this.props;
    const { name, value } = e.target;
    // Check status nav clicked or option selected
    if (value) {
      filterStatusAndType(status, collections, value);
    } else {
      filterStatusAndType(name, collections, type);
    }

  }

  filterByType = (e) => {
    const { value } = e.target;
    this.setState({
      filterByType: value
    })
  }

  render() {
    const { collections: { collections, status, type, filteredCollections }, fetchSelected, selectedMediaType, showSelected, deleteMediaFromFirestore } = this.props;

    // Guard route
    // If initial filteredCollections is undefined
    // means route is pasted directly to /collection/*
    // the load initial state/page
    if (!filteredCollections) {
      return <Redirect to={'/'} />;
    }

    // List of collection items
    let collectionItem = filteredCollections.map((media, index) => {
      return <CollectionItem
        key={media.mediaId}
        media={media}
        number={index}
        fetchSelected={fetchSelected}
        selectedMediaType={selectedMediaType}
        showSelected={showSelected}
        deleteMediaFromFirestore={deleteMediaFromFirestore}
        collections={collections}
        filteredCollections={filteredCollections}
        status={status}
        singleMedia={singleMedia}
      />
    })

    return (
      <div className="collection-container">
        <div className="collection-status">
          <div className='collection-nav'>
            <NavLink
              to='/Collections/all_media'
              className="collection-navlink"
              activeClassName='activeNavLinks-collection'
              name='all_media'
              onClick={(e) => this.filterByStatus(e, collections)}>All Media</NavLink>
            <NavLink
              to='/Collections/currently_watching'
              className="collection-navlink"
              activeClassName='activeNavLinks-collection'
              name='watching'
              onClick={(e) => this.filterByStatus(e, collections)} >Currently Watching</NavLink>
            <NavLink
              to='/Collections/completed'
              className="collection-navlink"
              activeClassName='activeNavLinks-collection'
              name='completed'
              onClick={(e) => this.filterByStatus(e, collections)}>Completed</NavLink>
            <NavLink
              to='/Collections/on_hold'
              className="collection-navlink"
              activeClassName='activeNavLinks-collection'
              name='on_hold'
              onClick={(e) => this.filterByStatus(e, collections)}>On Hold</NavLink>
            <NavLink
              to='/Collections/dropped'
              className="collection-navlink"
              activeClassName='activeNavLinks-collection'
              name='dropped'
              onClick={(e) => this.filterByStatus(e, collections)}>Dropped</NavLink>
            <NavLink
              to='/Collections/plan_to_watch'
              className="collection-navlink"
              activeClassName='activeNavLinks-collection'
              name='plan_to_watch'
              onClick={(e) => this.filterByStatus(e, collections)}>Plan to Watch</NavLink>
          </div>
        </div>
        <div className="collection-list">
          <div className="list-unit">
            <div className="list-status-title">{status.replace('_', ' ')}</div>
            <table>
              <tbody>
                <tr className="list-table-header">
                  <th className="header-title status"></th>
                  <th className="header-title number">#</th>
                  <th className="header-title image">Image</th>
                  <th className="header-title title">Title</th>
                  <th className="header-title score">Score</th>
                  <th className="header-title type">
                    <select
                      name="mediaType-filter"
                      className='list-type-select'
                      name="mediaType"
                      onChange={(e) => this.filterByStatus(e, collections)}>
                      <option value="all">All</option>
                      <option value="movie">Movie</option>
                      <option value="tv">Tv</option>
                    </select>
                  </th>
                </tr>
              </tbody>
              {collectionItem}
            </table>
          </div>
        </div>
      </div>
    )
  }
}



const mapStateToProps = state => {
  return {
    collections: state.collections
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSelected: (id, mediaType) => dispatch(actions.fetchSelected(id, mediaType)),
    selectedMediaType: (type) => dispatch(actions.selectedMediaType(type)),
    showSelected: () => dispatch(actions.showSelected()),
    deleteMediaFromFirestore: (mediaId, collections, filteredCollections) => dispatch(actions.deleteMediaFromFirestore(mediaId, collections, filteredCollections)),
    getCollectionFromFirestore: () => dispatch(actions.getCollectionFromFirestore()),
    filterStatusAndType: (status, collections, type) => dispatch(actions.filterStatusAndType(status, collections, type))
  }
}

const userId = localStorage.getItem('userId');

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  // connect((state) => ({ auth: state.firebase.auth })),
  // // show loading spinner while auth is loading
  // spinnerWhileLoading(['auth']),
  // firestoreConnect([
  //   {
  //     collection: 'users',
  //     doc: userId,
  //     subcollections: [
  //       {
  //         collection: 'mediaCollections',
  //         orderBy: ['createdAt', 'desc'],
  //       }
  //     ],
  //     storeAs: 'mediaCollections'
  //   },
  // ])
)(withRouter(Collections));

