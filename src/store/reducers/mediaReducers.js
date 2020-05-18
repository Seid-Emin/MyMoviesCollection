import * as actionTypes from '../actions/actionTypes';


const initialState = {
  media: [],
  loading: false,
  error: null
}

// ADD Media to Watched Collection on Firestore
export const addMediaToWatched_Start = (state, action) => {
  return {
    ...state,
    loading: true
  };
};

export const addMediaToWatched_Success = (state, action) => {
  return {
    ...state,
    media: action.media,
    loading: false,
    error: null,
  };
};

export const addMediaToWatched_Fail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false
  };
};

// ADD Media to WatchList Collection on Firestore
export const addMediaToWatchedList_Start = (state, action) => {
  return {
    ...state,
    loading: true
  };
};

export const addMediaToWatchedList_Success = (state, action) => {
  return {
    ...state,
    media: action.media,
    loading: false,
    error: null,
  };
};

export const addMediaToWatchedList_Fail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false
  };
};

// Get Media From Firestore
export const getMediaCollections_Start = (state, action) => {
  return {
    ...state,
    loading: true
  };
};

export const getMediaCollections_Success = (state, action) => {
  return {
    ...state,
    media: action.media,
    loading: false,
    error: null,
  };
};

export const getMediaCollections_Fail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    // Add to Watched Reducers
    case actionTypes.ADD_TO_WATCHED_START: return addMediaToWatched_Start(state, action);
    case actionTypes.ADD_TO_WATCHED_SUCCESS: return addMediaToWatched_Success(state, action);
    case actionTypes.ADD_TO_WATCHED_FAIL: return addMediaToWatched_Fail(state, action);

    // Add to WatchList Reducers
    case actionTypes.ADD_TO_WATCH_LIST_START: return addMediaToWatchedList_Start(state, action);
    case actionTypes.ADD_TO_WATCH_LIST_SUCCESS: return addMediaToWatchedList_Success(state, action);
    case actionTypes.ADD_TO_WATCH_LIST_FAIL: return addMediaToWatchedList_Fail(state, action);

    // Get Media Reducers
    case actionTypes.GET_MEDIA_COLLECTIONS_START: return getMediaCollections_Start(state, action);
    case actionTypes.GET_MEDIA_COLLECTIONS_SUCCESS: return getMediaCollections_Success(state, action);
    case actionTypes.GET_MEDIA_COLLECTIONS_FAIL: return getMediaCollections_Fail(state, action);
    default: return state;
  }
}

export default reducer