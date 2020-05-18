import * as actionTypes from './actionTypes';

export const addMediaWatched_Start = () => {
  return {
    type: actionTypes.ADD_TO_WATCHED_START
  };
};

export const addMediaWatched_Success = (response) => {
  return {
    type: actionTypes.ADD_TO_WATCHED_SUCCESS,
    media: response
  };
};

export const addMediaWatched_Fail = (error) => {
  return {
    type: actionTypes.ADD_TO_WATCHED_FAIL
  };
};

export const addMediaToWatched = (mediaType, mediaId, mediaName, posterURL) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(addMediaWatched_Start());
    const firestore = getFirestore();
    const authorId = getState().firebase.auth.uid;
    console.log(firestore);

    let newMedia = {
      mediaType,
      mediaId,
      mediaName,
      posterURL,
      createdAt: Date.now()
    }

    firestore.collection('users').doc(authorId)
      .collection('watched').doc('watched')
      .collection(mediaType + 's').add(newMedia)
      .then((response) => {
        dispatch(addMediaWatched_Success(newMedia))
      }).catch(error => {
        dispatch(addMediaWatched_Fail(error))
      });
  }
}

export const addMediaWatchList_Start = () => {
  return {
    type: actionTypes.ADD_TO_WATCH_LIST_START
  };
};

export const addMediaWatchList_Success = (response) => {
  return {
    type: actionTypes.ADD_TO_WATCH_LIST_SUCCESS,
    media: response
  };
};

export const addMediaWatchList_Fail = (error) => {
  return {
    type: actionTypes.ADD_TO_WATCH_LIST_FAIL
  };
};

export const addMediaToWatchList = (mediaType, mediaId, mediaName, posterURL) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(addMediaWatchList_Start());
    const firestore = getFirestore();
    const authorId = getState().firebase.auth.uid;
    console.log(firestore);

    let newMedia = {
      mediaType,
      mediaId,
      mediaName,
      posterURL,
      createdAt: Date.now()
    }

    firestore.collection('users').doc(authorId)
      .collection('watchList').doc('watchList')
      .collection(mediaType + 's').add(newMedia)
      .then((response) => {
        dispatch(addMediaWatchList_Success(newMedia))
      }).catch(error => {
        dispatch(addMediaWatchList_Fail(error))
      });
  }
}

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

    const firestore = getFirestore();
    const authorId = localStorage.getItem('userId');
    console.log(authorId);

    firestore.collection('users').doc(authorId).collection(mediaType).get()
      .then((response) => {
        dispatch(getMediaCollections_Success(response))
      }).catch(error => {
        dispatch(getMediaCollections_Fail(error))
      });
  }
}