import React from 'react';
import {
  AreaProps,
  LineProps,
  ResponsiveContainerProps,
  CartesianGridProps,
  XAxisProps,
  YAxisProps,
} from 'recharts';
import { ReplaceType } from '@secberus/utils';

type ReplaceRef<T, K extends keyof T> = ReplaceType<T, K, React.Ref<any>>;

type Area = ReplaceRef<AreaProps, 'ref'>;
type Line = ReplaceRef<LineProps, 'ref'>;

export interface SmallChart {
  area: Area;
  line: Line;
  responsive: ResponsiveContainerProps;
  data: Record<string, any>[] | number[];
  xAxis?: XAxisProps;
  yAxis?: YAxisProps;
  cartesian?: ReplaceRef<CartesianGridProps, 'ref'>; // https://github.com/recharts/recharts/issues/2665;
}
