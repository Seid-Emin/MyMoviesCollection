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
import ListCards from '../View/ListCard/ListCards';
import GridCards from '../View/GridCard/GridCards';


class Collections extends Component {

  componentDidMount() {
    // get needed props
    const { collections: { status, collections, type }, filterStatusAndType, uid, history } = this.props;

    filterStatusAndType(status, collections, type);


  }

  // componentDidUpdate(prevProps) {
  //   const { collections: { status, collections, type, filteredCollections }, filterStatusAndType, history } = this.props;
  //   if (prevProps.filteredCollections != filteredCollections) {
  //     console.log(history);

  //     filterStatusAndType(status, collections, type);
  //   }

  // }

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
    const { collections: { collections, filteredCollections, status, viewType }, fetchSelected, selectedMediaType, showModal, deleteMediaFromFirestore, changeCollectionView, uid } = this.props;

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

    let invalidMessage = !uid ? <p className='invalid-collection'>Please
    <a href="/signin"> Login
      </a> to access your collections</p> : null;

    let emptyCollection = uid && !filteredCollections[0] ? <p className='invalid-collection'>No items in this collection</p> : null

    return (
      <section className="collection-container">
        <nav className="collection-status">
          <div className='collection-nav'>
            <ul>
              {Object.keys(collectionLinks).map((link, index) => {
                let currentLink = collectionLinks[link];
                return (
                  <li key={index}>
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
        </nav>
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
            {filteredCollections[0] ? viewType === 'listCard' ? <ListCards
              collections={collections}
              status={status}
              filteredCollections={filteredCollections}
              fetchSelected={fetchSelected}
              selectedMediaType={selectedMediaType}
              showModal={showModal}
              deleteMediaFromFirestore={deleteMediaFromFirestore} />
              : <GridCards
                filteredCollections={filteredCollections} />
              : null}
          </div>
        </div>
        {invalidMessage}
        {emptyCollection}
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    // Firebase state
    uid: state.firebase.auth.uid,

    // collections state
    collections: state.collections,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // selectedAction
    fetchSelected: (id, mediaType) => dispatch(actions.fetchSelected(id, mediaType)),
    selectedMediaType: (type) => dispatch(actions.selectedMediaType(type)),
    showModal: () => dispatch(actions.showModal()),

    // collectionActions
    deleteMediaFromFirestore: (mediaId, collections, filteredCollections) => dispatch(actions.deleteMediaFromFirestore(mediaId, collections, filteredCollections)),
    filterStatusAndType: (status, collections, type) => dispatch(actions.filterStatusAndType(status, collections, type)),
    changeCollectionView: (viewType) => dispatch(actions.changeCollectionView(viewType))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Collections));