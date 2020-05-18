import searchParam from './searchReducer';
import selectedMedia from './selectedReducer';
import filteredMediaReducer from './fetchFilteredMediaReducer';
import authReducer from './authReducer';
import mediaReducer from './mediaReducers';
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
  media: mediaReducer
});

export default rootReducer;