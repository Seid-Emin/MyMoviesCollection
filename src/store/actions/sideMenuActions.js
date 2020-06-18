import * as actionTypes from './actionTypes'

export const toggleSideMenu = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.TOGGLE_SIDE_MENU
    });
  };
};

