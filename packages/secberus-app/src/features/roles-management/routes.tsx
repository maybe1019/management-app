import { lazily } from 'react-lazily';
import { RouteGateProps, RouteRoles } from '../../app/routing/definitions';

const { RolesManagement } = lazily(() => import('./index'));

const paths = {
  rolesManagement: '/roles',
  editRoleManagement: '/roles/form/edit/:roleId',
} as const;

const routeRoles: RouteRoles<typeof paths> = {
  rolesManagement: ['api:roles:list', 'api:roles:read'],
  editRoleManagement: ['api:roles:read', 'api:roles:update'],
};

const routes: RouteGateProps[] = [
  {
    path: paths.rolesManagement,
    component: RolesManagement,
    routePermissions: routeRoles.editRoleManagement,
    type: 'PROTECTED',
    navMenu: false,
  },
  {
    path: paths.editRoleManagement,
    component: RolesManagement,
    routePermissions: routeRoles.editRoleManagement,
    type: 'PROTECTED',
    navMenu: false,
  },
];

export { paths as rolesManagementPaths };
export { routes as rolesManagementRoutes };
export { routeRoles as rolesManagementRouteRoles };
