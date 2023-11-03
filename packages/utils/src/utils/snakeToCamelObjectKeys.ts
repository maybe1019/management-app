/* eslint-disable @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types  */

import { isString, KeysToCamelCase, isObject } from '../';
import { snakeToCamel } from './';

export const snakeToCamelObjectKeys = <T extends Record<string, any>>(
  obj: T
) => {
  const objectClone = {} as Record<string, any>;
  // returns objects own properties AND own symbols, innumerable or not, in the order in which they were set, and guards them to ensure strings
  for (const prop of Reflect.ownKeys(obj).filter(isString)) {
    const camelProp = snakeToCamel(prop);

    objectClone[camelProp] = isObject(obj[prop])
      ? snakeToCamelObjectKeys(obj[prop])
      : obj[prop];
  }

  return objectClone as KeysToCamelCase<T>;
};
