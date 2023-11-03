import { isNotEmptyOrUndefined } from './isNotEmptyOrUndefined';

export type PickByPredicate = (key: string, value: any) => boolean;

type PickBy = (
  obj: Record<string, any>,
  predicate: PickByPredicate
) => Record<string, any>;

export const pickBy: PickBy = (obj, predicate) => {
  return Object.entries(obj).reduce((acc, [key, val]) => {
    if (predicate(key, val)) acc[key] = val;
    return acc;
  }, {} as Record<string, any>);
};

export const isNotEmptyOrUndefinedPredicate: PickByPredicate = (_key, value) =>
  isNotEmptyOrUndefined(value);
