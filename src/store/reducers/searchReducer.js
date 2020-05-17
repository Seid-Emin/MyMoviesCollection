import * as actionTypes from '../actions/actionTypes';


const initialState = {
  searchText: '',
  searchResult: [],
  loading: false,
  showModal: false,
  pagesTotal: '0',
  currentPage: null,
  selected: null,
  totalResults: null,
  mediaType: '',
  filterType: '',
  displayTitle: '',
  error: ''
}

const searchParam = (state, action) => {
  return {
    ...state,
    searchText: action.searchText,
    loading: false
  }
}

export const fetchStart = (state, action) => {
  return {
    ...state,
    loading: true
  };
};

export const fetchSearchSuccess = (state, action) => {
  return {
    ...state,
    searchResult: action.searchResult,
    pagesTotal: action.pagesTotal,
    totalResults: action.totalResults,
    loading: false,
    error: ''
  };
};

export const fetchFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error
  };
};

export const fetchFilteredMediaStart = (state, action) => {
  return {
    ...state,
    loading: true
  };
};

export const fetchFilteredMediaSuccess = (state, action) => {

  return {
    ...state,
    searchResult: action.searchFilteredResult.results,
    currentPage: action.page,
    selected: action.selected,
    loading: false,
    searchText: action.clearSearch,
    mediaType: action.mediaType,
    filterType: action.filterType,
    pagesTotal: action.searchFilteredResult.total_pages,
    displayTitle: (action.filterType + ' ' + action.mediaType).replace('_', ' ').replace('_', ' '),
    error: ''
  };
};

export const fetchFilteredMediaFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH: return searchParam(state, action);
    case actionTypes.FETCH_SEARCH_START: return fetchStart(state, action);
    case actionTypes.FETCH_SEARCH_SUCCESS: return fetchSearchSuccess(state, action);

    case actionTypes.FETCH_FILTERED_RESULTS_START: return fetchFilteredMediaStart(state, action);
    case actionTypes.FETCH_FILTERED_RESULTS_SUCCESS: return fetchFilteredMediaSuccess(state, action);
    case actionTypes.FETCH_FILTERED_RESULTS_FAIL: return fetchFilteredMediaFail(state, action);

    case actionTypes.FETCH_SEARCH_FAIL: return fetchFail(state, action);

    default: return state;
  }
}

export default reducer