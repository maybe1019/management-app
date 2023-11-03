import React from 'react';
import { camelCase } from 'lodash';
import type { KebabOrSnakeToTitle } from '@secberus/utils';
import { useSelf } from '../core/wrappers/WithFindSelf';
import { hasPermissions } from './hasPermissions';

// PERMISSION_LIST, PERMISSIONED_APIS, MAPPED_PERMISSIONS, should all be generated at some point

const PERMISSION_LIST = [
  'api:orgs:list',
  'api:sso:list',
  'api:compliance-controls:read',
  'api:access-policies:update',
  'api:exceptions:create',
  'api:policies:delete',
  'api:violations:update',
  'api:report-schedules:update',
  'api:risk-posture:read',
  'api:datasources:delete',
  'api:resources:list',
  'api:roles:create',
  'api:logs:list',
  'api:integrations:update',
  'api:sso:delete',
  'api:users:create',
  'api:integrations:read',
  'api:users:delete',
  'api:violations:read',
  'api:policies:create',
  'api:violations:create',
  'api:policies:update',
  'api:exceptions:list',
  'api:violations:list',
  'api:sso:create',
  'api:workflows:delete',
  'api:exceptions:read',
  'api:roles:list',
  'api:compliance-frameworks:list',
  'api:orgs:create',
  'api:access-policies:create',
  'api:access-policies:delete',
  'api:exceptions:delete',
  'api:workflows:update',
  'api:integrations:create',
  'api:integrations:list',
  'api:access-policies:list',
  'api:access-policies:read',
  'api:datasources:update',
  'api:report-schedules:read',
  'api:users:assign-org',
  'api:categories:read',
  'api:categories:list',
  'api:categories:update',
  'api:users:update',
  'api:workflows:read',
  'api:datasources:create',
  'api:resources:read',
  'api:datasources:read',
  'api:sso:read',
  'api:users:read',
  'api:test-policy:execute',
  'api:report-schedules:list',
  'api:categories:delete',
  'api:datasources:list',
  'api:categories:create',
  'api:policies:list',
  'api:orgs:read',
  'api:roles:read',
  'api:policies:read',
  'api:roles:delete',
  'api:users:list',
  'api:compliance-frameworks:update',
  'api:roles:update',
  'api:exceptions:update',
  'api:workflows:create',
  'api:orgs:delete',
  'api:report-schedules:delete',
  'api:orgs:update',
  'api:workflows:list',
  'api:report-schedules:create',
  'api:compliance-frameworks:read',
] as const;

const PERMISSIONED_APIS = [
  'orgs',
  'sso',
  'compliance-controls',
  'access-policies',
  'exceptions',
  'policies',
  'violations',
  'report-schedules',
  'risk-posture',
  'datasources',
  'resources',
  'roles',
  'logs',
  'integrations',
  'users',
  'workflows',
  'compliance-frameworks',
  'users-org',
  'categories',
  'test-policy',
] as const;

const MAPPED_PERMISSIONS = {
  orgs: ['list', 'create', 'read', 'delete', 'update'],
  sso: ['list', 'delete', 'create', 'read'],
  'compliance-controls': ['read'],
  'access-policies': ['update', 'create', 'delete', 'list', 'read'],
  exceptions: ['create', 'list', 'read', 'delete', 'update'],
  policies: ['delete', 'create', 'update', 'list', 'read'],
  violations: ['update', 'read', 'create', 'list'],
  'report-schedules': ['update', 'read', 'list', 'delete', 'create'],
  'risk-posture': ['read'],
  datasources: ['delete', 'update', 'create', 'read', 'list', 'scan'],
  resources: ['list', 'read'],
  roles: ['create', 'list', 'read', 'delete', 'update'],
  logs: ['list'],
  integrations: ['update', 'read', 'create', 'list'],
  users: ['create', 'delete', 'assign-org', 'update', 'read', 'list'],
  workflows: ['delete', 'update', 'read', 'create', 'list'],
  'compliance-frameworks': ['list', 'update', 'read'],
  'users-org': [],
  categories: ['read', 'list', 'update', 'delete', 'create'],
  'test-policy': ['execute'],
} as const;

export type Permission = typeof PERMISSION_LIST[number];
export type PermissionedAPI = typeof PERMISSIONED_APIS[number];

const titleCase = (s: string) => s[0].toUpperCase() + s.substring(1);

type CheckPermissionsReturnType<Name extends keyof typeof MAPPED_PERMISSIONS> =
  {
    [Property in keyof typeof MAPPED_PERMISSIONS as Property extends string
      ? `can${KebabOrSnakeToTitle<typeof MAPPED_PERMISSIONS[Name][number]>}`
      : never]: boolean;
  };

/**
 * Helper function to check if a user has a set of permissions.
 * Returns permissions and accountOwner.
 *
 * @example `const { canCreate, canUpdate, canDelete } = usePermissions('datasources');`
 * @param api
 */
export const usePermissions = <T extends PermissionedAPI>(api?: T) => {
  const { permissions, account_owner } = useSelf();

  return React.useMemo(() => {
    const list: CheckPermissionsReturnType<T> & { accountOwner: boolean } = {
      accountOwner: account_owner,
    };
    if (api)
      MAPPED_PERMISSIONS[api as keyof typeof MAPPED_PERMISSIONS].forEach(
        (curr: any) => {
          (list as any)[`can${titleCase(camelCase(curr))}`] = hasPermissions(
            permissions as Permission[],
            `api:${api}:${curr}` as Permission
          );
        }
      );
    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- spreading array allows for memoization
  }, [account_owner, api, ...permissions]);
};
