/* eslint no-param-reassign: 0 */
import produce from 'immer';
import _ from 'lodash';
import { UIActions } from '../actions/ui';

const initialState = () => ({
  isHardLoading: false,
  notifications: [],
  logoutRoute: null,
  screensLoading: {},
});

const reducer = produce((state = initialState(), action) => {
  switch (action.type) {
    case UIActions.UI_SET_IS_HARD_LOADING:
      state.isHardLoading = action.isHardLoading;
      return state;
    case UIActions.RESET_UI:
      state = initialState();
      return state;
    case UIActions.UI_SET_LAYOUT_VISIBILITY:
      state.isLayoutVisible = action.visible;
      return state;
    case UIActions.SET_EXPORT_STATE_KEY:
      state.exportState[action.key] = action.value;
      break;
    case UIActions.SET_SELECTED_ATTRIBUTE:
      _.set(state, action.key, action.data);
      return state;
    case UIActions.RESET_SELECTED_ATTRIBUTE:
      _.set(state, action.key, _.get(initialState(), action.key));
      break;
    default:
      return state;
  }
});

export default reducer;
