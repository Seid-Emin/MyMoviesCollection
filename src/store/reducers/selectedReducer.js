import * as actionTypes from '../actions/actionTypes';


const initialState = {
  loading: false,
  selectedMedia: {},
  selectedMediaType: '',
  showInfo: false
}

export const selsecteMediaType = (state, action) => {
  return {
    ...state,
    selectedMediaType: action.selectedMediaType
  }
}

export const fetchStart = (state, action) => {
  return {
    ...state,
    loading: true
  };
};

export const fetchSelectedSuccess = (state, action) => {
  return {
    ...state,
    selectedMedia: action.selectedMedia,
    loading: false,
    showInfo: true
  };
};

export const fetchFail = (state, action) => {
  return {
    ...state,
    loading: false,
    showInfo: false
  };
};

export const showSelected = (state, action) => {
  return {
    ...state,
    showInfo: action.show
  };
};

export const hideSelected = (state, action) => {
  return {
    ...state,
    showInfo: action.show
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SELECTED_START: return fetchStart(state, action);
    case actionTypes.FETCH_SELECTED_SUCCESS: return fetchSelectedSuccess(state, action);
    case actionTypes.FETCH_SELECTED_FAIL: return fetchFail(state, action);

    case actionTypes.PICK_SELECTED_MEDIA_TYPE: return selsecteMediaType(state, action);

    case actionTypes.SHOW_SELECTED: return showSelected(state, action);
    case actionTypes.HIDE_SELECTED: return hideSelected(state, action);
    default: return state;
  }
}

export default reducer