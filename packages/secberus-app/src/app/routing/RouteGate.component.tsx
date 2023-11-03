import React from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { selectIsAuthenticated } from '@secberus/services';
import { useTypedSelector } from '../../store/RootStateType';
import AppRedirectUrl from '../../utils/AppRedirectUrl';
import { RoleRouteGate } from '../rbac/RoleRouteGate.component';
import { RouteGateProps, RouteType } from './definitions';
import { RenderRoute } from './RenderRoute.component';
import { DEFAULT_ROUTE_PATH } from './constants';

const ROUTE_TYPES: Record<RouteType, RouteType> = {
  AUTH: 'AUTH',
  DEFAULT: 'DEFAULT',
  PROTECTED: 'PROTECTED',
};

export const RouteGate: React.FC<RouteGateProps> = ({
  path,
  component: Component,
  render,
  exact,
  type,
  navMenu,
  routePermissions,
}) => {
  const location = useLocation();
  const isAuthenticated = useTypedSelector(selectIsAuthenticated);

  const renderFuncOrComponent = (props: any) =>
    Component ? <Component {...props} /> : render && render(props);

  // handle our basic route type redirecting here
  if (type === ROUTE_TYPES.AUTH && isAuthenticated) {
    // attempt to retrieve the redirect url previously set and use it as the destination url
    AppRedirectUrl.exists(destinationUrl => {
      window.location.assign(destinationUrl);
    });
    AppRedirectUrl.remove();
    return (
      <Route
        path={path}
        exact={exact}
        render={() => <Redirect to={DEFAULT_ROUTE_PATH} />}
      />
    );
  }

  if (type === ROUTE_TYPES.PROTECTED && !isAuthenticated) {
    AppRedirectUrl.set(location.pathname);
    return (
      <Route
        path={path}
        exact={exact}
        render={() => <Redirect to={{ pathname: '/auth/entry' }} />}
      />
    );
  }

  if (type !== ROUTE_TYPES.PROTECTED)
    return (
      <Route
        path={path}
        exact={exact}
        render={props => renderFuncOrComponent(props)}
      />
    );

  return (
    <RoleRouteGate
      path={path}
      exact={exact}
      routePermissions={routePermissions}
      render={props => (
        <RenderRoute navMenu={navMenu} type={type}>
          {renderFuncOrComponent(props)}
        </RenderRoute>
      )}
      type={type}
    />
  );
};
