import { lazily } from 'react-lazily';
import { Redirect } from 'react-router';
import { RouteGateProps } from '../../../../app/routing/definitions';
import { policyDetailsPath } from '../../../../app/routing/paths';

const { PolicyDetailsScreen } = lazily(() => import('./Details'));

const paths = {
  base: policyDetailsPath + '/:view?',
} as const;

const routes: RouteGateProps[] = [
  {
    type: 'PROTECTED',
    exact: true,
    path: policyDetailsPath,
    render: ({ match }) => <Redirect to={`${match.params.id}/violations`} />,
  },
  {
    path: paths.base as any,
    component: PolicyDetailsScreen,
    type: 'PROTECTED',
  },
];

export { paths as policyDetailsPaths };
export { routes as policyDetailsRoutes };
