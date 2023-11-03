import { lazily } from 'react-lazily';
import { RouteGateProps, RouteRoles } from '../../app/routing/definitions';
import { withDataExplorerContext } from './DataExplorerProvider';

const { DataExplorerScreen } = lazily(() => import('./DataExplorerScreen'));

const WithDataExplorerContext = withDataExplorerContext(DataExplorerScreen);

const paths = {
  dataExplorer: '/data-explorer',
  dataExplorerManagement: '/data-explorer/:viewType/:queryId?/:type?/:tableId?',
} as const;

const routeRoles: RouteRoles<typeof paths> = {
  dataExplorer: ['api:datasources:read'],
  dataExplorerManagement: ['api:datasources:create'],
};

const routes: RouteGateProps[] = [
  {
    path: paths.dataExplorer,
    component: WithDataExplorerContext,
    routePermissions: routeRoles.dataExplorer,
    type: 'PROTECTED',
    navMenu: false,
    exact: true,
  },
  {
    path: paths.dataExplorerManagement,
    component: WithDataExplorerContext,
    routePermissions: routeRoles.dataExplorerManagement,
    type: 'PROTECTED',
    navMenu: false,
  },
];

export { paths as dataExplorerPaths };
export { routes as dataExplorerRoutes };
export { routeRoles as dataExplorerRouteRoles };
