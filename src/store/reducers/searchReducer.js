import * as actionTypes from '../actions/actionTypes';


const initialState = {
  searchText: '',
  movies: [],
  loading: false,
  movie: []
}

const searchParam = (state, action) => {
  return {
    ...state,
    searchText: action.searchText,
    loading: false
  }
}

// const fetchSearch = (state, action) => {
//   return {
//     ...state,
//   }
// }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH: return searchParam(state, action);
    default: return state;
  }
}

export default reducer