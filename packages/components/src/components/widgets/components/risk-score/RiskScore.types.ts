import { TrendChartData } from '../../../';

export interface RiskScoreMain {
  score: number;
  scoreOutOf?: number;
  trendData?: TrendChartData;
  showTrendChart?: boolean;
}
