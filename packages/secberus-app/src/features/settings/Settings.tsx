import React from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import { Switch, Redirect } from 'react-router-dom';
import { ErrorBoundary } from '../../utils/wrappers/ErrorBoundaries';
import { RoleItem } from '../../app/rbac/roleFilter';
import { orgPrefix } from '../../app/routing/paths';
import { RoleRouteGate } from '../../app/rbac/RoleRouteGate.component';
import { RouteGateProps } from '../../app/routing/definitions';
import { datasourcesRoutes } from '../datasources/routes';
import { integrationsRoutes } from '../integrations/routes';
import { injectParentRoute } from '../../app/routing/utils';
import { orgMemberRoutes } from './Members/routes';

export interface NavItem extends RoleItem {
  to: string;
  title: string;
}

const defaultRoute: RouteGateProps[] = [
  {
    path: '/settings',
    exact: true,
    render: () => {
      return <Redirect to="/settings/data-sources" />;
    },
  },
];

export const settingsRoutes = injectParentRoute(
  [
    ...integrationsRoutes,
    ...datasourcesRoutes,
    ...orgMemberRoutes,
    ...defaultRoute,
  ],
  '/settings'
);

const Settings: React.FC = () => (
  <Grid h="100%" templateRows="repeat(18, 1fr)" overflowY="auto">
    <GridItem rowSpan={18}>
      <Switch>
        {settingsRoutes.map(route => {
          const path = (orgPrefix + route.path) as RouteGateProps['path'];
          return (
            <RoleRouteGate key={route.path as any} {...route} path={path} />
          );
        })}
      </Switch>
    </GridItem>
  </Grid>
);

const WithBoundary: React.FC = () => (
  <ErrorBoundary>
    <Settings />
  </ErrorBoundary>
);
export { WithBoundary as SettingsScreen };

export default WithBoundary;
