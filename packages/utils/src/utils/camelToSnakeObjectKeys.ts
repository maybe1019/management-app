import { camelToSnake } from '.';

export const camelToSnakeObjectKeys = (
  obj: Record<string, any>
): Record<string, any> => {
  return Object.entries(obj).reduce((acc, [key, val]) => {
    const camelKey = camelToSnake(key);
    acc[camelKey] = val;
    return acc;
  }, {} as Record<string, any>);
};
