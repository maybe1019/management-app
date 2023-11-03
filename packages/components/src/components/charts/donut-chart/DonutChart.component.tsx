import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DefaultDonutChartStyle } from './DonutChart.styled';
import { DonutChartProps, DonutColorGradientStop } from './DonutChart.types';

/**
 * Flexible DonutChart that allows a center label. Can show multiple cells for a variety of data.
 *
 * The data schema is as follows:
 * `data: [
 *  { name: 'Cell 1', value: 81 },
 *  { name: 'Cell 2', value: 23 },
 *  { name: 'Cell 3', value: 14 },
 *  { name: 'Cell 4', value: 58 },
 *  { name: 'Cell 5', value: 99 },
 * ],`
 *
 * A color can be set for each segment/cell. If all should be the same color, specify the color as
 * a single prop in colors. If each color is specified, provide an array of colors or gradients to `colors`.
 * For example: setting all cells to same color:
 * colors: 'red'
 *
 * Example: mix of solid and gradient colors:
 * `colors: [
 *  theme.colors.azure,
 *  [
 *    { offset: '0%', stopColor: '#10857e' },
 *    { offset: '50.57%', stopColor: '#39b68b' },
 *    { offset: '100%', stopColor: '#35b589' },
 *  ],
 *  theme.colors.purple,
 *  theme.colors.red,
 *  theme.colors.blue,
 * ],`
 *
 * @param thickness - thickness as a percentage of the whole pie. 100% is a full circle
 * @param cornerRadius - the radius of the pie cells
 * @param startAngle - angle that the pie starts
 * @param endAngle - angle that the pie ends
 * @param paddingAngle - the angle between segments / cells
 * @param showLabels - show any labels?
 * @param showStationaryPie - allow the stationary gray ring to show
 * @param animate - should allow animations
 * @param animateStationaryRing - should animate the stationary gray ring
 * @param animateProgressRing - should animate the progress ring(s)
 * @param colors - single, array of strings and/or gradient definitions
 * @param data - data provided to the chart
 * @param InnerLabel - center recharts label
 * @param ComponentPropOverrides
 * @param DefaultStyle - the default style that can be overrided
 * @constructor
 */
export const DonutChart: React.FC<DonutChartProps> = ({
  thickness = 25,
  cornerRadius = 80,
  startAngle = 90,
  endAngle = -270,
  paddingAngle = 0,
  showLabels = true,
  showStationaryPie = true,
  animate = true,
  animateStationaryRing = false,
  animateProgressRing = true,
  colors = DefaultDonutChartStyle.fill,
  data,
  InnerLabel,
  ComponentPropOverrides,
  DefaultStyle = DefaultDonutChartStyle,
}) => {
  const {
    ResponsiveContainer: ResponsiveContainerProps = {},
    PieChart: PieChartProps = {},
    Pie: PieProps = {},
    Cell: CellProps = {},
    StationaryPie: StationaryPieProps = {},
    ProgressPie: ProgressPieProps = {},
  } = ComponentPropOverrides || {};

  // Include default styles in addition to user-defined
  DefaultStyle = Object.assign({}, DefaultDonutChartStyle, DefaultStyle);

  const generateGradientIdFromArray = (
    gradientArray: DonutColorGradientStop
  ) => {
    return gradientArray
      ?.map(o => `${o.stopColor}-${o.offset}`)
      .join('-')
      .replace(/[#%]/g, '');
  };

  const radiusPercentage = React.useMemo(() => {
    const outer = 114; // 114% used to eliminate padding around ring when using 100%
    const inner = outer - thickness;
    return { outer, inner };
  }, [thickness]);

  return (
    <ResponsiveContainer {...ResponsiveContainerProps}>
      <PieChart {...PieChartProps}>
        <defs>
          {Array.isArray(colors) &&
            colors.map(gradientArray => {
              if (!Array.isArray(gradientArray)) return null;
              const gradientId = generateGradientIdFromArray(gradientArray);
              return (
                <linearGradient
                  key={gradientId}
                  id={gradientId} // More info about this ID - https://github.com/secberus/secberus-app/pull/2318
                  gradientTransform={DefaultStyle.linearGradientTransform}
                >
                  {gradientArray.map(
                    (
                      props: JSX.IntrinsicAttributes &
                        React.SVGProps<SVGStopElement>,
                      i
                    ) => (
                      <stop key={`stop-${i}-${gradientId}`} {...props} />
                    )
                  )}
                </linearGradient>
              );
            })}
        </defs>
        {showStationaryPie && (
          <Pie
            data={[{ value: 1 }]}
            dataKey="value"
            cx="50%"
            cy="50%"
            fill={DefaultStyle.stationaryPieFill}
            innerRadius={`${radiusPercentage.inner}%`}
            outerRadius={`${radiusPercentage.outer}%`}
            isAnimationActive={animate && animateStationaryRing}
            cornerRadius={cornerRadius}
            startAngle={startAngle}
            endAngle={endAngle}
            stroke=""
            {...Object.assign({}, PieProps, StationaryPieProps)}
          />
        )}
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          fill={DefaultStyle.progressPieFill}
          innerRadius={`${radiusPercentage.inner}%`}
          outerRadius={`${radiusPercentage.outer}%`}
          cornerRadius={cornerRadius}
          paddingAngle={paddingAngle}
          startAngle={startAngle}
          endAngle={endAngle}
          isAnimationActive={animate && animateProgressRing}
          {...Object.assign(PieProps, ProgressPieProps)}
        >
          {data.map((entry, i) => {
            const key = `cell-${i}`;
            let cellFill: string | undefined;

            // Apply the solid color or gradient style to the cell
            if (Array.isArray(colors)) {
              if (Array.isArray(colors[i])) {
                //@ts-expect-error type allows strings and array, array only passed to generator func
                const gradientId = generateGradientIdFromArray(colors[i]);
                cellFill = `url(#${gradientId})`;
              } else {
                cellFill = String(colors[i]);
              }
            } else {
              cellFill = String(colors);
            }

            return (
              <Cell
                key={key}
                fill={cellFill}
                stroke={DefaultStyle.stroke}
                {...CellProps}
              />
            );
          })}
          {showLabels && InnerLabel}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
