/* eslint-disable @typescript-eslint/ban-types */
import type { SnakeToCamelCase } from './';

// for (K in T) { typeof T[K] === 'object' ? KeysToCamelCase(T[K]) : objectClone[camelCase(K)] = T[K]}
export type KeysToCamelCase<T> = {
  [K in keyof T as SnakeToCamelCase<string & K>]: T[K] extends {}
    ? T[K] extends Array<infer Item>
      ? Item[]
      : KeysToCamelCase<T[K]>
    : T[K];
};
