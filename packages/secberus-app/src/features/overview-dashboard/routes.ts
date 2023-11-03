import { lazily } from 'react-lazily';
import { RouteGateProps } from '../../app/routing/definitions';

export const { OverviewDashboard } = lazily(
  () => import('./OverviewDashboard.component')
);

const paths = {
  overviewDashboard: '/overview-dashboard',
} as const;

const routes: RouteGateProps[] = [
  {
    path: paths.overviewDashboard,
    component: OverviewDashboard,
    exact: true,
    type: 'PROTECTED',
  },
];

export { paths as overviewDashboardPaths };
export { routes as overviewDashboardRoutes };
