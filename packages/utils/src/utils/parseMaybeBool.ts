import { isBool } from '..';

export const parseMaybeStringBool = (val: string | boolean) =>
  typeof val === 'boolean' ? val : JSON.parse(val.toLowerCase());

export const parseMaybeBool = (val: unknown) =>
  isBool(val) ? parseMaybeStringBool(val) : val;
