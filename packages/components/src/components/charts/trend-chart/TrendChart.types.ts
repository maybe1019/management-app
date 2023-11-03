import { CSSProperties } from 'styled-components';
import {
  ResponsiveContainerProps,
  ReferenceLineProps,
  TooltipProps,
  AreaProps,
  AreaChart,
  YAxisProps,
} from 'recharts';
import { CustomTooltipDataStringModifiers } from '../subcomponents';

export type ReferenceLinesArray = (string | number)[];

export interface Point {
  x: number;
  y: number;
}

export type Points = Point[];

export interface AreaChartMouseMoveProps {
  activeTooltipIndex?: number | undefined;
}

export interface AreaMouseMoveProps {
  points?: Point[];
}

export interface TrendChartDataObject {
  timestamp: number;
  value: number;
}

export type TrendChartData = TrendChartDataObject[];

export interface RechartComponentProps {
  ResponsiveContainer?: ResponsiveContainerProps;
  AreaChart?: React.ComponentProps<typeof AreaChart>;
  ReferenceLine?: ReferenceLineProps;
  Tooltip?: TooltipProps<never, never>;
  Area?: AreaProps;
  YAxis?: YAxisProps;
}

export interface DefaultStyleProps {
  strokeWidth?: CSSProperties['strokeWidth'];
  strokeColor?: CSSProperties['strokeWidth'];
  fill?: CSSProperties['fill'];
  fillOpacity?: CSSProperties['fillOpacity'];
  referenceLineColor: CSSProperties['stroke'];
  referenceLineDasharray: CSSProperties['strokeDasharray'];
}

export interface TrendChartBorderRadius {
  topLeft?: number;
  topRight?: number;
  bottomLeft?: number;
  bottomRight?: number;
}

export interface TrendChartProps {
  fill?: CSSProperties['backgroundColor'];
  stroke?: CSSProperties['borderColor'];
  strokeWidth?: CSSProperties['borderWidth'];
  borderRadius?: TrendChartBorderRadius;
  showArea?: boolean;
  showLine?: boolean;
  showCursor?: boolean;
  showReferenceLinesWithNoData?: boolean;
  referenceLines?: ReferenceLinesArray;
  animate?: boolean;
  animateOnNoData?: boolean;
  data: TrendChartData;
  minDataValue?: number | string;
  maxDataValue?: number | string;
  tooltipIcon?: JSX.Element;
  tooltipDataStringModifiers?: CustomTooltipDataStringModifiers;
  useTooltipPortal?: boolean;
  ComponentPropOverrides?: RechartComponentProps;
  DefaultStyle?: DefaultStyleProps;
}
