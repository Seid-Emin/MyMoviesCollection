import * as actionTypes from '../actions/actionTypes';


const initialState = {
  searchText: '',
  searchResult: [],
  loading: false,
  showModal: false,
  pagesTotal: '1',
  totalResults: null
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
    loading: false
  };
};

export const fetchFail = (state, action) => {
  return {
    ...state,
    loading: false
  };
};

export const fetchFilteredMediaSuccess = (state, action) => {
  return {
    ...state,
    searchResult: action.searchFilteredResult.results,
    loading: false,
    searchText: action.clearSearch
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH: return searchParam(state, action);
    case actionTypes.FETCH_SEARCH_START: return fetchStart(state, action);
    case actionTypes.FETCH_SEARCH_SUCCESS: return fetchSearchSuccess(state, action);
    case actionTypes.FETCH_FILTERED_RESULTS_SUCCESS: return fetchFilteredMediaSuccess(state, action);
    case actionTypes.FETCH_SEARCH_FAIL: return fetchFail(state, action);

    default: return state;
  }
}

export default reducer