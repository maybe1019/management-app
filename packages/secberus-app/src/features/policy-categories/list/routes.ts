import { lazily } from 'react-lazily';
import { RouteGateProps, RouteRoles } from '../../../app/routing/definitions';
export const { Categories } = lazily(() => import('./Category.component'));

const paths = {
  base: `/categories`,
} as const;

export const categoryRouteRoles: RouteRoles<typeof paths> = {
  base: ['api:categories:list'],
};
const routes: RouteGateProps[] = [
  {
    path: paths.base,
    component: Categories,
    exact: true,
    type: 'PROTECTED',
    routePermissions: categoryRouteRoles.base,
  },
];

export { paths as categoryPaths };
export { routes as categoryRoutes };
