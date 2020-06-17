import React from 'react';
import { Redirect } from 'react-router-dom';

import './ListCard.css';

// Redux actions and helper methods
import { singleMedia } from '../../../helpers/silgleMedia';

// Components
import CollectionItem from '../../Collections/CollectionItem/CollectionItem';


const ListCard = ({ collections, status, filteredCollections, fetchSelected, selectedMediaType, showModal, deleteMediaFromFirestore }) => {

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
  }) : null;

  return (
    <table>
      <tbody>
        <tr className="list-table-header">
          <th className="header-title status"></th>
          <th className="header-title number">#</th>
          <th className="header-title image">Image</th>
          <th className="header-title title">Title</th>
          <th className="header-title score">Score</th>
          <th className="header-title type">Type</th>
        </tr>
      </tbody>
      {collectionItem}
    </table>
  )
}

export default ListCard;