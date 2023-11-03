import type {
  KebabOrSnakeToCamel,
  StringWithAutoComplete,
} from '@secberus/utils';
import { camelCase } from 'lodash';
import { Permission } from '../rbac/definitions';
import { RouteConfigRoute, RouteGateProps } from './definitions';

export const injectParentRoute = (
  routes: RouteGateProps[],
  parentRoute: RouteConfigRoute
) =>
  routes.map(r => ({
    ...r,
    path: (parentRoute + r.path) as RouteGateProps['path'],
  }));

/* --- BEGIN composeRouteConfig --- */

type RawConfig<T extends string> = {
  paths: Record<
    StringWithAutoComplete<KebabOrSnakeToCamel<T>>,
    RouteConfigRoute
  >;
  permissions: Record<
    StringWithAutoComplete<KebabOrSnakeToCamel<T>>,
    Permission | Permission[]
  >;
  components: Record<
    StringWithAutoComplete<KebabOrSnakeToCamel<T>>,
    React.ComponentType
  >;
  routes?: Record<
    StringWithAutoComplete<KebabOrSnakeToCamel<T>>,
    RouteGateProps
  >;
};

type ReturnConfig<T extends string> = {
  paths: Record<
    StringWithAutoComplete<KebabOrSnakeToCamel<T>>,
    RouteConfigRoute
  >;
  permissions: Record<
    StringWithAutoComplete<KebabOrSnakeToCamel<T>>,
    Permission | Permission[]
  >;
  routes: RouteGateProps[];
};

type ScopedPropertyNames<Type, Name extends string> = {
  [Property in keyof Type as Property extends `${infer P1}${infer P2}`
    ? `${string & KebabOrSnakeToCamel<Name>}${Uppercase<P1>}${P2}`
    : never]: Type[Property];
};

export const composeRouteConfig =
  <T extends string>(name: string | T) =>
  ({ paths, permissions, components, routes }: RawConfig<T>) => {
    const parsedName = camelCase(name);
    return {
      [`${parsedName}Paths`]: paths,
      [`${parsedName}Permissions`]: permissions,
      [`${parsedName}Routes`]: Object.keys(paths).map(p => ({
        path: (paths as any)[p],
        component: (components as any)[p],
        routePermissions: (permissions as any)[p],
        type: 'PROTECTED',
        ...(routes ? (routes as any)[p] : {}),
      })),
    } as unknown as ScopedPropertyNames<ReturnConfig<T>, T>;
  };

/* --- END composeRouteConfig --- */
