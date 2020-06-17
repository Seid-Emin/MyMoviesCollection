import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { withRouter } from "react-router";

import './Collections.css';

// Redux actions and helper methods
import * as actions from '../../../store/actions/index';

// Components
import SelectMediaType from '../../UI/Select/SelectMediaType/SelectMediaType';
import CollectionList from './CollectionList/CollectionList';



class Collections extends Component {

  componentDidMount() {
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

    const collectionLinks = {
      all_media: 'all_media',
      watching: 'watching',
      completed: 'completed',
      on_hold: 'on_hold',
      dropped: 'dropped',
      plan_to_watch: 'plan_to_watch'
    }

    return (
      <div className="collection-container">
        <div className="collection-status">
          <div className='collection-nav'>
            {Object.keys(collectionLinks).map((link, index) => {
              let currentLink = collectionLinks[link];
              return <NavLink
                key={index}
                to={`/Collections/${currentLink}`}
                className="collection-navlink"
                activeClassName='activeNavLinks-collection'
                name={currentLink}
                onClick={(e) => this.filterByStatus(e, collections)}>{currentLink.replace(/_/g, ' ')}</NavLink>
            })}
          </div>
        </div>
        <div className="collection-list">
          <div className="list-unit">
            <div className='list-unit-bar'>
              <div className="list-status-title">{status.replace('_', ' ')}</div>
              <SelectMediaType handler={this.filterByStatus} />
            </div>
            <CollectionList
              collections={collections}
              status={status}
              filteredCollections={filteredCollections}
              fetchSelected={fetchSelected}
              selectedMediaType={selectedMediaType}
              showModal={showModal}
              deleteMediaFromFirestore={deleteMediaFromFirestore} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Collections);

// message to display
// needs to be created separately and implemented everywhere needed
// const Message = (props) => {
//   return (
//     <p>{props.message}</p>
//   )
// }