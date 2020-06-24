import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  authError: null
};

// SignIn
const authStart = (state, action) => {
  return {
    ...state,
    loading: true,
    authError: null
  }
}

const authSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    authError: null
  }
}

const authError = (state, action) => {
  return {
    ...state,
    loading: false,
    authError: action.error
  }
}

const signOut = (state, action) => {
  return state
}


// SignUp
const singupStart = (state, action) => {
  return {
    ...state,
    loading: true,
    authError: null
  }
}

const singupSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    authError: null
  }
}

const singupFail = (state, action) => {
  return {
    ...state,
    loading: false,
    authError: action.error
  }
}

const clearError = (state, action) => {
  return {
    ...state,
    authError: null
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START: return authStart(state, action);
    case actionTypes.LOGIN_FAIL: return authError(state, action);
    case actionTypes.LOGIN_SUCCESS: return authSuccess(state, action);

    case actionTypes.LOGOUT_SUCCESS: return signOut(state, action);

    case actionTypes.REGISTER_START: return singupStart(state, action);
    case actionTypes.REGISTER_SUCCESS: return singupSuccess(state, action);
    case actionTypes.REGISTER_FAIL: return singupFail(state, action);

    case actionTypes.CLEAR_AUTH_ERROR: return clearError(state, action);

    default: return state;
  }
}

export default reducer