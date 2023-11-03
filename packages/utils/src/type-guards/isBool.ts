export const isBool = (val: unknown): val is boolean =>
  typeof val === 'boolean' ||
  (typeof val === 'string' &&
    (val.toLowerCase() === 'true' || val.toLowerCase() === 'false'));
