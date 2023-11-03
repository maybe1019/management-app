import type { MetricType } from '@secberus/services';
import type { MetricBlockProps, TrendChartProps } from '@secberus/components';
import type { MetricData } from '../../hooks/useGetMetricsBlockData';

export type MetricIndicatorProps = {
  metric: MetricType;
  header: string;
  minDataValue?: TrendChartProps['minDataValue'];
  maxDataValue?: TrendChartProps['maxDataValue'];
  tooltipIcon?: TrendChartProps['tooltipIcon'];
  decimalPlaces?: NonNullable<
    TrendChartProps['tooltipDataStringModifiers']
  >['decimalPlaces'];
  isInverted?: MetricBlockProps['isInverted'];
  tooltipText?: MetricBlockProps['tooltipText'];
  hasColor?: boolean | ((data: MetricData) => boolean);
  reducer?: (data: MetricData) => MetricData;
  mutateCount?: (count: MetricBlockProps['count']) => MetricBlockProps['count'];
};
