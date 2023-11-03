import { isObject } from '../type-guards/isObject';

export type IsNotEmptyOrUndefined = (alue: any) => boolean;

export const isNotEmptyOrUndefined: IsNotEmptyOrUndefined = value => {
  if (Array.isArray(value)) return !!value.length;
  if (isObject(value)) return !!Object.values(value).length;
  if (typeof value === 'undefined') return false;
  if (typeof value === 'boolean') return true;
  return true;
};
