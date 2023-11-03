import { lazily } from 'react-lazily';
import type { RouteGateProps, RouteRoles } from '../../app/routing/definitions';

const { ActivityLog } = lazily(() => import('./ActivityLog.component'));

const paths = {
  logs: '/logs',
} as const;

const routeRoles: RouteRoles<typeof paths> = {
  logs: ['api:orgs:list', 'api:orgs:read'],
};

const routes: RouteGateProps[] = [
  {
    path: paths.logs,
    component: ActivityLog,
    routePermissions: routeRoles.logs,
    type: 'PROTECTED',
  },
];

export { paths as logPaths };
export { routes as logRoutes };
export { routeRoles as logRouteRoles };
