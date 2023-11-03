import { lazily } from 'react-lazily';
import { RouteGateProps, RouteRoles } from '../../app/routing/definitions';
import { DatasourceDetailsScreen } from './detail/Detail';

const { default: DataSources } = lazily(() => import('./DataSources'));

const paths = {
  datasourceManagement: '/data-sources',
  datasourceDetails: '/data-sources/data-source/details/:datasourceId',
} as const;

const routeRoles: RouteRoles<typeof paths> = {
  datasourceManagement: ['api:datasources:list', 'api:datasources:read'],
  datasourceDetails: ['api:datasources:read'],
};

const routes: RouteGateProps[] = [
  {
    path: paths.datasourceDetails,
    component: DatasourceDetailsScreen,
    routePermissions: routeRoles.datasourceDetails,
  },
  {
    path: paths.datasourceManagement,
    component: DataSources,
    routePermissions: routeRoles.datasourceManagement,
  },
];

export { paths as datasourcePaths };
export { routes as datasourcesRoutes };
export { routeRoles as datasourcesRouteRoles };
