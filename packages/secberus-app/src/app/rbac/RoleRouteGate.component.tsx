import React from 'react';
import { Route } from 'react-router-dom';
import { RouteGateProps } from '../routing/definitions';
import { useAppDispatch } from '../../store';
import { setVisible } from '../../features/layout/slice/layout';
import { useSelf } from '../core/wrappers/WithFindSelf';
import { AccessDenied, NO_ORGS_DENIED_MESSAGE } from './AccessDenied.component';
import { hasPermissions } from './hasPermissions';
import { Permission } from './definitions';

export const RoleRouteGate: React.FC<RouteGateProps> = ({
  component: Component,
  routePermissions,
  path,
  render,
  exact,
}) => {
  const { permissions } = useSelf() as { permissions: Permission[] };

  const dispatch = useAppDispatch();

  return (
    <Route
      path={path}
      exact={exact}
      render={props => {
        const hasPerms = hasPermissions(permissions, routePermissions);

        if (!hasPerms || !permissions.length) {
          dispatch(setVisible({ key: 'navigation', value: true })); // we want to expose the navbar for branding as well as logout, and support functionality
          return <AccessDenied subtext={NO_ORGS_DENIED_MESSAGE} />;
        }
        if (!hasPerms) return <AccessDenied />;
        if (Component) return <Component {...props} />;
        return <>{render && render(props)}</>;
      }}
    />
  );
};
