import * as actionTypes from '../actions/actionTypes';


const initialState = {
  media: [],
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

const reducer = (state = initialState, action) => {
  switch (action.type) {

    // Add Media Reducers
    case actionTypes.ADD_MEDIA_TO_FIRESTORE_START: return addMediaToFirestore_Start(state, action);
    case actionTypes.ADD_MEDIA_TO_FIRESTORE_SUCCESS: return addMediaToFirestore_Success(state, action);
    case actionTypes.ADD_MEDIA_TO_FIRESTORE_FAIL: return addMediaToFirestore_Fail(state, action);

    default: return state;
  }
}

export default reducer