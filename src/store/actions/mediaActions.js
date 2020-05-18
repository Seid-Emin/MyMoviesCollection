import * as actionTypes from './actionTypes';

export const addMedia_Start = () => {
  return {
    type: actionTypes.ADD_MOVIE_START
  };
};

export const addMedia_Success = (response) => {
  return {
    type: actionTypes.ADD_MOVIE_SUCCESS,
    media: response
  };
};

export const addMedia_Fail = (error) => {
  return {
    type: actionTypes.ADD_MOVIE_FAIL
  };
};

export const addMedia = (mediaType, mediaId, mediaName, posterURL) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(addMedia_Start());
    const firestore = getFirestore();
    const authorId = getState().firebase.auth.uid;
    console.log(authorId);

    let newMedia = {
      mediaType,
      mediaId,
      mediaName,
      posterURL,
      created: Date.now()
    }

    firestore.collection('users').doc(authorId).collection(mediaType).add(newMedia).then((response) => {
      dispatch(addMedia_Success(newMedia))
    }).catch(error => {
      dispatch(addMedia_Fail(error))
    });
  }
}

export const getMoviesCollection = (mediaType) => {

  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(addMedia_Start());

    const firestore = getFirestore();
    const authorId = localStorage.getItem('userId');
    console.log(authorId);

    firestore.collection('users').doc(authorId).collection(mediaType).get()
      .then((response) => {
        dispatch(addMedia_Success(response))
      }).catch(error => {
        dispatch(addMedia_Fail(error))
      });
  }
}