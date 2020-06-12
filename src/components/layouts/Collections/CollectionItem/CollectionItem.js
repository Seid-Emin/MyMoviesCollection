import React from 'react';
import { Link } from 'react-router-dom';

import './CollectionItem.css';

// Colors object for conditional style and configs
import { colorThemes } from '../../../UI/Styles/colorThemes';
import TheMovieDB from '../../../../configs/ApiMovies';

const CollectionItem = ({
  media: { mediaId, mediaName, mediaType, posterURL, watchStatus, userRating },
  fetchSelected, selectedMediaType, showSelected, deleteMediaFromFirestore, collections, filteredCollections, status, number, singleMedia }) => {

  return (
    <tbody className='list-item' >
      <tr className="list-table-data">
        <td className={"data status " + colorThemes.statuStyle[watchStatus]}></td>
        <td className="data number">{number + 1}</td>
        <td className="data image">
          <Link to={`/Collections/${status}/id=${mediaId}`} className="link sort"  >
            <img src={TheMovieDB.API_Img + posterURL} alt={mediaName + ' image'} className="hover-info image" onClick={() => singleMedia(mediaType, mediaId, fetchSelected, selectedMediaType, showSelected)} />
          </Link>
        </td>
        <td className="data title clearfix">
          <Link to={`/Collections/${status}/id=${mediaId}`} className="link sort" onClick={() => singleMedia(mediaType, mediaId, fetchSelected, selectedMediaType, showSelected)}>{mediaName}</Link>
          <div className="delete-media">
            <span className="List_LightBox" onClick={() => deleteMediaFromFirestore(mediaId, collections, filteredCollections)}>delete</span>
          </div>
        </td>
        <td className="data score">
          {userRating !== 'select' && userRating ? <span className="score-label score-na">{userRating}</span> : <span className="score-label score-na">-</span>}
        </td>
        <td className="data type">{mediaType}</td>
      </tr>
    </tbody>
  )
}

export default CollectionItem;
