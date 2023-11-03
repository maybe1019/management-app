import { isObject } from '..';
import { parseMaybeBool } from './parseMaybeBool';

export const parseMaybeBoolKeyValues = (obj: Record<string, any>) => {
  const foo = (record: Record<string, any>) =>
    Object.entries(record).reduce((acc, [key, val]) => {
      acc[key] = isObject(val) ? foo(val) : parseMaybeBool(val);

      return acc;
    }, {} as Record<string, any>);

  return foo(obj);
};
