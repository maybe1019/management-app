import React from 'react';
import { useDispatch } from 'react-redux';
import { setVisible } from '../../features/layout/slice/layout';
import { RouteType, ROUTE_TYPES } from './definitions';

export const RenderRoute: React.FC<{ navMenu?: boolean; type?: RouteType }> = ({
  children,
  navMenu,
  type = 'DEFAULT',
}) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    // update visibility of navigation on route
    let hasNav = true;
    // use default route type nav states unless navMenu override exists
    if (navMenu !== null && typeof navMenu !== 'undefined') hasNav = navMenu;
    else if (type === ROUTE_TYPES.AUTH) hasNav = false;
    else if (type === ROUTE_TYPES.DEFAULT) hasNav = false;
    else if (type === ROUTE_TYPES.PROTECTED) hasNav = true;

    dispatch(setVisible({ key: 'navigation', value: hasNav }));
  }, [dispatch, navMenu, type]);

  return <>{children}</>;
};
