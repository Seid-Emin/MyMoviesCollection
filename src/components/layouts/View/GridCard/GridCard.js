import React from 'react';

import './GridCard.css';

// 
import { singleMedia } from '../../../helpers/silgleMedia';

import Card from '../../Cards/Card/Card';

const GridCard = ({ fechedResults, filteredCollections }) => {

  let results = fechedResults ? fechedResults : filteredCollections;

  let singleCard = results ? results.map(card => {

    const { name, id, media_type, title, original_name, original_title, poster_path, mediaId, mediaName, mediaType, posterURL } = card;
    let collectionMedia = !fechedResults ? card : null;

    return <Card
      key={id || mediaId}
      name={name || mediaName || title || original_name || original_title}
      id={id || mediaId}
      media_type={media_type || mediaType}
      poster_path={poster_path || posterURL}
      singleMedia={singleMedia}
      fechedResults={fechedResults}
      collectionMedia={collectionMedia} />
  }) : <h6 className='noResults'>No Results Found</h6>

  console.log('gridCard');

  return (
    <div className='row-2-cards movie-grid'>
      {singleCard}
    </div>
  )
}

export default React.memo(GridCard);
