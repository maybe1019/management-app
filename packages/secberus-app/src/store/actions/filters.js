export const FiltersActions = {
  FILTERS_FULL_RESET: 'FILTERS_FULL_RESET',
  FILTERS_PUSH_ATTRIBUTE: 'FILTERS_PUSH_ATTRIBUTE',
  FILTERS_REMOVE_ATTRIBUTE: 'FILTERS_REMOVE_ATTRIBUTE',
  FILTERS_RESET_ATTRIBUTE: 'FILTERS_RESET_ATTRIBUTE',
  FILTERS_SET_ATTRIBUTE: 'FILTERS_SET_ATTRIBUTE',
  FILTERS_MERGE_ATTRIBUTE: 'FILTERS_MERGE_ATTRIBUTE',
};

export const setFiltersAttribute = (key, value) => dispatch =>
  dispatch({ type: FiltersActions.FILTERS_SET_ATTRIBUTE, key, value });

export const mergeFiltersAttribute = (key, value) => dispatch =>
  dispatch({ type: FiltersActions.FILTERS_MERGE_ATTRIBUTE, key, value });

export const resetFiltersAttribute = (key, value) => dispatch =>
  dispatch({ type: FiltersActions.FILTERS_RESET_ATTRIBUTE, key, value });

export const resetFilters = () => dispatch =>
  dispatch({ type: FiltersActions.FILTERS_FULL_RESET });
