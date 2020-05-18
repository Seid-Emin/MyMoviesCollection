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
      .collection(watchStatus).doc(watchStatus)
      .collection(mediaType + 's').doc(customID).set(newMedia)
      .then((response) => {
        dispatch(addMediaToFirestor_Success(newMedia))
      }).catch(error => {
        dispatch(addMediaToFirestor_Fail(error))
      });
  }
}

// export const addMediaWatchList_Start = () => {
//   return {
//     type: actionTypes.ADD_TO_WATCH_LIST_START
//   };
// };

// export const addMediaWatchList_Success = (response) => {
//   return {
//     type: actionTypes.ADD_TO_WATCH_LIST_SUCCESS,
//     media: response
//   };
// };

// export const addMediaWatchList_Fail = (error) => {
//   return {
//     type: actionTypes.ADD_TO_WATCH_LIST_FAIL
//   };
// };

// export const addMediaToWatchList = (mediaType, mediaId, mediaName, posterURL) => {
//   return (dispatch, getState, { getFirebase, getFirestore }) => {
//     dispatch(addMediaWatchList_Start());
//     const firestore = getFirestore();
//     const authorId = getState().firebase.auth.uid;
//     console.log(firestore);

//     let newMedia = {
//       mediaType,
//       mediaId,
//       mediaName,
//       posterURL,
//       createdAt: Date.now()
//     }

//     // Set customID for future doc manipulations
//     let customID = mediaId.toString();

//     firestore.collection('users').doc(authorId)
//       .collection('watchList').doc('watchList')
//       .collection(mediaType + 's').doc(customID).set(newMedia)
//       .then((response) => {
//         dispatch(addMediaWatchList_Success(newMedia))
//       }).catch(error => {
//         dispatch(addMediaWatchList_Fail(error))
//       });
//   }
// }


// TO REMOVE
// FIRESTORE IS CONNECTED WITH firestoreConnect and this is not need
export const getMediaCollections_Start = () => {
  return {
    type: actionTypes.GET_MEDIA_COLLECTIONS_START
  };
};

export const getMediaCollections_Success = (response) => {
  return {
    type: actionTypes.GET_MEDIA_COLLECTIONS_SUCCESS,
    media: response
  };
};

export const getMediaCollections_Fail = (error) => {
  return {
    type: actionTypes.GET_MEDIA_COLLECTIONS_FAIL
  };
};

export const getMoviesCollection = (mediaType) => {

  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(getMediaCollections_Start());

    // Get firestore
    const firestore = getFirestore();

    // Get uid from localStorage
    const authorId = localStorage.getItem('userId');

    // Get movies collection
    firestore.collection('users').doc(authorId).collection(mediaType).get()
      .then((response) => {
        dispatch(getMediaCollections_Success(response))
      }).catch(error => {
        dispatch(getMediaCollections_Fail(error))
      });
  }
}