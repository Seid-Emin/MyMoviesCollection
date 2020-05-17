import * as actionTypes from './actionTypes';

export const signIn = ({ email, password }) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase.auth().signInWithEmailAndPassword(
      email,
      password
    )
      .then(() => {
        dispatch({
          type: actionTypes.LOGIN_SUCCESS
        });
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.LOGIN_FAIL,
          error
        });
      });;
  }
}

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase.auth().signOut()
      .then(() => {
        dispatch({
          type: actionTypes.LOGOUT_SUCCESS
        })
      });
  }
}

export const signUp = ({ email, password, firstName, lastName }) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase.auth().createUserWithEmailAndPassword(
      email,
      password
    )
      .then((response) => {
        return firestore.collection('users').doc(response.user.uid).set({
          firstName,
          lastName,
          initials: firstName[0] + lastName[0],
          createdAt: Date.now()
        })
      })
      .then(() => {
        dispatch({
          type: actionTypes.REGISTER_SUCCESS
        });
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.REGISTER_FAIL,
          error
        });
      });
  }
}