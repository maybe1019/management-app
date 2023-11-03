/* eslint no-param-reassign: 0 */
import produce from 'immer';
import _ from 'lodash';
import { QueryParams } from '../../features/filters';
import { FiltersActions } from '../actions/filters';

export interface InitialFilterState {
  init: boolean;
  active: Partial<QueryParams>;
}

export const initialState: InitialFilterState = {
  init: false,
  active: {},
};

const reducer = produce((state = initialState, action) => {
  switch (action.type) {
    case FiltersActions.FILTERS_SET_ATTRIBUTE:
      _.set(state, action.key, action.value);
      break;
    case FiltersActions.FILTERS_MERGE_ATTRIBUTE:
      _.merge(_.get(state, action.key), action.value);
      break;
    case FiltersActions.FILTERS_RESET_ATTRIBUTE:
      _.set(state, action.key, _.get(initialState, action.key));
      return state;
    case FiltersActions.FILTERS_PUSH_ATTRIBUTE:
      state[action.key].push(action.value);
      break;
    case FiltersActions.FILTERS_FULL_RESET:
      state = initialState;
      break;
    default:
  }
  return state;
});

export default reducer;
