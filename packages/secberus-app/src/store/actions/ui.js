export const UIActions = {
  UI_SET_IS_HARD_LOADING: 'UI_SET_IS_HARD_LOADING',
  UI_REMOVE_NOTIFICATION: 'UI_REMOVE_NOTIFICATION',
  UI_ADD_NOTIFICATION: 'UI_ADD_NOTIFICATION',
  SET_AGGREGATE_INITIALIZED: 'SET_AGGREGATE_INITIALIZED',
  SET_AGGREGATE_REQUESTED: 'SET_AGGREGATE_REQUESTED',
  SET_LOGOUT_ROUTE: 'SET_LOGOUT_ROUTE',
  RESET_AGGREGATE_INITIALIZED: 'RESET_AGGREGATE_INITIALIZED',
  SET_SELECTED_ATTRIBUTE: 'SET_SELECTED_ATTRIBUTE_UI',
  MERGE_SELECTED_ATTRIBUTE: 'MERGE_SELECTED_ATTRIBUTE_UI',
  RESET_SELECTED_ATTRIBUTE: 'RESET_SELECTED_ATTRIBUTE_UI',
};

export const setUIAttribute = (key, data) => dispatch =>
  dispatch({ type: UIActions.SET_SELECTED_ATTRIBUTE, key, data });

export const mergeUIAttribute = (key, data) => dispatch =>
  dispatch({ type: UIActions.MERGE_SELECTED_ATTRIBUTE, key, data });

export const resetUIAttribute = key => dispatch =>
  dispatch({ type: UIActions.RESET_SELECTED_ATTRIBUTE, key });

export const setAggregateInitialized = key => dispatch =>
  dispatch({ type: UIActions.SET_AGGREGATE_INITIALIZED, key });

export const setAggregateRequested = key => dispatch =>
  dispatch({ type: UIActions.SET_AGGREGATE_REQUESTED, key });

export const resetAggregatesStatus = () => dispatch =>
  dispatch({ type: UIActions.RESET_AGGREGATE_INITIALIZED });

export const setHardLoading =
  (isHardLoading = false) =>
  dispatch => {
    dispatch({ type: UIActions.UI_SET_IS_HARD_LOADING, isHardLoading });
  };

export const resetUis = () => dispatch =>
  dispatch({ type: UIActions.RESET_UI });
