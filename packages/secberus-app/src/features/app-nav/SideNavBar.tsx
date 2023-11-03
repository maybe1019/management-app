import React from 'react';
import { Navigation } from '@secberus/components';
import { useLocation } from 'react-router-dom';
import { camelCase, startCase } from 'lodash';
import { useTypedSelector } from '../../store';
import getActivePath from '../../utils/navigation/getActivePath';
import { useRoleFilter } from '../../app/rbac/roleFilter';
import { frameworkPaths, frameworkRouteRoles } from '../frameworks/routes';
import { overviewDashboardPaths } from '../overview-dashboard/routes';
import { dataExplorerPaths } from '../data-explorer/routes';
import { DEFAULT_ROUTE_PATH } from '../../app/routing/constants';
import { categoryRouteRoles } from '../policy-categories/list/routes';
import { orgMemberRoles } from '../settings/Members/routes';
import { OrganizationSelect } from '../organization-select/OrganizationSelect.component';
import { logRouteRoles } from '../logs';
import { useFeatureFlags } from '../feature-flags/hooks/useFeatureFlags';
import { useAppRedirect } from '../../utils/useAppRedirect';
import { DEFAULT_QUERY_ID } from '../data-explorer/DataExplorerProvider';
import { NavItem } from './SideNavbar.types';
import { UserSettingsDropdown } from './UserSettingsDropdown.component';
import { SupportDropdown } from './SupportDropdown.component';

export const SideNavBar: React.FC = () => {
  const location = useLocation();
  const active = getActivePath(location.pathname, '-');
  const { navigateTo } = useAppRedirect();
  const { sideNavOrgSelectList } = useTypedSelector(
    state => state.layout.visible
  );

  const features = useFeatureFlags();
  const explorerEnabled = features?.['data-explorer'];

  const items = useRoleFilter<NavItem>(
    //@ts-expect-error its routes what do you expect...
    [
      {
        id: 'select',
        title: 'select',
        horizontalSpacing: 'dense',
        verticalSpacing: {
          top: 0,
          bottom: 24,
        },
        render: () => (
          <OrganizationSelect
            dark
            transformName={name =>
              name.startsWith('_') ? startCase(camelCase(name)) : name
            }
          />
        ),
      },
      {
        id: 'overview',
        to: overviewDashboardPaths.overviewDashboard,
        title: 'Overview',
      },
      {
        id: 'risk-posture',
        to: `/risk-posture/policy`,
        title: 'Risk',
      },
      {
        id: 'compliances',
        to: `/compliances`,
        title: 'Compliance',
      },
      {
        placement: 'secondary',
        id: 'policies-parent',
        title: 'Policies',
        children: [
          {
            id: 'policies',
            to: `/policies`,
            title: 'Policy list',
          },
          {
            id: 'frameworks',
            to: frameworkPaths.frameworks,
            title: 'Frameworks',
            routePermissions: frameworkRouteRoles.frameworks,
          },
          {
            id: `categories`,
            to: `/categories`,
            title: 'Categories',
            routeRole: categoryRouteRoles.base,
          },
        ],
      },
      {
        placement: 'secondary',
        id: 'warehouse',
        title: 'Data explorer',
        onClick: () =>
          navigateTo(
            `${dataExplorerPaths.dataExplorer}/query/${DEFAULT_QUERY_ID}`
          ),
      },
      {
        placement: 'secondary',
        id: 'reports',
        to: `/reports`,
        title: 'Reports',
      },
      {
        placement: 'secondary',
        id: 'log',
        to: `/logs`,
        title: 'Activity log',
        routePermissions: logRouteRoles.logs,
      },
      {
        placement: 'secondary',
        id: 'workflows',
        to: `/workflows`,
        title: 'Workflows',
      },
      {
        placement: 'secondary',
        id: 'settings',
        title: 'Settings',
        children: [
          {
            id: 'settings-data-sources',
            to: `/settings/data-sources`,
            title: 'Data sources',
          },
          {
            id: 'settings-integrations',
            to: `/settings/integrations`,
            title: 'Integrations',
          },
          {
            id: 'settings-members',
            to: `/settings/members`,
            title: 'Members',
            routePermissions: orgMemberRoles.memberManagement,
          },
        ],
      },
      {
        placement: 'footer',
        id: 'support',
        title: 'support',
        horizontalSpacing: 'none',
        verticalSpacing: {
          top: 0,
          bottom: 0,
        },
        render: () => <SupportDropdown />,
      },
      {
        placement: 'footer',
        id: 'user-settings',
        title: 'user-settings',
        horizontalSpacing: 'none',
        verticalSpacing: {
          top: 0,
          bottom: 0,
        },
        render: () => <UserSettingsDropdown />,
      },
    ].filter(({ id }) => !(!explorerEnabled && id === 'warehouse'))
  );

  return (
    <Navigation
      appLogoUrl={DEFAULT_ROUTE_PATH}
      items={items}
      active={active}
      preventScroll={sideNavOrgSelectList}
    />
  );
};
