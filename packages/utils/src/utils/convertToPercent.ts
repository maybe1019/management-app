// 4th grade math wasnt useless!!!
export const getPercent = (
  val: number,
  total: number,
  maximumPercentage = 100
): number => Math.min((val / total) * 100, maximumPercentage);

export const getStringPercent = (
  val: number,
  total: number,
  decimalPlace = 0,
  maximumPercentage?: number
): string => {
  return `${getPercent(val, total, maximumPercentage).toFixed(
    Math.min(Math.abs(decimalPlace), 100)
  )}%`;
};
