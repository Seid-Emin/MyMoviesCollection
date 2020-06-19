import * as actionTypes from './actionTypes';
import { filterSellection, filterByType } from '../../components/helpers/filter';

export const addMediaToFirestore_Start = () => {
  return {
    type: actionTypes.ADD_MEDIA_TO_FIRESTORE_START
  };
};

export const addMediaToFirestor_Success = (newMedia, collections, filteredCollections) => {
  return {
    type: actionTypes.ADD_MEDIA_TO_FIRESTORE_SUCCESS,
    newMedia,
    collections,
    filteredCollections
  };
};

export const addMediaToFirestor_Fail = (error) => {
  return {
    type: actionTypes.ADD_MEDIA_TO_FIRESTORE_FAIL
  };
};

export const addMediaToFirestoreCollection = (userRating, mediaType, mediaId, mediaName, posterURL, watchStatus, collections, status, type) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(addMediaToFirestore_Start());

    // Get firestore
    const firestore = getFirestore();

    // Get iud to be passed for doc creation
    const authorId = getState().firebase.auth.uid;

    // Set customID for future doc manipulations and set it to firestore
    let customID = `${mediaType}${mediaId}`;

    // Create media info obj, for simple Collections display
    let newMedia = {
      userRating,
      watchStatus,
      mediaType,
      mediaId,
      customID,
      mediaName,
      posterURL,
      createdAt: Date.now()
    }

    // Update/Add to collection
    collections.push(newMedia);
    let filteredCollections = filterSellection(collections, 'watchStatus', status, 'mediaType', type);

    // Set selecte media in firestore
    firestore.collection('users').doc(authorId)
      .collection('mediaCollections').doc(customID).set(newMedia)
      .then(() => {
        dispatch(addMediaToFirestor_Success(newMedia, collections, filteredCollections));
      }).catch(error => {
        dispatch(addMediaToFirestor_Fail(error));
      });
  }
}

// Update media Status
export const updateMediaStatus_Start = () => {
  return {
    type: actionTypes.UPDATE_STATUS_START
  };
};

export const updateMediaStatus_Success = (collections, filteredCollections) => {
  return {
    type: actionTypes.UPDATE_STATUS_SUCCESS,
    collections,
    filteredCollections
  };
};

// update firestore collection only
// const updateCollections = (collections, filteredCollections) => {
//   return {
//     type: actionTypes.UPDATE_STATUS_SUCCESS,
//     collections,
//     filteredCollections
//   };
// }

export const updateMediaStatus_Fail = (error) => {
  return {
    type: actionTypes.UPDATE_STATUS_FAIL,
    error
  };
};

export const updateMediaStatus = (status, mediaId, watchStatus, name, type, collections, filteredCollections, selectedMediaType) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(updateMediaStatus_Start());

    // Get firestore
    const firestore = getFirestore();

    // Get iud to be passed for doc creation
    const authorId = getState().firebase.auth.uid;

    // Set customID for future doc manipulations and set it to firestore
    let customID = `${selectedMediaType}${mediaId}`;
    console.log();

    // Update/Add to collection
    let collectionIndex = collections.findIndex(media => media.customID == customID);
    collections[collectionIndex][name] = watchStatus;

    let filteredCollectionsIndex = filteredCollections.findIndex(media => media.customID === customID);
    filteredCollections[filteredCollectionsIndex][name] = watchStatus;

    // Set selecte media in firestore
    firestore.collection('users').doc(authorId)
      .collection('mediaCollections').doc(customID).update({
        [name]: watchStatus
      })
      .then(() => {
        dispatch(updateMediaStatus_Success(collections, filteredCollections));
      }).catch(error => {
        dispatch(updateMediaStatus_Fail(error))
      });
  }
}

// Get collection
export const getCollectionFromFirestore_Start = () => {
  return {
    type: actionTypes.GET_MEDIA_COLLECTIONS_START
  };
};

export const getCollectionFromFirestore_Success = (response) => {
  return {
    type: actionTypes.GET_MEDIA_COLLECTIONS_SUCCESS,
    collection: response
  };
};

export const getCollectionFromFirestore_Fail = (error) => {
  return {
    type: actionTypes.GET_MEDIA_COLLECTIONS_FAIL,
    error
  };
};

export const getCollectionFromFirestore = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(getCollectionFromFirestore_Start());

    // Get firestore
    const firestore = getFirestore();

    // Get iud to be passed for doc creation
    const authorId = localStorage.getItem('userId');

    // Set selecte media in firestore
    firestore.collection('users').doc(authorId)
      .collection('mediaCollections')
      .get()
      .then((response) => {
        const data = response.docs.map(doc => doc.data());
        dispatch(getCollectionFromFirestore_Success(data))
      }).catch(error => {
        dispatch(getCollectionFromFirestore_Fail(error))
      });
  }
}

// Display picked/filtered by Status collection
export const filterStatusAndType_Start = () => {
  return {
    type: actionTypes.FILTER_BY_STATUS_AND_TYPE_START
  };
};

export const filterStatusAndType_Success = (updateCollections, status, type) => {
  return {
    type: actionTypes.FILTER_BY_STATUS_AND_TYPE_SUCCESS,
    filterByStatus: updateCollections,
    status,
    mediaType: type
  };
};

export const filterStatusAndType_Fail = (error) => {
  return {
    type: actionTypes.FILTER_BY_STATUS_AND_TYPE_FAIL,
    error
  };
};

export const filterStatusAndType = (status, collections, type) => {
  return (dispatch) => {
    if (collections) {
      dispatch(filterStatusAndType_Start());

      let updateCollections = filterSellection(collections, 'watchStatus', status, 'mediaType', type);
      dispatch(filterStatusAndType_Success(updateCollections, status, type));
    } else {
      let error = 'no collection here'
      dispatch(filterStatusAndType_Fail(error));
    }
  }
}

// Delete media from collection
export const deleteMediaFromFirestore_Start = () => {
  return {
    type: actionTypes.DELETE_MEDIA_START
  };
};

export const deleteMediaFromFirestore_Success = (updateCollections, updateFilteredCollections) => {
  return {
    type: actionTypes.DELETE_MEDIA_SUCCESS,
    updateCollections,
    updateFilteredCollections
  };
};

export const deleteMediaFromFirestore_Fail = (error) => {
  return {
    type: actionTypes.DELETE_MEDIA_FAIL,
    error
  };
};

export const deleteMediaFromFirestore = (customID, collections, filteredCollections) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(deleteMediaFromFirestore_Start());

    // Get firestore
    const firestore = getFirestore();

    // Get iud to be passed for doc creation
    const authorId = getState().firebase.auth.uid;

    // Remove from stored collections
    let updateCollections = filterByType('exclude', collections, 'customID', customID);

    // Remove from filtered to prevent further issues
    let updateFilteredCollections = filterByType('exclude', filteredCollections, 'customID', customID);;

    // Set selecte media in firestore
    firestore.collection('users').doc(authorId)
      .collection('mediaCollections').doc(customID)
      .delete()
      .then(() => {
        dispatch(deleteMediaFromFirestore_Success(updateCollections, updateFilteredCollections));
      })
      .catch(error => {
        dispatch(deleteMediaFromFirestore_Fail(error))
      });
  }
}


// Change Collection View
export const changeCollectionView = (viewType) => {
  return {
    type: actionTypes.CHANGE_COLLECTION_VIEW,
    viewType: viewType
  };
};

