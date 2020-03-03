import * as actionTypes from './actionTypes'
import axios from 'axios'

import MovieDB from '../../configs/ApiMovies'

export const search = searchText => {
  return {
    type: actionTypes.SEARCH,
    searchText: searchText
  };
};

export const fetchSearch = (query) => {
  return dispatch => {
    axios.get(`${MovieDB.API_Search}movie?api_key=${MovieDB.API_KEY}&language=en-US&query=${query}&page=1&include_adult=true`)
      .then(res => {
        console.log(res);

      })
      .catch(err => {
        console.log(err);

      });
  }
}