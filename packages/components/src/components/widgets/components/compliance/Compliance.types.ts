import { TrendChartData } from '../../../charts';

export interface ComplianceWidgetMain {
  compliance: number;
  trendData: TrendChartData;
  showTrendChart?: boolean;
  isLoading?: boolean;
}

export interface ComplianceContainerProps {
  showTrendChart?: boolean;
  children?: React.ReactNode;
}
