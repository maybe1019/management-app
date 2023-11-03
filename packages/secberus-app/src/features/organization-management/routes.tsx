import { lazily } from 'react-lazily';
import type { RouteGateProps, RouteRoles } from '../../app/routing/definitions';
import { Organizations } from './screen/Organizations.component';
const { OrgUsers } = lazily(() => import('./list'));

const paths = {
  orgManagement: '/organizations',
  editOrg: '/organizations/edit/:orgId',
} as const;

const routeRoles: RouteRoles<typeof paths> = {
  orgManagement: ['api:orgs:list', 'api:orgs:read'],
  editOrg: ['api:orgs:read', 'api:orgs:update'],
};

const routes: RouteGateProps[] = [
  {
    path: paths.editOrg,
    component: OrgUsers,
    routePermissions: routeRoles.editOrg,
  },
  {
    path: paths.orgManagement,
    component: Organizations,
    routePermissions: routeRoles.orgManagement,
  },
];

export { paths as orgManagementPaths };
export { routes as orgManagementRoutes };
export { routeRoles as orgManagementRouteRoles };
