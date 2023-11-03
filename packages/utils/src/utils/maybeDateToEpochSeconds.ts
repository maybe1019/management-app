interface Options {
  stringify?: boolean;
}
/**
 * Takes a JS date and transforms the value into a seconds-based
 * epoch time with 3 point float precision.
 *
 * @remarks  This is primarily to interface with backend
 *
 * @param date A date preferably, but any value
 * @param options Option interface to specify returns
 * @returns string | number | undefined
 */
export function maybeDateToEpochSeconds(
  date: Date | unknown,
  options?: Options
): number | string | undefined {
  if (!(date instanceof Date)) return undefined;
  const epoch = date.getTime() / 1000;
  return options?.stringify ? epoch.toString() : epoch;
}
