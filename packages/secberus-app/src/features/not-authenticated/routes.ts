import { lazily } from 'react-lazily';
import { RouteGateProps } from '../../app/routing/definitions';

const { NotAuthenticated } = lazily(() => import('./index'));

const paths = {
  notAuthenticated: '/401',
} as const;

const routes: RouteGateProps[] = [
  {
    path: paths.notAuthenticated,
    component: NotAuthenticated,
    type: 'DEFAULT',
  },
];

export { paths as notAuthenticatedPaths };
export { routes as notAuthenticatedRoutes };
