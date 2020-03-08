import * as actionTypes from './actionTypes'
import axios from 'axios'

import MovieDB from '../../configs/ApiMovies'

export const fetchFilteredMediaStart = () => {
  return {
    type: actionTypes.FETCH_FILTERED_RESULTS_START,
  };
};

export const fetchFilteredMediaSuccess = (searchResult, mediaType, filterType) => {
  return {
    type: actionTypes.FETCH_FILTERED_RESULTS_SUCCESS,
    searchFilteredResult: searchResult,
    mediaType,
    filterType,
    clearSearch: ''
  };
};

export const fetchFilteredMediaFail = (error) => {
  return {
    type: actionTypes.FETCH_FILTERED_RESULTS_FAIL,
    error: error
  };
};

export const fetchFilteredMedia = (mediaType, filterType) => {
  return dispatch => {
    dispatch(fetchFilteredMediaStart());
    axios.get(`${MovieDB.API_V3}${mediaType}/${filterType}?api_key=${MovieDB.API_KEY}&language=en-US&page=1`)
      .then(res => {
        console.log(res);

        dispatch(fetchFilteredMediaSuccess(res.data, mediaType, filterType));
      })
      .catch(err => {
        dispatch(fetchFilteredMediaFail(err));
      });
  }
}