import { lazily } from 'react-lazily';
import { RouteGateProps } from '../../../app/routing/definitions';
import { categoryDetailsPath } from '../../../app/routing/paths';

const { CategoryDetailsScreen } = lazily(() => import('./Detail'));

const paths = {
  base: categoryDetailsPath,
} as const;

const routes: RouteGateProps[] = [
  {
    path: paths.base,
    component: CategoryDetailsScreen,
    type: 'PROTECTED',
    exact: true,
  },
];

export { paths as categoryDetailPaths };
export { routes as categoryDetailRoutes };
