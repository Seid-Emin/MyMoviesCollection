import * as actionTypes from '../actions/actionTypes';


const initialState = {
  mediaType: 'movie',
  filterType: 'now_playing',
  loading: false,
  pagesTotal: '1',
  displayTitle: ''
}

export const fetchFilteredMediaStart = (state, action) => {
  return {
    ...state,
    loading: true
  };
};

export const fetchFilteredMediaSuccess = (state, action) => {
  return {
    ...state,
    filteredMediaResults: action.searchFilteredResult.results,
    mediaType: action.mediaType,
    filterType: action.filterType,
    pagesTotal: action.searchFilteredResult.total_pages,
    displayTitle: (action.filterType + ' ' + action.mediaType).replace('_', ' ').replace('_', ' '),
    loading: false
  };
};

export const fetchFilteredMediaFail = (state, action) => {
  return {
    ...state,
    loading: false
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_FILTERED_RESULTS_START: return fetchFilteredMediaStart(state, action);
    case actionTypes.FETCH_FILTERED_RESULTS_SUCCESS: return fetchFilteredMediaSuccess(state, action);
    case actionTypes.FETCH_FILTERED_RESULTS_FAIL: return fetchFilteredMediaFail(state, action);

    default: return state;
  }
}

export default reducer