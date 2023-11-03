import { lazily } from 'react-lazily';
import { RouteGateProps } from '../../app/routing/definitions';

const { AdminPanel } = lazily(() => import('./AdminPanel'));

const paths = {
  admin: '/admin',
} as const;

const routes: RouteGateProps[] = [
  {
    path: paths.admin,
    component: AdminPanel,
    type: 'PROTECTED',
    navMenu: false,
  },
];

export { paths as adminPaths, routes as adminRoutes };
