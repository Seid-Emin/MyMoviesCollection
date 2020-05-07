import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
  apiKey: "AIzaSyDUPNLWatTU_ZJsHBr5WI6WK6ermxLLLck",
  authDomain: "mymoviescollection-55974.firebaseapp.com",
  databaseURL: "https://mymoviescollection-55974.firebaseio.com",
  projectId: "mymoviescollection-55974",
  storageBucket: "mymoviescollection-55974.appspot.com",
  messagingSenderId: "888628846074",
  appId: "1:888628846074:web:e775f0d40761ca17049843",
  measurementId: "G-JBPDE25NYJ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;