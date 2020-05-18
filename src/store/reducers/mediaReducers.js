import * as actionTypes from '../actions/actionTypes';


const initialState = {
  media: [],
  loading: false,
  error: null
}

export const addMedia_Start = (state, action) => {
  return {
    ...state,
    loading: true
  };
};

export const addMedia_Success = (state, action) => {
  return {
    ...state,
    media: action.media,
    loading: false,
    error: null,
  };
};

export const addMedia_Fail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_MOVIE_START: return addMedia_Start(state, action);
    case actionTypes.ADD_MOVIE_SUCCESS: return addMedia_Success(state, action);
    case actionTypes.ADD_MOVIE_FAIL: return addMedia_Fail(state, action);

    default: return state;
  }
}

export default reducer