import { lazily } from 'react-lazily';
import { Redirect } from 'react-router-dom';
import { RouteRoles } from '../../app/routing/definitions';
import { RouteGateProps } from '../../app/routing/definitions';

const { AccessPoliciesList } = lazily(() => import('./list'));
const { AccessPolicy } = lazily(() => import('./details'));
const { AccessPolicyForm } = lazily(() => import('./form'));

const paths = {
  base: '/access-policies',
  accessPolicy: `/access-policies/access-policy/details/:id`,
  create: `/access-policies/create`,
  edit: `/access-policies/edit/:id`,
} as const;

const routeRoles: RouteRoles<typeof paths> = {
  create: ['api:access-policies:create'],
  edit: ['api:access-policies:read', 'api:access-policies:update'],
  base: ['api:access-policies:list'],
  accessPolicy: ['api:access-policies:read'],
};

const routes: RouteGateProps[] = [
  {
    path: paths.create,
    exact: true,
    render: ({ match }) => {
      return <Redirect to={match.url + '/details'} />;
    },
    routePermissions: routeRoles.create,
    type: 'PROTECTED',
  },
  {
    path: (paths.create + '/:view?') as any,
    component: AccessPolicyForm,
    routePermissions: routeRoles.create,
    type: 'PROTECTED',
  },
  {
    path: paths.edit,
    exact: true,
    render: ({ match }) => {
      return <Redirect to={match.url + '/details'} />;
    },
    routePermissions: routeRoles.edit,
    type: 'PROTECTED',
  },
  {
    path: (paths.edit + '/:view?') as any,
    component: AccessPolicyForm,
    routePermissions: routeRoles.edit,
    type: 'PROTECTED',
  },
  {
    path: paths.accessPolicy,
    component: AccessPolicy,
    routePermissions: routeRoles.edit,
    type: 'PROTECTED',
    exact: true,
  },
  {
    path: paths.base,
    component: AccessPoliciesList,
    routePermissions: routeRoles.edit,
    type: 'PROTECTED',
    exact: true,
  },
];

export { routes as accessPolicyRoutes };
export { routeRoles as accessPolicyRouteRoles };
export { paths as accessPolicyPaths };
