import { theme } from '../../../styles/theme';
import { DefaultDonutChartStyleProps } from './DonutChart.types';

export const DefaultDonutChartStyle: DefaultDonutChartStyleProps = {
  stroke: '',
  fill: theme.colors.blue,
  fillTransparent: theme.colors.transparent,
  stationaryPieFill: theme.colors['medium-gray'],
  progressPieFill: theme.colors.blue,
  linearGradientTransform: 'rotate(90)',
};
