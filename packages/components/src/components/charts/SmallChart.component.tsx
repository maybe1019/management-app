import React from 'react';
import {
  Line,
  ComposedChart,
  Area,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { SmallChart } from './SmallChart.types';
import { SmallChartContainer } from './SmallChart.styled';
import { CustomTooltip } from './subcomponents/custom-tooltip/CustomTooltip.component';

/**
 * @deprecated Favor using trend chart over this as its more complete and has more options.
 * @param area
 * @param data
 * @param line
 * @param responsive
 * @param cartesian
 * @param children
 * @param xAxis
 * @param yAxis
 * @constructor
 */
export const Chart: React.FC<SmallChart> = ({
  area,
  data,
  line,
  responsive,
  cartesian,
  children,
  xAxis,
  yAxis,
}) => {
  return (
    <SmallChartContainer>
      <ResponsiveContainer width="70%" {...responsive}>
        <ComposedChart data={data}>
          <Tooltip content={<CustomTooltip />} />
          {yAxis && <YAxis {...yAxis} />}
          {xAxis && <XAxis {...xAxis} />}
          <CartesianGrid
            vertical={false}
            stroke="#DFE7EF"
            strokeDasharray="5"
            {...cartesian}
          />
          <Line
            type="monotone"
            unit="M"
            strokeLinecap="round"
            strokeWidth={2}
            dataKey="y"
            stroke="#0273E2"
            dot={false}
            legendType="none"
            {...line}
          />
          <Area
            type="monotone"
            strokeWidth={4}
            fillOpacity={1}
            fill="#DEEEFE"
            stroke="#0273E2"
            {...area}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </SmallChartContainer>
  );
};
