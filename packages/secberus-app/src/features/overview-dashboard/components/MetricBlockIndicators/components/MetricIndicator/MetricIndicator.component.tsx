import React from 'react';
import {
  MetricBlock,
  MetricBlockProps,
  TrendChart,
} from '@secberus/components';
import { calculatePercentageChange } from '@secberus/utils';
import { Timeseries } from '@secberus/services';
import {
  MetricData,
  useGetMetricsData,
} from '../../hooks/useGetMetricsBlockData';
import { ErrorBoundary } from '../../../../../../utils/wrappers/ErrorBoundaries';
import { MetricBlockTrendChartContainer } from './MetricIndicator.styled';
import { MetricIndicatorProps } from './MetricIndicator.types';

const MetricIndicatorContainer: React.FC<MetricBlockProps> = ({
  children,
  ...props
}) => {
  return (
    <div className="metric_container">
      <MetricBlock {...props}>{children}</MetricBlock>
    </div>
  );
};

function maybeReducer<T extends unknown>(
  data: T,
  reducer?: (...arg: any) => T
) {
  return typeof reducer === 'function' ? reducer(data) : data;
}

const getMetricData = (data: Timeseries): MetricData => {
  const mostRecentValue = data[data.length - 1]?.value ?? 0;
  const leastRecentValue = data[0]?.value ?? 0;

  const percentChanged = calculatePercentageChange(
    leastRecentValue,
    mostRecentValue
  );

  return {
    trendData: data.length > 1 ? data : [],
    count: mostRecentValue,
    trend: percentChanged,
  };
};

const MetricIndicator: React.FC<MetricIndicatorProps> = ({
  metric,
  decimalPlaces,
  header,
  maxDataValue,
  minDataValue,
  tooltipIcon,
  isInverted,
  tooltipText,
  hasColor,
  mutateCount,
  reducer,
}) => {
  const { data, isLoading } = useGetMetricsData(metric);

  const timePeriod = data.length < 30 ? `${data.length}d` : '30d';

  const metricData = React.useMemo(
    () => maybeReducer(getMetricData(data), reducer),
    [data, reducer]
  );

  return (
    <MetricIndicatorContainer
      header={header}
      isInverted={isInverted}
      tooltipText={tooltipText}
      count={maybeReducer(metricData.count, mutateCount)}
      trend={metricData.trend}
      isLoading={isLoading}
      countDecimalPlaces={decimalPlaces}
      hasColor={
        typeof hasColor === 'function'
          ? hasColor({
              count: metricData.count,
              trendData: data,
              trend: metricData.trend,
            })
          : hasColor
      }
      timePeriod={timePeriod}
    >
      <MetricBlockTrendChartContainer>
        <TrendChart
          animate={false}
          data={metricData.trendData}
          minDataValue={minDataValue}
          maxDataValue={maxDataValue}
          tooltipIcon={tooltipIcon}
          tooltipDataStringModifiers={{
            decimalPlaces: decimalPlaces ?? 0,
          }}
          useTooltipPortal
        />
      </MetricBlockTrendChartContainer>
    </MetricIndicatorContainer>
  );
};

const WithErrorBoundary: React.FC<MetricIndicatorProps> = props => (
  <ErrorBoundary
    message="Error while fetching metrics"
    fallbackElement={<MetricIndicatorContainer header={props.header} />}
  >
    <MetricIndicator {...props} />
  </ErrorBoundary>
);

export { WithErrorBoundary as MetricBlockIndicator };
