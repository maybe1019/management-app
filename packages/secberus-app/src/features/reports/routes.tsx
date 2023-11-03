import { lazily } from 'react-lazily';
import { RouteGateProps } from '../../app/routing/definitions';

const { Reports } = lazily(() => import('./Reports.component'));

const paths = {
  base: '/reports',
} as const;

const routes: RouteGateProps[] = [
  {
    path: paths.base,
    component: Reports,
    type: 'PROTECTED',
  },
];

export { paths as reportsPaths };
export { routes as reportsRoutes };
