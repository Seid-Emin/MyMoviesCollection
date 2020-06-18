import searchParam from './searchReducer';
import selectedMedia from './selectedReducer';
import filteredMediaReducer from './fetchFilteredMediaReducer';
import authReducer from './authReducer';
import collectionReducer from './collectionReducer';
import sideMenuReducers from './sideMenuReducers';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
  search: searchParam,
  selectedMedia: selectedMedia,
  filteredMedia: filteredMediaReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  auth: authReducer,
  collections: collectionReducer,
  sideMenu: sideMenuReducers
});

export default rootReducer;