import type { TrendChartData } from '@secberus/components';
import type { MetricType } from '@secberus/services';
import { secberusApiGW } from '@secberus/services';

export interface MetricData {
  count?: number;
  trendData: TrendChartData;
  trend?: number;
}

export type useGetMetricsBlockDataReducer = (data: MetricData) => MetricData;

export const useGetMetricsData = (name: MetricType) => {
  const { data, ...query } = secberusApiGW.useGetMetricQuery(
    {
      name,
      limit: '30',
    },
    {
      selectFromResult: ({ data = [], ...rest }) => ({
        data: [...data]?.sort((a, b) => a.timestamp - b.timestamp), // we receieve metrics with the most recent first, we want the opposite
        ...rest,
      }),
    }
  );

  if (query.error) throw new Error(JSON.stringify(query.error));

  return {
    data,
    isLoading: query.isLoading,
  };
};
