import searchParam from './searchReducer';
import selectedMedia from './selectedReducer';
import filteredMediaReducer from './fetchFilteredMediaReducer';
import authReducer from './authReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
  search: searchParam,
  selectedMedia: selectedMedia,
  filteredMedia: filteredMediaReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  auth: authReducer
});

export default rootReducer;