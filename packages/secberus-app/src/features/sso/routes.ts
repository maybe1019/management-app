import { lazily } from 'react-lazily';
import { RouteGateProps, RouteRoles } from '../../app/routing/definitions';

const { SSO } = lazily(() => import('./index'));

const paths = {
  base: '/authentication',
} as const;

const routeRoles: RouteRoles<typeof paths> = {
  base: ['api:sso:list'],
};

const routes: RouteGateProps[] = [
  {
    path: paths.base,
    component: SSO,
    routePermissions: routeRoles.base,
  },
];

export { paths as ssoPaths };
export { routes as ssoRoutes };
export { routeRoles as ssoRouteRoles };
