import * as actionTypes from '../actions/actionTypes';


const initialState = {
  collections: [],
  filteredCollections: [],
  media: [],
  status: 'All Media',
  type: 'all',
  loading: false,
  error: null
}

// ADD Media to Watched Collection on Firestore
export const addMediaToFirestore_Start = (state, action) => {
  return {
    ...state,
    loading: true
  };
};

export const addMediaToFirestore_Success = (state, action) => {
  return {
    ...state,
    media: action.media,
    loading: false,
    error: null,
  };
};

export const addMediaToFirestore_Fail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false
  };
};

// Update After ADD
export const updateCollections = (state, action) => {
  return {
    ...state,
    collections: action.collections,
    loading: false,
    error: null,
  };
};

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
    filteredCollections: action.collection,
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

// Filter by status Collections on Firestore
export const filterByStatus_Start = (state, action) => {
  return {
    ...state,
    loading: true
  };
};

export const filterByStatus_Success = (state, action) => {
  return {
    ...state,
    filteredCollections: action.filterByStatus,
    loading: false,
    error: null
  };
};

export const filterByStatus_Fail = (state, action) => {
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
    collections: action.updateCollections,
    filteredCollections: action.updateFilteredCollections,
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
    // Add Media Reducers
    case actionTypes.ADD_MEDIA_TO_FIRESTORE_START: return addMediaToFirestore_Start(state, action);
    case actionTypes.ADD_MEDIA_TO_FIRESTORE_SUCCESS: return addMediaToFirestore_Success(state, action);
    case actionTypes.ADD_MEDIA_TO_FIRESTORE_FAIL: return addMediaToFirestore_Fail(state, action);

    // Update after ADD
    case actionTypes.UPDATE_COLLECTION: return updateCollections(state, action);

    // Get Collection
    case actionTypes.GET_MEDIA_COLLECTIONS_START: return getCollectionFromFirestore_Start(state, action);
    case actionTypes.GET_MEDIA_COLLECTIONS_SUCCESS: return getCollectionFromFirestore_Success(state, action);
    case actionTypes.GET_MEDIA_COLLECTIONS_FAIL: return getCollectionFromFirestore_Fail(state, action);

    // Filter By Status Collection
    case actionTypes.FILTER_BY_STATUS_START: return filterByStatus_Start(state, action);
    case actionTypes.FILTER_BY_STATUS_SUCCESS: return filterByStatus_Success(state, action);
    case actionTypes.FILTER_BY_STATUS_FAIL: return filterByStatus_Fail(state, action);

    // Delete Collection
    case actionTypes.DELETE_MEDIA_START: return deleteMediaFromFirestore_Start(state, action);
    case actionTypes.DELETE_MEDIA_SUCCESS: return deleteMediaFromFirestore_Success(state, action);
    case actionTypes.DELETE_MEDIA_FAIL: return deleteMediaFromFirestore_Fail(state, action);

    default: return state;
  }
}

export default reducer