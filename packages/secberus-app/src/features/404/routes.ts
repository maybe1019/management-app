import { lazily } from 'react-lazily';
import { RouteGateProps } from '../../app/routing/definitions';

export const { NotFoundScreen } = lazily(() => import('./NotFound'));

const paths = {
  base: '/404',
} as const;

const routes: RouteGateProps[] = [
  {
    path: paths.base,
    component: NotFoundScreen,
    exact: true,
  },
];

export { paths as notFoundPaths };
export { routes as notFoundRoutes };
