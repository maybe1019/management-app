/* eslint-disable no-prototype-builtins */
export const isEmptyObject = (obj: Record<string, unknown>): boolean => {
  let name;
  for (name in obj) {
    if (obj.hasOwnProperty(name)) {
      return false;
    }
  }
  return true;
};
