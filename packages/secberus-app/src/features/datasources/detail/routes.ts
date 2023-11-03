import { lazily } from 'react-lazily';
import { RouteGateProps } from '../../../app/routing/definitions';

const { DatasourceDetailsScreen } = lazily(() => import('./Detail'));

const paths = {
  datasourceManagement: '/datasources',
} as const;

const routes: RouteGateProps[] = [
  {
    path: paths.datasourceManagement,
    component: DatasourceDetailsScreen,
    type: 'PROTECTED',
    exact: true,
  },
];

export { paths as datasourceDetailPaths };
export { routes as datasourceDetailRoutes };
