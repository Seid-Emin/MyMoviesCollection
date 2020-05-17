import * as actionTypes from '../actions/actionTypes';

const initialState = {
  authError: null
};

const authError = (state, action) => {
  return {
    ...state,
    authError: action.error
  }
}

const authSuccess = (state, action) => {
  return {
    ...state,
    authError: null
  }
}

const signOut = (state, action) => {
  return state
}

const singupSuccess = (state, action) => {
  return {
    ...state,
    authError: null
  }
}
const singupFail = (state, action) => {
  return {
    ...state,
    authError: action.error
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_FAIL: return authError(state, action);
    case actionTypes.LOGIN_SUCCESS: return authSuccess(state, action);
    case actionTypes.LOGOUT_SUCCESS: return signOut(state, action);
    case actionTypes.REGISTER_FAIL: return singupFail(state, action);
    case actionTypes.REGISTER_SUCCESS: return singupSuccess(state, action);

    default: return state;
  }
}

export default reducer