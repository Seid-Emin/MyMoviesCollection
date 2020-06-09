import * as actionTypes from './actionTypes';

export const addMediaToFirestore_Start = () => {
  return {
    type: actionTypes.ADD_MEDIA_TO_FIRESTORE_START
  };
};

export const addMediaToFirestor_Success = (response) => {
  return {
    type: actionTypes.ADD_MEDIA_TO_FIRESTORE_SUCCESS,
    media: response
  };
};

export const addMediaToFirestor_Fail = (error) => {
  return {
    type: actionTypes.ADD_MEDIA_TO_FIRESTORE_FAIL
  };
};

export const addMediaToFirestoreCollection = (userRating, mediaType, mediaId, mediaName, posterURL, watchStatus, collections) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(addMediaToFirestore_Start());

    // Get firestore
    const firestore = getFirestore();

    // Get iud to be passed for doc creation
    const authorId = getState().firebase.auth.uid;

    // Create media info obj, for simple Collections display
    let newMedia = {
      userRating,
      watchStatus,
      mediaType,
      mediaId,
      mediaName,
      posterURL,
      createdAt: Date.now()
    }

    // Set customID for future doc manipulations and set it to firestore
    let customID = mediaId.toString();

    // Update/Add to collection
    collections.push(newMedia);
    console.log(collections);


    // Set selecte media in firestore
    firestore.collection('users').doc(authorId)
      .collection('mediaCollections').doc(customID).set(newMedia)
      .then(() => {
        dispatch(addMediaToFirestor_Success(newMedia));
        dispatch(updateCollections(collections));

      }).catch(error => {
        dispatch(addMediaToFirestor_Fail(error))
      });
  }
}

// Update media Status
export const updateMediaStatus_Start = () => {
  return {
    type: actionTypes.UPDATE_STATUS_START
  };
};

export const updateMediaStatus_Success = (response) => {
  return {
    type: actionTypes.UPDATE_STATUS_SUCCESS,
    media: response
  };
};

export const updateMediaStatus_Fail = (error) => {
  return {
    type: actionTypes.UPDATE_STATUS_FAIL,
    error
  };
};

export const updateMediaStatus = (mediaId, watchStatus, name, collections) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(updateMediaStatus_Start());

    // Get firestore
    const firestore = getFirestore();

    // Get iud to be passed for doc creation
    const authorId = getState().firebase.auth.uid;

    // Set customID for future doc manipulations and set it to firestore
    let customID = mediaId.toString();

    // Update/Add to collection
    let mediaIndex = collections.findIndex(media => media.mediaId == mediaId);
    collections[mediaIndex][name] = watchStatus;


    // Set selecte media in firestore
    firestore.collection('users').doc(authorId)
      .collection('mediaCollections').doc(customID).update({
        [name]: watchStatus
      })
      .then(() => {
        dispatch(updateCollections(collections));
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

// Get collection
export const filterByStatus_Start = () => {
  return {
    type: actionTypes.FILTER_BY_STATUS_START
  };
};

export const filterByStatus_Success = (updateCollections, status) => {
  return {
    type: actionTypes.FILTER_BY_STATUS_SUCCESS,
    filterByStatus: updateCollections,
    status: status
  };
};

export const filterByStatus_Fail = (error) => {
  return {
    type: actionTypes.FILTER_BY_STATUS_FAIL,
    error
  };
};

export const filterByStatus = (collections, status) => {
  return (dispatch) => {
    if (collections) {
      dispatch(filterByStatus_Start());
      if (status !== 'all_media') {
        let updateCollections = collections.filter(media => media.watchStatus == status);
        dispatch(filterByStatus_Success(updateCollections, status));
      } else {
        dispatch(filterByStatus_Success(collections, status));
      }
    } else {
      let error = 'no collection here'
      dispatch(filterByStatus_Fail(error));
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

export const deleteMediaFromFirestore = (mediaId, collections, filteredCollections) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(deleteMediaFromFirestore_Start());

    // Get firestore
    const firestore = getFirestore();

    // Get iud to be passed for doc creation
    const authorId = getState().firebase.auth.uid;

    // To String for firebase 
    const deleteMediaId = mediaId.toString();

    // Remove from stored collections
    let updateCollections = collections.filter(media => media.mediaId !== mediaId);

    // Remove from filtered to prevent further issues
    let updateFilteredCollections = filteredCollections.filter(media => media.mediaId !== mediaId);

    // Set selecte media in firestore
    firestore.collection('users').doc(authorId)
      .collection('mediaCollections').doc(deleteMediaId)
      .delete()
      .then(() => {
        dispatch(deleteMediaFromFirestore_Success(updateCollections, updateFilteredCollections));
      })
      .catch(error => {
        dispatch(deleteMediaFromFirestore_Fail(error))
      });
  }
}


const updateCollections = (collections) => {
  return {
    type: actionTypes.UPDATE_COLLECTION,
    collections
  };
}