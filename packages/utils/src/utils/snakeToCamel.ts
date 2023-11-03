export const snakeToCamel = (str: string): string =>
  str
    .toLowerCase()
    .replace(/[-_][a-z0-9]/g, group => group.slice(-1).toUpperCase());
