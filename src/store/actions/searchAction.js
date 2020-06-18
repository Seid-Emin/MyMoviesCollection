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

export const fetchSearchSuccess = (searchResult) => {
  return {
    type: actionTypes.FETCH_SEARCH_SUCCESS,
    searchResult: searchResult.results,
    pagesTotal: searchResult.total_pages,
    totalResults: searchResult.total_results
  };
};

export const fetchFail = (error) => {
  return {
    type: actionTypes.FETCH_SEARCH_FAIL,
    error: error
  };
};

export const fetchMultiSearch = (query) => {
  return dispatch => {
    dispatch(fetchStart());
    axios.get(`${MovieDB.API_MultiSearch}/multi?api_key=${MovieDB.API_KEY}&language=en-US&query=${query}&page=1&include_adult=true`)
      .then(res => {
        console.log(res.data);
        dispatch(fetchSearchSuccess(res.data));
      })
      .catch(error => {
        dispatch(fetchFail(error));
      });
  }
}

export const clearSearchingState = () => {
  return {
    type: actionTypes.CLEAR_SEARCH_STATE,
  }
}