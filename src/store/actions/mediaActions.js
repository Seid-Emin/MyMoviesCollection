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

export const addMediaToFirestoreCollection = (mediaType, mediaId, mediaName, posterURL, watchStatus) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(addMediaToFirestore_Start());

    // Get firestore
    const firestore = getFirestore();

    // Get iud to be passed for doc creation
    const authorId = getState().firebase.auth.uid;

    // Create media info obj, for simple Collections display
    let newMedia = {
      watchStatus,
      mediaType,
      mediaId,
      mediaName,
      posterURL,
      createdAt: Date.now()
    }

    // Set customID for future doc manipulations and set it to firestore
    let customID = mediaId.toString();

    // Set selecte media in firestore
    firestore.collection('users').doc(authorId)
      .collection('mediaCollections').doc(customID).set(newMedia)
      .then((response) => {
        dispatch(addMediaToFirestor_Success(newMedia))
      }).catch(error => {
        dispatch(addMediaToFirestor_Fail(error))
      });
  }
}