/* eslint-disable @typescript-eslint/ban-types */

// object type guard
export const isObject = (val: Object | undefined): val is Record<string, any> =>
  !!val &&
  !!(val.constructor && val.constructor.name.toLowerCase() === 'object');
