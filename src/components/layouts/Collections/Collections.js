import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { withRouter } from "react-router";

import './Collections.css';

// Redux actions and helper methods
import * as actions from '../../../store/actions/index';
import { singleMedia } from '../../helpers/silgleMedia';

// Components
import CollectionItem from './CollectionItem/CollectionItem';
import Select from '../../UI/Select/Select';



export class Collections extends Component {

  componentWillMount() {
    // get needed props
    const { collections: { collections, type }, filterStatusAndType } = this.props;

    // display previous user filtered collection type only
    filterStatusAndType('all_media', collections, type);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   const { collections: { collections, type, filteredCollections }, filterStatusAndType } = this.props;
  //   if ((nextProps.filteredCollections !== filteredCollections)) {
  //     return true
  //   }
  // }

  filterByStatus = (e, collections) => {
    const { filterStatusAndType, collections: { status, type } } = this.props;
    const { name, value } = e.target;

    // Check status nav clicked or option selected
    if (value) {
      // if option selected filter by type
      filterStatusAndType(status, collections, value);
    } else {
      // if nav clicked filter by status
      filterStatusAndType(name, collections, type);
    }
  }

  render() {
    // Get needed props by destructuring
    const { collections: { collections, status, type, filteredCollections }, fetchSelected, selectedMediaType, showModal, deleteMediaFromFirestore } = this.props;

    // Guard route
    // If initial filteredCollections is undefined
    // means route is pasted directly to /collection/*
    // the load initial state/page
    if (!filteredCollections) {
      return <Redirect to={'/'} />;
    }

    // List of collection items
    let collectionItem = filteredCollections[0] ? filteredCollections.map((media, index) => {
      return <CollectionItem
        key={media.mediaId}
        media={media}
        number={index}
        fetchSelected={fetchSelected}
        selectedMediaType={selectedMediaType}
        showModal={showModal}
        deleteMediaFromFirestore={deleteMediaFromFirestore}
        collections={collections}
        filteredCollections={filteredCollections}
        status={status}
        singleMedia={singleMedia}
      />
    }) : <Message message='no media' />

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
              to='/Collections/watching'
              className="collection-navlink"
              activeClassName='activeNavLinks-collection'
              name='watching'
              onClick={(e) => this.filterByStatus(e, collections)} >Watching</NavLink>
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
                    <Select
                      selectName='mediaType'
                      selectClass='list-type-select'
                      payload={collections}
                      handler={this.filterByStatus} />
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
    showModal: () => dispatch(actions.showModal()),
    deleteMediaFromFirestore: (mediaId, collections, filteredCollections) => dispatch(actions.deleteMediaFromFirestore(mediaId, collections, filteredCollections)),

    filterStatusAndType: (status, collections, type) => dispatch(actions.filterStatusAndType(status, collections, type))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Collections));

// message to display
// needs to be created separately and implemented everywhere needed
const Message = (props) => {
  return (
    <p>{props.message}</p>
  )
}