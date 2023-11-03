import { lazily } from 'react-lazily';
import type { RouteGateProps, RouteRoles } from '../../app/routing/definitions';

export const { Frameworks } = lazily(() => import('./Frameworks.component'));

const paths = {
  frameworks: '/frameworks',
} as const;

const routeRoles: RouteRoles<typeof paths> = {
  frameworks: [
    'api:compliance-frameworks:list',
    'api:compliance-frameworks:read',
    'api:compliance-frameworks:update',
  ],
};

const routes: RouteGateProps[] = [
  {
    path: paths.frameworks,
    component: Frameworks,
    routePermissions: routeRoles.frameworks,
    exact: true,
    type: 'PROTECTED',
  },
];

export { paths as frameworkPaths };
export { routes as frameworkRoutes };
export { routeRoles as frameworkRouteRoles };
