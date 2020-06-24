import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
require('dotenv').config();

var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "mymoviescollection-55974.firebaseapp.com",
  databaseURL: "https://mymoviescollection-55974.firebaseio.com",
  projectId: "mymoviescollection-55974",
  storageBucket: "mymoviescollection-55974.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_API_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;