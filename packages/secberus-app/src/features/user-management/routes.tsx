import { lazily } from 'react-lazily';
import { RouteGateProps, RouteRoles } from '../../app/routing/definitions';
import { EditUserScreen } from './EditUser';

const { UserManagement } = lazily(() => import('./index'));

const paths = {
  base: '/users',
  editUser: '/users/edit/:userId',
} as const;

const permissions: RouteRoles<typeof paths> = {
  base: ['api:users:list'],
  editUser: ['api:users:read', 'api:access-policies:update'],
};

const routes: RouteGateProps[] = [
  {
    path: paths.editUser,
    component: EditUserScreen,
    routePermissions: permissions.editUser,
  },
  {
    path: paths.base,
    component: UserManagement,
    exact: true,
    routePermissions: permissions.base,
  },
];

export { paths as userManagementPaths };
export { routes as userManagementRoutes };
export { permissions as userManagementRouteRoles };
