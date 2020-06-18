import * as actionTypes from '../actions/actionTypes';


const initialState = {
  showMenu: false
}

export const toggleSideMenu = (state, action) => {
  return {
    ...state,
    showMenu: !state.showMenu
  }
}



const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_SIDE_MENU: return toggleSideMenu(state, action);
    default: return state;
  }
}

export default reducer