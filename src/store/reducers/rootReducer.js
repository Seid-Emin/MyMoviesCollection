import searchParam from './searchReducer'
import selectedMedia from './selectedReducer'
//import projectReduces from './projectReduces';
import { combineReducers } from 'redux';
// import { firestoreReducer } from 'redux-firestore';
// import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
  search: searchParam,
  selectedMedia: selectedMedia
});

export default rootReducer;