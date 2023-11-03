import type { DonutChartProps } from '../donut-chart';
import type { TypographyProperties } from '../../../types';

export interface PercentageComponentOverrides {
  DonutChart?: DonutChartProps;
}

export interface PercentageDonutProps {
  percent: number;
  textType?: TypographyProperties;
  textDark?: boolean;
  useGradientColors?: boolean;
  showPercentText?: boolean;
  showPercentSign?: boolean;
  animate?: boolean;
  allowNegativeValue?: boolean;
  ComponentPropOverrides?: PercentageComponentOverrides;
}
