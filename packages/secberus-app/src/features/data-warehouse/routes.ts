import { lazily } from 'react-lazily';
import { RouteGateProps, RouteRoles } from '../../app/routing/definitions';

const { default: DataWarehouse } = lazily(
  () => import('./DataWarehouse.component')
);

const paths = {
  dataWarehouse: '/data-warehouse',
} as const;

const routeRoles: RouteRoles<typeof paths> = {
  dataWarehouse: ['api:datasources:read'],
};

const routes: RouteGateProps[] = [
  {
    path: paths.dataWarehouse,
    component: DataWarehouse,
    routePermissions: routeRoles.dataWarehouse,
    type: 'PROTECTED',
  },
];

export { paths as dataWarehousePaths };
export { routes as dataWarehouseRoutes };
export { routeRoles as dataWarehouseRouteRoles };
