export const formatNumberWithCommas = (
  num: number,
  decimalPlaces = 0
): string =>
  num.toLocaleString(undefined, {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });
