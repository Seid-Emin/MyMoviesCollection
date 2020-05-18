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

    firestore.collection('users').doc(authorId).collection('movies').add({
      mediaType,
      mediaId,
      mediaName,
      posterURL,
      created: Date.now()
    }).then((response) => {
      dispatch(addMedia_Success(response))
    }).catch(error => {
      dispatch(addMedia_Fail(error))
    });
  }
}

export const getMoviesCollection = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(addMedia_Start());

    const firestore = getFirestore();
    const authorId = getState();
    console.log(authorId);



    // firestore.collection('users').doc(authorId).collection('movies').get()
    //   .then((response) => {
    //     dispatch(addMedia_Success(response))
    //   }).catch(error => {
    //     dispatch(addMedia_Fail(error))
    //   });
  }
}