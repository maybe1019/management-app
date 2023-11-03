import React from 'react';
import { useSelf } from '../core/wrappers/WithFindSelf';
import { Permission } from './definitions';
import { hasPermissions } from './hasPermissions';

type Generic = Record<string, any>;

export type RoleItem<T = Generic> = T & {
  routePermissions?: Permission | Permission[];
  children?: RoleItem<T>[];
};

export const useRoleFilter = <T>(items: RoleItem<T>[]) => {
  const { permissions } = useSelf() as { permissions: Permission[] };
  // Eventually this should be living "high above" ~ Cole 06/30/2022 2:35 PM MT
  return React.useMemo(() => {
    return filterChildren<T>(items, permissions);
  }, [items, permissions]);
};

function filterChildren<T = Generic>(
  items: RoleItem<T>[],
  userRoles: Permission[]
): RoleItem<T>[] {
  return items.reduce((acc = [] as RoleItem<T>[], curr) => {
    const item = hasPermissions(userRoles, curr.routePermissions)
      ? curr.children
        ? { ...curr, children: filterChildren(curr.children, userRoles) }
        : curr
      : null;
    if (item) return acc.concat(item);
    return acc;
  }, [] as RoleItem<T>[]);
}
