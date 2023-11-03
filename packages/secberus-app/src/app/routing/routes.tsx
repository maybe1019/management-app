import { lazily } from 'react-lazily';
import { Redirect, RouteProps } from 'react-router-dom';
import { authRoutes } from '../../features/auth/routes';
import { policyDetailsRoutes } from '../../screens/v2/Policies/Details/routes';
import i18n from '../../i18n';
import { notAuthenticatedRoutes } from '../../features/not-authenticated/routes';
import { settingsRoutes } from '../../features/settings/routes';
import { categoryRoutes } from '../../features/policy-categories/list/routes';
import { frameworkRoutes } from '../../features/frameworks/routes';
import { reportsRoutes } from '../../features/reports/routes';
import { logRoutes } from '../../features/logs/routes';
import { notFoundRoutes } from '../../features/404/routes';
import { adminRoutes } from '../../features/admin-panel/routes';
import { dataExplorerRoutes } from '../../features/data-explorer/routes';
import {
  overviewDashboardRoutes,
  overviewDashboardPaths,
} from '../../features/overview-dashboard/routes';
import { categoryDetailRoutes } from '../../features/policy-categories/detail/routes';
import * as paths from './paths';
import { RouteGateProps, ROUTE_TYPES } from './definitions';

// NOTE: @colemars --
// if routing/org context/contextual routes are redesigned / revisited in the future the following resources should be consulted from react-router docs:
// * https://reactrouter.com/web/example/nesting
//  - for relative/nested linking. Instead of appending {orgPrefix} can everything just be relative to a base org route? Similar idea for our paths routes defined in paths.ts
// * https://reactrouter.com/web/example/recursive-paths
//  - because of our increasingly complex data relationships it may become possible in the future for us to drill down continuously..
//  e.g. category => policy => violation => compliance => requirement => subrequirement => policy => violation etc.. as a result we should be able to leverage something similar to what is present in the linked example

const routing = i18n.t('routing', { returnObjects: true }) as Record<
  string,
  string
>;

// DEPRECATED DO NOT ADD
// This follows our old /screens/* format. We now use
// features/* - lazyloading is performed by component instead of
// all in one file.
// TODO: Cleanup
const {
  CompliancesScreen,
  ControlScreen,
  PoliciesScreen,
  PolicyFormScreen,
  RequirementScreen,
  RiskPostureScreen,
  ViolationDetailsScreen,
  WorkflowsScreen,
  ManageExceptionsScreen,
} = lazily(() => import('../../screens'));

interface RouteGatePropsOverridePath extends RouteProps {
  type?: RouteGateProps['type'];
}

const baseRoute: RouteGatePropsOverridePath[] = [
  {
    type: ROUTE_TYPES.DEFAULT,
    path: '/',
    exact: true,
    render: () => {
      return <Redirect to={overviewDashboardPaths.overviewDashboard} />;
    },
  },
  {
    type: ROUTE_TYPES.DEFAULT,
    path: paths.orgPrefix,
    exact: true,
    render: () => {
      return <Redirect to={overviewDashboardPaths.overviewDashboard} />;
    },
  },
];

const redirects: RouteGatePropsOverridePath[] = [
  {
    type: ROUTE_TYPES.PROTECTED,
    exact: true,
    path: `${paths.orgPrefix}/${routing['risk-posture']}`,
    render: () => <Redirect to="/risk-posture/policy" />,
  },
  {
    type: ROUTE_TYPES.PROTECTED,
    exact: true,
    path: `${paths.orgPrefix}/ops`,
    render: () => <Redirect to="/ops/policy" />,
  },
];

// These routes are deprecated. Check features/*/routes.ts for the new format.
// TODO: Reorganize these to features and remove.
const DEPRECATED_DO_NOT_ADD_routes_TO_BE_ORGANIZED: RouteGatePropsOverridePath[] & {
  path?: string;
} = [
  {
    type: ROUTE_TYPES.PROTECTED,
    path: `${paths.orgPrefix}/${routing.workflows}`,
    component: WorkflowsScreen,
  },
  {
    type: ROUTE_TYPES.PROTECTED,
    component: RiskPostureScreen,
    exact: true,
    path: `${paths.orgPrefix}/${routing['risk-posture']}/:view`,
  },
  {
    type: ROUTE_TYPES.PROTECTED,
    component: PoliciesScreen,
    exact: true,
    path: `${paths.orgPrefix}/${routing.policies}`,
  },
  {
    type: ROUTE_TYPES.PROTECTED,
    path: `${paths.orgPrefix}/${routing.policies}/:policyId?/${routing.form}/:view?`,
    component: PolicyFormScreen,
    navMenu: false,
  },
  {
    type: ROUTE_TYPES.PROTECTED,
    exact: true,
    path: `${paths.orgPrefix}/${routing.policies}/:policyId?/${routing.exceptions}`,
    component: ManageExceptionsScreen,
    navMenu: false,
  },
  {
    type: ROUTE_TYPES.PROTECTED,
    path: `${paths.orgPrefix}/${routing.rules}`,
    component: PoliciesScreen,
    exact: true,
  },
  {
    type: ROUTE_TYPES.PROTECTED,
    path: `${paths.orgPrefix}/${routing.compliances}/(details)?/:frameworkId?`,
    component: CompliancesScreen,
    exact: true,
  },
  {
    type: ROUTE_TYPES.PROTECTED,
    path: `${paths.requirementDetailsPath}`,
    exact: true,
    component: RequirementScreen,
  },
  {
    type: ROUTE_TYPES.PROTECTED,
    path: `${paths.subrequirementDetailsPath}`,
    exact: true,
    component: ControlScreen,
  },
  {
    type: ROUTE_TYPES.PROTECTED,
    path: paths.violationDetailsPath,
    component: ViolationDetailsScreen,
  },
];

export const routes = [
  ...notAuthenticatedRoutes,
  ...policyDetailsRoutes,
  ...notFoundRoutes,
  ...settingsRoutes,
  ...authRoutes,
  ...logRoutes,
  ...dataExplorerRoutes,
  ...categoryRoutes,
  ...categoryDetailRoutes,
  ...overviewDashboardRoutes,
  ...frameworkRoutes,
  ...reportsRoutes,
  ...adminRoutes,
  ...DEPRECATED_DO_NOT_ADD_routes_TO_BE_ORGANIZED, // todo: organize
  ...redirects, // todo: organize
  ...baseRoute,
];
