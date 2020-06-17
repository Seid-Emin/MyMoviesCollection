import React from 'react';

import './GridCard.css';

// Colors object for conditional style and configs
import { singleMedia } from '../../../helpers/silgleMedia';

import Card from '../../Cards/Card/Card';

const GridCard = (
  { fechedResults, collections }) => {

  let results = fechedResults ? fechedResults : collections;

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
      collections={collections}
      collectionMedia={collectionMedia} />
  }) : <h6 className='noResults'>No Results Found</h6>

  return (

    <div className='row-2-cards movie-grid'>
      {singleCard}
    </div>

  )
}

export default React.memo(GridCard);
