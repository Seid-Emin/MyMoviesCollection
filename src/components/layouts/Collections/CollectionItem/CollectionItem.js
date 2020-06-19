import React from 'react';
import { Link } from 'react-router-dom';

import './CollectionItem.css';

import noCoverImg from '../../../../assets/images/no-cover.png';

// Colors object for conditional style and configs
import { colorThemes } from '../../../UI/Styles/colorThemes';
import TheMovieDB from '../../../../configs/ApiMovies';

const CollectionItem = ({
  media: { mediaId, customID, mediaName, mediaType, posterURL, watchStatus, userRating },
  fetchSelected, selectedMediaType, showModal, deleteMediaFromFirestore, collections, filteredCollections, status, number, singleMedia }) => {

  //check if poster_path exist in the responce
  let posterPath = posterURL ? TheMovieDB.API_Img + posterURL : noCoverImg;

  return (
    <tbody className='list-item' >
      <tr className="list-table-data">
        <td className={"data status " + colorThemes.statuStyle[watchStatus]}></td>
        <td className="data number">{number + 1}</td>
        <td className="data image">
          <Link to={`/collections/${status}/id=${mediaId}`} className="link sort"  >
            <img src={posterPath} alt={mediaName + ' image'} className="hover-info image" onClick={() => singleMedia(mediaType, mediaId, fetchSelected, selectedMediaType, showModal)} />
          </Link>
        </td>
        <td className="data title clearfix">
          <div className='title-inner'>
            <Link to={`/collections/${status}/id=${mediaId}`} className="link sort" onClick={() => singleMedia(mediaType, mediaId, fetchSelected, selectedMediaType, showModal)}>{mediaName}</Link>
            <div className="delete-media">
              <span className="List_LightBox" onClick={() => deleteMediaFromFirestore(customID, collections, filteredCollections)}>delete</span>
            </div>
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
