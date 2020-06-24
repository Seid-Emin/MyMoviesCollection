import * as actionTypes from './actionTypes'
import axios from 'axios'

import MovieDB from '../../configs/ApiMovies'

export const search = searchText => {
  return {
    type: actionTypes.SEARCH,
    searchText: searchText
  };
};

export const fetchStart = () => {
  return {
    type: actionTypes.FETCH_SEARCH_START
  };
};

export const fetchSearchSuccess = (searchResult, selected) => {
  return {
    type: actionTypes.FETCH_SEARCH_SUCCESS,
    searchResult: searchResult.results,
    pagesTotal: searchResult.total_pages,
    selected: selected,
    page: searchResult.page,
    totalResults: searchResult.total_results
  };
};

export const fetchFail = (error) => {
  return {
    type: actionTypes.FETCH_SEARCH_FAIL,
    error: error
  };
};

export const fetchMultiSearch = (query, pageNumber = 1, selectedPage = 0) => {
  return dispatch => {
    dispatch(fetchStart());
    axios.get(`${MovieDB.API_MultiSearch}/multi?api_key=${MovieDB.API_KEY}&language=en-US&query=${query}&page=${pageNumber}&include_adult=true`)
      .then(res => {
        dispatch(fetchSearchSuccess(res.data, selectedPage));
      })
      .catch(error => {
        dispatch(fetchFail(error));
      });
  }
}


// Fetch Filtered Media actions
export const fetchFilteredMediaStart = () => {
  return {
    type: actionTypes.FETCH_FILTERED_RESULTS_START,
  };
};

export const fetchFilteredMediaSuccess = (searchResult, mediaType, filterType, page, selected) => {
  return {
    type: actionTypes.FETCH_FILTERED_RESULTS_SUCCESS,
    searchFilteredResult: searchResult,
    mediaType,
    filterType,
    page,
    selected
  };
};

export const fetchFilteredMediaFail = (error) => {
  return {
    type: actionTypes.FETCH_FILTERED_RESULTS_FAIL,
    error: error
  };
};

export const fetchFilteredMedia = (mediaType, filterType, page = 1, selected = 0) => {
  return dispatch => {
    dispatch(fetchFilteredMediaStart());
    axios.get(`${MovieDB.API_V3}/${mediaType}/${filterType}?api_key=${MovieDB.API_KEY}&language=en-US&page=${page}`)
      .then(res => {
        dispatch(fetchFilteredMediaSuccess(res.data, mediaType, filterType, page, selected));
      })
      .catch(error => {
        dispatch(fetchFilteredMediaFail(error));
      });
  }
}

export const preloadFilteredMedia = (pathMediaType, pathFilterType, pageNum, selected = 0, path) => {
  return dispatch => {
    dispatch(fetchFilteredMediaStart());
    axios.get(`${MovieDB.API_V3}${path}?api_key=${MovieDB.API_KEY}&language=en-US&${pageNum}`)
      .then(res => {
        dispatch(fetchFilteredMediaSuccess(res.data, pathMediaType, pathFilterType, pageNum, selected));
      })
      .catch(error => {
        dispatch(fetchFilteredMediaFail(error));
      });
  }
}

export const clearSearchingState = () => {
  return {
    type: actionTypes.CLEAR_SEARCH_STATE,
  }
}