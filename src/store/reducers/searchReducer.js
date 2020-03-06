import * as actionTypes from '../actions/actionTypes';


const initialState = {
  searchText: '',
  searchResult: [{
    original_name: "Batman",
    id: 2287,
    media_type: "tv",
    name: "Batman",
    popularity: 22.552,
    vote_count: 146,
    vote_average: 7.1,
    first_air_date: "1966-01-12",
    poster_path: "/1ZEJuuDh0Zpi5ELM3Zev0GBhQ3R.jpg",
    genre_ids: [
      10759,
      10765,
      35
    ],
    original_language: "en",
    backdrop_path: "/oQKyPlXeYeECOBD5VBWsXY33sgS.jpg",
    overview: "Wealthy entrepreneur Bruce Wayne and his ward"
  },
  {
    poster_path: "/dr6x4GyyegBWtinPBzipY02J2lV.jpg",
    popularity: 29.434,
    vote_count: 13650,
    video: false,
    media_type: "movie",
    id: 272,
    adult: false,
    backdrop_path: "/9myrRcegWGGp24mpVfkD4zhUfhi.jpg",
    original_language: "en",
    original_title: "Batman Begins",
    genre_ids: [
      28,
      80,
      18
    ],
    title: "Batman Begins",
    vote_average: 7.6,
    overview: "Driven by tragedy, billionaire Bruce Wayne dedicates his life to uncovering and defeating the corruption that plagues his home, Gotham City.  Unable to work within the system, he instead creates a new identity, a symbol of fear for the criminal underworld - The Batman.",
    release_date: "2005-06-10"
  }],
  loading: false,
  showModal: false
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
    loading: false
  };
};

export const fetchFail = (state, action) => {
  return {
    ...state,
    loading: false
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH: return searchParam(state, action);
    case actionTypes.FETCH_SEARCH_START: return fetchStart(state, action);
    case actionTypes.FETCH_SEARCH_SUCCESS: return fetchSearchSuccess(state, action);
    case actionTypes.FETCH_SEARCH_FAIL: return fetchFail(state, action);

    default: return state;
  }
}

export default reducer