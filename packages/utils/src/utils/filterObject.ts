export const filterObject = (obj: Record<string, any>, keys: string[]) =>
  Object.keys(obj)
    .filter(key => keys.includes(key))
    .reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {} as Record<string, any>);
