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
  constructor(props) {
    super(props);
    this.state = {
      statusTitle: 'All Media',
      filterByType: 'all'
    }
  }

  componentWillMount() {
    this.props.getCollectionFromFirestore()
  }

  getSelectedMedia = (mediaId, mediaType) => {
    const { fetchSelected, selectedMediaType, showSelected } = this.props;
    fetchSelected(mediaId, mediaType);
    showSelected();
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if ((nextProps.mediaCollections !== this.props.mediaCollections)
  //     || (nextProps.collections !== this.props.collections)) {
  //     return true
  //   }

  // }

  filterByType = (e) => {
    const { value } = e.target;
    this.setState({
      filterByType: value
    })
  }

  render() {
    const { statusTitle } = this.state;
    const { mediaCollections, collections } = this.props;
    console.log(collections);

    // Guard route
    // If initial collections is undefined
    // means route is pasted directly to /collection/*
    // the load initial state/page
    if (!collections) {
      return <Redirect to={'/'} />;
    }

    let collection = Object.keys(collections).map((media, index) => {
      let singleMedia = collections[media];
      return <CollectionItem key={singleMedia.mediaId} media={singleMedia} number={index} clicked={this.getSelectedMedia} />
    })


    return (
      <div className="collection-container">
        <div className="collection-status">
          <div className='collection-nav'>
            <NavLink to='/Collections/all_media' className="collection-navlink" activeClassName='activeNavLinks-collection'>All Media</NavLink>
            <NavLink to='/Collections/currently_watching' className="collection-navlink" activeClassName='activeNavLinks-collection'>Currently Watching</NavLink>
            <NavLink to='/Collections/completed' className="collection-navlink" activeClassName='activeNavLinks-collection'>Completed</NavLink>
            <NavLink to='/Collections/on_hold' className="collection-navlink" activeClassName='activeNavLinks-collection'>On Hold</NavLink>
            <NavLink to='/Collections/dropped' className="collection-navlink" activeClassName='activeNavLinks-collection'>Dropped</NavLink>
            <NavLink to='/Collections/plan_to_watch' className="collection-navlink" activeClassName='activeNavLinks-collection'>Plan to Watch</NavLink>
          </div>
        </div>
        <div className="collection-list">
          <div className="list-unit">
            <div className="list-status-title">{statusTitle.replace('_', ' ')}</div>
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
                      className='list-type-select'
                      name="list-type"
                      onClick={(e) => this.filterByType(e)}>
                      <option value="all">All</option>
                      <option value="movie">Movie</option>
                      <option value="tv">Tv</option>
                    </select>
                  </th>
                </tr>
              </tbody>
              {collection}
            </table>
          </div>
        </div>
      </div>
    )
  }
}



const mapStateToProps = state => {
  // const projects = state.firestore.data.mediaCollections;
  // console.log(projects);
  // for (let media in projects) {
  //   console.log(media);

  // }

  return {
    mediaCollections: state.media.collections,
    collections: state.collections.collections
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSelected: (id, mediaType) => dispatch(actions.fetchSelected(id, mediaType)),
    selectedMediaType: (type) => dispatch(actions.selectedMediaType(type)),
    showSelected: () => dispatch(actions.showSelected()),
    getCollectionFromFirestore: () => dispatch(actions.getCollectionFromFirestore())
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

