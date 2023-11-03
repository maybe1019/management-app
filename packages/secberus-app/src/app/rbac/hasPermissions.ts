import { Permission } from './definitions';

export const hasPermissions = (
  userRoles: Permission[] | undefined,
  reqRoles: Permission | Permission[] | undefined
): boolean => {
  if (!userRoles) return false;
  if (!reqRoles || reqRoles.length === 0) return true;

  const relevantUserPermissions = userRoles.filter(p => reqRoles.includes(p));

  return relevantUserPermissions.length === [reqRoles].flat().length;
};
