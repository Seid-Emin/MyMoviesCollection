import * as actionTypes from '../actions/actionTypes';


const initialState = {
  loading: false,
  selectedMedia: {},
  selectedId: null,
  selected: false,
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
    selectedId: action.selectedMedia.id,
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

export const setSelected = (state, action) => {
  return {
    ...state,
    selected: !state.selected
  };
};

export const removeSelectedId = (state, action) => {
  return {
    ...state,
    selectedId: null
  };
};

export const showModal = (state, action) => {
  return {
    ...state,
    showInfo: action.show
  };
};

export const hideModal = (state, action) => {
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

    case actionTypes.SET_SELECTED_FOT_SIGNIN: return setSelected(state, action);
    case actionTypes.REMOVE_SELECTED_ID: return removeSelectedId(state, action);

    case actionTypes.PICK_SELECTED_MEDIA_TYPE: return selsecteMediaType(state, action);

    case actionTypes.SHOW_MODAL: return showModal(state, action);
    case actionTypes.HIDE_MODAL: return hideModal(state, action);
    default: return state;
  }
}

export default reducer