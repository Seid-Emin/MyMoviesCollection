import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { withRouter } from "react-router";

import './Collections.css';

// Redux actions and helper methods
import * as actions from '../../../store/actions';

// Components
import SelectMediaType from '../../UI/Select/SelectMediaType/SelectMediaType';
import SelectCollectionNav from '../../UI/Select/SelectCollectionNav/SelectCollectionNav';
import ListCard from '../View/ListCard/ListCard';
import GridCard from '../View/GridCard/GridCard';



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

  filterByStatus = (e, collections, navStatus = null) => {
    const { history, filterStatusAndType, collections: { status, type } } = this.props;
    const { name, value } = e.target;

    // Check status nav clicked or option selected
    if (navStatus) {
      console.log('select mobile nav status');
      filterStatusAndType(value, collections, type);
      history.push(`/collections/${value}`);
    } else if (value) {
      // if option selected filter by type
      filterStatusAndType(status, collections, value);
    } else {
      // if nav clicked filter by status
      filterStatusAndType(name, collections, type);
    }
  }

  render() {
    // Get needed props by destructuring
    const { collections: { collections, filteredCollections, status, viewType }, fetchSelected, selectedMediaType, showModal, deleteMediaFromFirestore, changeCollectionView } = this.props;

    const collectionLinks = {
      all_media: 'all_media',
      watching: 'watching',
      completed: 'completed',
      on_hold: 'on_hold',
      dropped: 'dropped',
      plan_to_watch: 'plan_to_watch'
    }

    // Set active class to viewType according to state
    let listActive, gridActive;
    if (viewType === 'listCard') {
      listActive = 'listCard-active';
    } else {
      gridActive = 'gridCard-active'
    }

    return (
      <div className="collection-container">
        <div className="collection-status">
          <div className='collection-nav'>
            <ul>
              {Object.keys(collectionLinks).map((link, index) => {
                let currentLink = collectionLinks[link];
                return (
                  <li>
                    <NavLink
                      key={index}
                      to={`/collections/${currentLink}`}
                      className="collection-navlink"
                      activeClassName='activeNavLinks-collection'
                      name={currentLink}
                      onClick={(e) => this.filterByStatus(e, collections)}>{currentLink.replace(/_/g, ' ')}</NavLink>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <div className="collection-list">
          <div className="list-unit">
            <div className='list-unit-bar'>
              <div className="list-status-title">{status.replace(/_/g, ' ')}</div>
              <div className="unit-actions-container">
                <div
                  className={`unit-listView listCard ${listActive}`}
                  onClick={() => changeCollectionView('listCard')}></div>
                <div
                  className={`unit-listView gridCard ${gridActive}`}
                  onClick={() => changeCollectionView('gridCard')}></div>
                <SelectMediaType handler={this.filterByStatus} />
              </div>
            </div>
            <SelectCollectionNav handler={this.filterByStatus} navStatus='navStatus' />
            {viewType === 'listCard' ? <ListCard
              collections={collections}
              status={status}
              filteredCollections={filteredCollections}
              fetchSelected={fetchSelected}
              selectedMediaType={selectedMediaType}
              showModal={showModal}
              deleteMediaFromFirestore={deleteMediaFromFirestore} />
              :
              <GridCard
                filteredCollections={filteredCollections} />}
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

    filterStatusAndType: (status, collections, type) => dispatch(actions.filterStatusAndType(status, collections, type)),
    changeCollectionView: (viewType) => dispatch(actions.changeCollectionView(viewType))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Collections));