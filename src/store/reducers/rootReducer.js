import searchParam from './searchReducer';
//import projectReduces from './projectReduces';
import { combineReducers } from 'redux';
// import { firestoreReducer } from 'redux-firestore';
// import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
  search: searchParam
});

export default rootReducer;