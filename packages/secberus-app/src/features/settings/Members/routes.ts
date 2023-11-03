import { RouteGateProps, RouteRoles } from '../../../app/routing/definitions';
import { OrgMembers } from './list/OrgMembers.component';

const paths = {
  memberManagement: '/members',
} as const;

const routeRoles: RouteRoles<typeof paths> = {
  memberManagement: ['api:orgs:read', 'api:orgs:update'],
};

const routes: RouteGateProps[] = [
  {
    path: paths.memberManagement,
    component: OrgMembers,
    routePermissions: routeRoles.memberManagement,
  },
];

export { paths as orgMemberPaths };
export { routes as orgMemberRoutes };
export { routeRoles as orgMemberRoles };
