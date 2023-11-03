import { hasPermissions } from '../../rbac/hasPermissions';
import type { Permission } from '../../rbac/definitions';
import { useSelf } from '../../core/wrappers/WithFindSelf';

/**
 * @decrecated usePermissions should be used instead to check for permissions.
 */
export const useHasPermissions = (...reqRoles: Permission[]) => {
  const { permissions } = useSelf() as { permissions: Permission[] };
  return hasPermissions(permissions, reqRoles.flat());
};
