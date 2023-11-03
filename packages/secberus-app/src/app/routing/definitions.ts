import type { RouteProps } from 'react-router-dom';
import type { Permission } from '../rbac/definitions';

export type RouteType = 'AUTH' | 'DEFAULT' | 'PROTECTED';

export const ROUTE_TYPES: Record<RouteType, RouteType> = {
  AUTH: 'AUTH',
  DEFAULT: 'DEFAULT',
  PROTECTED: 'PROTECTED',
};

export interface RouteGateProps extends RouteProps {
  navMenu?: boolean;
  type?: keyof typeof ROUTE_TYPES;
  routePermissions?: Permission | Permission[];
  path?: RouteConfigRoute | RouteConfigRoute[];
}

export type RouteRoles<T> = Partial<Record<keyof T, Permission | Permission[]>>;

export type RouteConfigRoute = `/${string}`;
