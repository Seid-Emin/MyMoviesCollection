import * as actionTypes from '../actions/actionTypes';


const initialState = {
  collections: [],
  filteredCollections: [],
  media: [],
  status: 'all_media',
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
    collections: action.collections,
    filteredCollections: action.filteredCollections,
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

// Update After ADD firestore collection only
export const updateCollections = (state, action) => {
  return {
    ...state,
    collections: action.collections,
    filteredCollections: action.filteredCollections
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
export const filterStatusAndType_Start = (state, action) => {
  return {
    ...state,
    loading: true
  };
};

export const filterStatusAndType_Success = (state, action) => {
  return {
    ...state,
    filteredCollections: action.filterByStatus,
    status: action.status,
    type: action.mediaType,
    loading: false,
    error: null
  };
};

export const filterStatusAndType_Fail = (state, action) => {
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

    // Update after ADD firestore collection only
    case actionTypes.UPDATE_COLLECTION: return updateCollections(state, action);

    // Update after ADD filtered collection in state only
    // case actionTypes.UPDATE_FILTERED_COLLECTION: return updateCollections(state, action);

    // Get Collection
    case actionTypes.GET_MEDIA_COLLECTIONS_START: return getCollectionFromFirestore_Start(state, action);
    case actionTypes.GET_MEDIA_COLLECTIONS_SUCCESS: return getCollectionFromFirestore_Success(state, action);
    case actionTypes.GET_MEDIA_COLLECTIONS_FAIL: return getCollectionFromFirestore_Fail(state, action);

    // Filter By Status and Type Collection
    case actionTypes.FILTER_BY_STATUS_AND_TYPE_START: return filterStatusAndType_Start(state, action);
    case actionTypes.FILTER_BY_STATUS_AND_TYPE_SUCCESS: return filterStatusAndType_Success(state, action);
    case actionTypes.FILTER_BY_STATUS_AND_TYPE_FAIL: return filterStatusAndType_Fail(state, action);

    // Delete Collection
    case actionTypes.DELETE_MEDIA_START: return deleteMediaFromFirestore_Start(state, action);
    case actionTypes.DELETE_MEDIA_SUCCESS: return deleteMediaFromFirestore_Success(state, action);
    case actionTypes.DELETE_MEDIA_FAIL: return deleteMediaFromFirestore_Fail(state, action);

    default: return state;
  }
}

export default reducer