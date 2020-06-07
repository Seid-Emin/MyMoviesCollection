import * as actionTypes from './actionTypes';

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

// Delete media from collection
export const deleteMediaFromFirestore_Start = () => {
  return {
    type: actionTypes.DELETE_MEDIA_START
  };
};

export const deleteMediaFromFirestore_Success = (response) => {
  return {
    type: actionTypes.DELETE_MEDIA_SUCCESS,
    collection: response
  };
};

export const deleteMediaFromFirestore_Fail = (error) => {
  return {
    type: actionTypes.DELETE_MEDIA_FAIL,
    error
  };
};

export const deleteMediaFromFirestore = (mediaId, collections) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(deleteMediaFromFirestore_Start());

    // Get firestore
    const firestore = getFirestore();

    // Get iud to be passed for doc creation
    const authorId = getState().firebase.auth.uid;

    // To String for firebase 
    const deleteMediaId = mediaId.toString();

    // Remove from stored collections
    let updateCollections = collections.filter(media => media.mediaId !== mediaId)

    // Set selecte media in firestore
    firestore.collection('users').doc(authorId)
      .collection('mediaCollections').doc(deleteMediaId)
      .delete()
      .then(() => {
        dispatch(deleteMediaFromFirestore_Success(updateCollections));
      })
      .catch(error => {
        dispatch(deleteMediaFromFirestore_Fail(error))
      });
  }
}