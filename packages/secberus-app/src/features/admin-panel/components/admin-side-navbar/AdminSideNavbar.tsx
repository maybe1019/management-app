import React from 'react';
import { useLocation } from 'react-router-dom';
import { AdminAppLogo, Navigation } from '@secberus/components';
import { DEFAULT_ADMIN_ROUTE_PATH } from '../../../../app/routing/constants';
import { useRoleFilter } from '../../../../app/rbac/roleFilter';
import { NavItem } from '../../../app-nav/SideNavbar.types';
import getActivePath from '../../../../utils/navigation/getActivePath';
import { useTypedSelector } from '../../../../store';
import { userManagementRouteRoles } from '../../../user-management/routes';
import { BackToAppButton } from '../back-to-app-button/BackToAppButton.component';
import { ssoRouteRoles } from '../../../sso/routes';
import { accessPolicyRouteRoles } from '../../../access-policies/routes';
import { rolesManagementRouteRoles } from '../../../roles-management/routes';
import { orgManagementRouteRoles } from '../../../organization-management/routes';
import { UserSettingsDropdown } from '../../../app-nav/UserSettingsDropdown.component';
import { SupportDropdown } from '../../../app-nav/SupportDropdown.component';

export const AdminSideNavbar: React.FC = () => {
  const location = useLocation();
  const active = getActivePath(location.pathname, '-');

  const { sideNavOrgSelectList } = useTypedSelector(
    state => state.layout.visible
  );

  const items = useRoleFilter<NavItem>([
    {
      horizontalSpacing: 'dense',
      verticalSpacing: {
        top: 0,
        bottom: 24,
      },
      id: 'back-to-app',
      title: 'back-to-app',
      render: BackToAppButton,
    },
    {
      id: 'admin-organizations',
      to: `/admin/organizations`,
      title: 'Organizations',
      routePermissions: orgManagementRouteRoles.orgManagement,
    },
    {
      id: 'admin-users',
      to: `/admin/users`,
      title: 'Users',
      routePermissions: userManagementRouteRoles.editUser,
    },
    {
      id: 'admin-roles',
      to: `/admin/roles`,
      title: 'Roles',
      routePermissions: rolesManagementRouteRoles.editRoleManagement,
    },
    {
      id: 'admin-access-policies',
      to: `/admin/access-policies`,
      title: 'Access policies',
      routePermissions: accessPolicyRouteRoles.edit,
    },
    {
      id: 'admin-authentication',
      to: `/admin/authentication`,
      title: 'Authentication',
      routePermissions: ssoRouteRoles.base,
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
      render: () => <SupportDropdown variant="dark" />,
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
      render: () => <UserSettingsDropdown variant="dark" />,
    },
  ]);

  return (
    <Navigation
      variant="light"
      AppLogo={AdminAppLogo}
      appLogoUrl={DEFAULT_ADMIN_ROUTE_PATH}
      items={items}
      active={active}
      preventScroll={sideNavOrgSelectList}
    />
  );
};
