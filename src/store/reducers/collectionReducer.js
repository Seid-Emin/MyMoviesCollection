import * as actionTypes from '../actions/actionTypes';


const initialState = {
  collections: {},
  status: 'all',
  loading: false,
  error: null
}

// Get Collections on Firestore
export const getCollectionFromFirestore_Start = (state, action) => {
  return {
    ...state,
    loading: true
  };
};

export const getCollectionFromFirestore_Success = (state, action) => {
  return {
    ...state,
    collections: action.collection,
    loading: false,
    error: null
  };
};

export const getCollectionFromFirestore_Fail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false
  };
};

// Delete media from Collections on Firestore
export const deleteMediaFromFirestore_Start = (state, action) => {
  return {
    ...state,
    loading: true
  };
};

export const deleteMediaFromFirestore_Success = (state, action) => {
  return {
    ...state,
    collections: action.collection,
    loading: false,
    error: null
  };
};

export const deleteMediaFromFirestore_Fail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    // Get collection
    case actionTypes.GET_MEDIA_COLLECTIONS_START: return getCollectionFromFirestore_Start(state, action);
    case actionTypes.GET_MEDIA_COLLECTIONS_SUCCESS: return getCollectionFromFirestore_Success(state, action);
    case actionTypes.GET_MEDIA_COLLECTIONS_FAIL: return getCollectionFromFirestore_Fail(state, action);

    // Delete collection
    case actionTypes.DELETE_MEDIA_START: return deleteMediaFromFirestore_Start(state, action);
    case actionTypes.DELETE_MEDIA_SUCCESS: return deleteMediaFromFirestore_Success(state, action);
    case actionTypes.DELETE_MEDIA_FAIL: return deleteMediaFromFirestore_Fail(state, action);

    default: return state;
  }
}

export default reducer