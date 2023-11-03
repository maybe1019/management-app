import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { Grid, GridItem } from '@chakra-ui/react';
import { ErrorBoundary } from '../../utils/wrappers/ErrorBoundaries';
import { RoleItem } from '../../app/rbac/roleFilter';
import { RoleRouteGate } from '../../app/rbac/RoleRouteGate.component';
import { userManagementRoutes } from '../user-management/routes';
import { accessPolicyRoutes } from '../access-policies/routes';
import { rolesManagementRoutes } from '../roles-management/routes';
import { RouteGateProps } from '../../app/routing/definitions';
import { injectParentRoute } from '../../app/routing/utils';
import {
  orgManagementPaths,
  orgManagementRoutes,
} from '../organization-management/routes';
import { ssoRoutes } from '../sso/routes';
import { adminPaths } from './routes';
import { AdminSideNavbar } from './components/admin-side-navbar/AdminSideNavbar';
import { AdminArea, NavBarWrapper } from './AdminPanel.styled';

export interface NavItem extends RoleItem {
  to: string;
  title: string;
}

const adminRoutes: RouteGateProps[] = [
  {
    exact: true,
    path: adminPaths.admin,
    render: () => {
      return (
        <Redirect to={adminPaths.admin + orgManagementPaths.orgManagement} />
      );
    },
  },
  ...injectParentRoute(orgManagementRoutes, adminPaths.admin),
  ...injectParentRoute(userManagementRoutes, adminPaths.admin),
  ...injectParentRoute(rolesManagementRoutes, adminPaths.admin),
  ...injectParentRoute(accessPolicyRoutes, adminPaths.admin),
  ...injectParentRoute(ssoRoutes, adminPaths.admin),
];

const AdminPanel: React.FC = () => (
  <AdminArea>
    <NavBarWrapper>
      <AdminSideNavbar />
    </NavBarWrapper>

    <Grid
      h="100%"
      templateRows="repeat(18, 1fr)"
      overflowY="auto"
      position="relative"
    >
      <GridItem rowSpan={18}>
        <Switch>
          {adminRoutes.map(route => {
            const path = route.path as RouteGateProps['path'];
            return (
              <RoleRouteGate key={route.path as any} {...route} path={path} />
            );
          })}
        </Switch>
      </GridItem>
    </Grid>
  </AdminArea>
);

const WithBoundary: React.FC = () => (
  <ErrorBoundary>
    <AdminPanel />
  </ErrorBoundary>
);
export { WithBoundary as AdminPanel };

export default WithBoundary;
