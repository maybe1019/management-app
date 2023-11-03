// TODO @sigkar 1/26/2023 - Remove Saga stuff
export const NavActions = {
  SET_CURRENT_ROUTE: 'SET_CURRENT_ROUTE',
  SET_SELECTED_CONTENT: 'SET_SELECTED_CONTENT',
  RESET_NAV: 'RESET_NAV',
};

export const setCurrentRoute = currentRoute => dispatch =>
  dispatch({ type: NavActions.SET_CURRENT_ROUTE, currentRoute });
