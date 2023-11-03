import React from 'react';
import { CSSProperties } from 'styled-components';
import {
  ResponsiveContainerProps,
  PieProps,
  LabelProps,
  CellProps,
  PieChart,
  Label,
} from 'recharts';

export interface DefaultDonutChartStyleProps {
  stroke?: string;
  fill?: CSSProperties['fill'];
  fillTransparent?: CSSProperties['fill'];
  stationaryPieFill?: CSSProperties['fill'];
  progressPieFill?: CSSProperties['fill'];
  labelColor?: CSSProperties['color'];
  linearGradientTransform?: CSSProperties['transform'];
}

export interface DonutChartData {
  name?: string;
  value?: number | string;
}

export interface DonutComponentOverrides {
  ResponsiveContainer?: ResponsiveContainerProps;
  PieChart?: React.ComponentProps<typeof PieChart>;
  Pie?: PieProps;
  Label?: LabelProps;
  Cell?: CellProps;
  StationaryPie?: PieProps;
  ProgressPie?: PieProps;
}

export type DonutColorGradientStop = {
  offset: number | string;
  stopColor: CSSProperties['fill'];
  stopOpacity?: number | string;
}[];

export interface DonutChartProps {
  thickness?: number;
  cornerRadius?: number;
  startAngle?: number;
  endAngle?: number;
  paddingAngle?: number;
  showLabels?: boolean;
  showStationaryPie?: boolean;
  animate?: boolean;
  animateStationaryRing?: boolean;
  animateProgressRing?: boolean;
  colors?:
    | CSSProperties['fill']
    | Array<DonutColorGradientStop | CSSProperties['fill']>;
  data: DonutChartData[];
  InnerLabel?: ReturnType<typeof Label>;
  ComponentPropOverrides?: DonutComponentOverrides;
  DefaultStyle?: DefaultDonutChartStyleProps;
}
