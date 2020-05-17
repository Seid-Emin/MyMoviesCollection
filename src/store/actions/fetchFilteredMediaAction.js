import * as actionTypes from './actionTypes';
import axios from 'axios';

import MovieDB from '../../configs/ApiMovies';

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
    clearSearch: '',
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
        console.log(res);
        dispatch(fetchFilteredMediaSuccess(res.data, mediaType, filterType, page, selected));
      })
      .catch(error => {
        dispatch(fetchFilteredMediaFail(error));
      });
  }
}

export const preloadFilteredMedia = ({ pathMediaType, pathFilterType, pageNum, selected = 0, path }) => {
  return dispatch => {
    dispatch(fetchFilteredMediaStart());
    axios.get(`${MovieDB.API_V3}${path}?api_key=${MovieDB.API_KEY}&language=en-US&${pageNum}`)
      .then(res => {
        console.log(res);
        dispatch(fetchFilteredMediaSuccess(res.data, pathMediaType, pathFilterType, pageNum, selected));
      })
      .catch(error => {
        dispatch(fetchFilteredMediaFail(error));
      });
  }
}