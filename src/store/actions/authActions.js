import * as actionTypes from './actionTypes';

export const signIn = ({ email, password }) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    dispatch({
      type: actionTypes.LOGIN_START
    });

    firebase.auth().signInWithEmailAndPassword(
      email,
      password
    )
      .then((response) => {
        localStorage.setItem('userId', response.user.uid);
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
  localStorage.removeItem('userId');
  localStorage.removeItem('token');
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
    dispatch({
      type: actionTypes.REGISTER_START
    });

    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase.auth().createUserWithEmailAndPassword(
      email,
      password
    )
      .then((response) => {
        localStorage.setItem('userId', response.user.uid);
        firestore.collection('users').doc(response.user.uid).set({
          firstName,
          lastName,
          email,
          initials: firstName[0] + lastName[0],
          createdAt: Date.now()
        });
        console.log(firestore);

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

export const clearError = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CLEAR_AUTH_ERROR
    })
  };
}