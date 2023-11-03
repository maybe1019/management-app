/**
 * Sorts an array based on an array of value keys.
 * @param order - the value keys the array will be sorted to match.
 * @param arr - the array to be sorted.
 * @param sortKey - the key used for sorting.
 */
export const sortArrayFromKeys = (
  order: string[],
  arr: Array<any>,
  sortKey: string
): Array<any> =>
  arr.sort((a, b) => order.indexOf(a[sortKey]) - order.indexOf(b[sortKey]));
