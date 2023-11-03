/**
 * Calculates the trend or percentage changed.
 * @param startValue - the least recent value.
 * @param endValue - the ending, or most recent value.
 */
export const calculatePercentageChange = (
  startValue: number,
  endValue: number
): number => {
  // Avoid dividing by zero
  if (startValue === 0 && endValue === 0) {
    return 0;
  } else if (startValue === 0) {
    return (endValue - startValue) * 100;
  }
  return ((endValue - startValue) / startValue) * 100;
};
