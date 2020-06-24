import * as actionTypes from '../actions/actionTypes';


const initialState = {
  searchText: '',
  searchResult: [],
  searching: false,
  loading: false,
  viewing: false,
  showModal: false,
  pagesTotal: '0',
  currentPage: 1,
  selected: null,
  totalResults: null,
  mediaType: 'movie',
  filterType: 'now_playing',
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
    searching: true,
    pagesTotal: action.pagesTotal,
    currentPage: action.page,
    selected: action.selected,
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

export const clearSearchingState = (state, action) => {
  return {
    ...state,
    searching: false
  }
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
    searchResult: action.searchFilteredResult.results,
    currentPage: action.page,
    selected: action.selected,
    loading: false,
    searching: false,
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


export const currentlyViewing = (state, action) => {
  return {
    ...state,
    viewing: !state.viewing
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH: return searchParam(state, action);
    case actionTypes.FETCH_SEARCH_START: return fetchStart(state, action);
    case actionTypes.FETCH_SEARCH_SUCCESS: return fetchSearchSuccess(state, action);
    case actionTypes.FETCH_SEARCH_FAIL: return fetchFail(state, action);

    case actionTypes.CLEAR_SEARCH_STATE: return clearSearchingState(state, action);

    case actionTypes.FETCH_FILTERED_RESULTS_START: return fetchFilteredMediaStart(state, action);
    case actionTypes.FETCH_FILTERED_RESULTS_SUCCESS: return fetchFilteredMediaSuccess(state, action);
    case actionTypes.FETCH_FILTERED_RESULTS_FAIL: return fetchFilteredMediaFail(state, action);

    case actionTypes.CURRENTLY_VIEWING: return currentlyViewing(state, action);



    default: return state;
  }
}

export default reducer