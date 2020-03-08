import * as actionTypes from './actionTypes'
import axios from 'axios'

import MovieDB from '../../configs/ApiMovies'

export const selectedMediaType = (type) => {
  return {
    type: actionTypes.PICK_SELECTED_MEDIA_TYPE,
    selectedMediaType: type
  };
};

export const fetchStart = () => {
  return {
    type: actionTypes.FETCH_SELECTED_START
  };
};

export const fetchSelectedSuccess = (selectedMediaData) => {
  return {
    type: actionTypes.FETCH_SELECTED_SUCCESS,
    selectedMedia: selectedMediaData
  };
};

export const fetchFail = (error) => {
  return {
    type: actionTypes.FETCH_SELECTED_FAIL,
    error: error
  };
};

export const fetchSelected = (id, mediaType) => {
  return dispatch => {
    dispatch(fetchStart());
    axios.get(`${MovieDB.API_V3}${mediaType}/${id}?api_key=${MovieDB.API_KEY}&append_to_response=videos,credits,images,similar`)
      .then(res => {
        console.log(res);

        dispatch(fetchSelectedSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchFail(err));
      });
  }
}

export const showSelected = () => {
  return {
    type: actionTypes.SHOW_SELECTED,
    show: true
  };
};

export const hideSelected = () => {
  return {
    type: actionTypes.HIDE_SELECTED,
    show: false
  };
};