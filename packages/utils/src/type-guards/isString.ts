export const isString = (thing: unknown): thing is string => {
  return typeof thing === 'string';
};
