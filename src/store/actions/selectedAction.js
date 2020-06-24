import * as actionTypes from './actionTypes'
import axios from 'axios'

import MovieDB from '../../configs/ApiMovies'

export const selectedMediaType = (mediaType) => {
  return {
    type: actionTypes.PICK_SELECTED_MEDIA_TYPE,
    selectedMediaType: mediaType
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
    axios.get(`${MovieDB.API_V3}/${mediaType}/${id}?api_key=${MovieDB.API_KEY}&append_to_response=videos,credits,images,similar`)
      .then(res => {
        dispatch(fetchSelectedSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchFail(err));
      });
  }
}

export const setSelected = () => {
  return {
    type: actionTypes.SET_SELECTED_FOT_SIGNIN,
  };
};

export const removeSelectedId = () => {
  return {
    type: actionTypes.REMOVE_SELECTED_ID,
  };
};

export const clearSelectedMedia = () => {
  return {
    type: actionTypes.CLEAR_SELECTED_MEDIA,
  };
};

export const preloadSelected = (pathname) => {
  return dispatch => {
    dispatch(fetchStart());
    axios.get(`${MovieDB.API_V3}${pathname}?api_key=${MovieDB.API_KEY}&append_to_response=videos,credits,images,similar`)
      .then(res => {
        dispatch(fetchSelectedSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchFail(err));
      });
  }
}

export const showModal = () => {
  return {
    type: actionTypes.SHOW_MODAL,
    show: true
  };
};

export const hideModal = () => {
  return {
    type: actionTypes.HIDE_MODAL,
    show: false
  };
};