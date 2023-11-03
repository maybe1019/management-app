import { calculatePercentageChange } from '@secberus/utils';

export const timeToRemediateReducer = (data: any) => {
  const convertSecondsToDays = (seconds: number) => {
    if (seconds === 0) return 0;
    return Math.round(seconds / 86400);
  };

  // Convert all remediation times from seconds to days
  const trendData = [...(data.trendData ?? [])].map(o => {
    if ('timestamp' in o && 'value' in o) {
      return { ...o, value: convertSecondsToDays(o.value ?? 0) };
    } else {
      return { timestamp: Date.now(), value: 0 };
    }
  });

  // Recalculate trend based on new data
  let trend = 0;

  if (trendData.length > 1) {
    trend = calculatePercentageChange(
      trendData[0].value ?? 0,
      trendData[trendData.length - 1].value ?? 0
    );
  }

  return {
    count: convertSecondsToDays(data.count ?? 0),
    trendData,
    trend,
  };
};
