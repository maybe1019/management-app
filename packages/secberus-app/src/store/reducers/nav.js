/* eslint no-param-reassign: 0 */
/* eslint-disable prefer-destructuring */

import produce from 'immer';
import { NavActions } from '../actions/nav';

const initialState = {
  currentRoute: {
    location: {
      pathname: '/login',
      search: '',
    },
    isFirstRendering: true,
    action: '',
  },
  previousRoute: [],
};

const reducer = produce((state = initialState, action) => {
  switch (action.type) {
    case NavActions.SET_CURRENT_ROUTE:
      state.previousRoute.push(state.currentRoute);
      state.currentRoute = {
        ...state.currentRoute,
        ...action.currentRoute,
      };
      if (state.currentRoute.isFirstRendering) {
        state.currentRoute.isFirstRendering = false;
      }
      break;
    case NavActions.RESET_NAV:
      state = initialState;
      break;
    default:
  }
  return state;
});

export default reducer;
