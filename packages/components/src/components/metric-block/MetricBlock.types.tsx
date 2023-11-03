export interface MetricBlockProps {
  header: string;
  count?: number | string;
  trend?: number;
  countDecimalPlaces?: number;
  trendDecimalPlaces?: number;
  timePeriod?: string;
  hasColor?: boolean;
  isInverted?: boolean;
  isLoading?: boolean;
  tooltipText?: string;
}
