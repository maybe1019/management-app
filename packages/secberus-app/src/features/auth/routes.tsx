import { lazily } from 'react-lazily';
import { Redirect } from 'react-router';
import { RouteGateProps } from '../../app/routing/definitions';
import { authPaths } from './paths';

const { AuthFormComponent } = lazily(() => import('./index'));

const routes: RouteGateProps[] = [
  {
    path: authPaths.base,
    component: AuthFormComponent,
    type: 'AUTH',
  },
  {
    path: authPaths.base,
    exact: true,
    render: () => <Redirect to="/auth/entry" />,
    type: 'AUTH',
  },
];

export { routes as authRoutes };
