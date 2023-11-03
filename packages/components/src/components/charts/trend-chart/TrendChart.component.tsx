import React from 'react';
import {
  AreaChart,
  Area,
  ReferenceLine,
  Tooltip as RechartTooltip,
  ResponsiveContainer,
  YAxis,
} from 'recharts';
import {
  getMinFromArray,
  getMaxFromArray,
  getMeanFromArray,
  getMedianFromArray,
  getModeFromArray,
  getRangeFromArray,
} from '@secberus/utils';
import {
  ChartContainer,
  CustomizedActiveDot,
  CustomTooltip,
} from '../subcomponents';
import { DefaultTrendChartStyle } from './TrendChart.styled';
import {
  TrendChartProps,
  AreaChartMouseMoveProps,
  AreaMouseMoveProps,
} from './TrendChart.types';

/**
 * Flexible & responsive trend chart that can be used to show data. The chart fills
 * the given container area by default (not maintaining aspect ratio). If maintaining
 * a given aspect ratio is desired, the `ResponsiveContainer` -> `aspect` props should be set.
 *
 * **Important** By default, the chart will scale its coordinates for readability.
 * This works well when there is an unknown max value or if you just want to chart
 * to scale. However, if the max or min value is known, and you wish to have the chart YAxis represent
 * the true "scale" of the data, set `minDataValue` and/or `maxDataValue`.
 *
 * All underlying components can be overridden using ComponentPropOverrides and the
 * targeted component (i.e.: ResponsiveContainer, AreaChart, ReferenceLine, Tooltip
 * Area, YAxis). Example below:
 * `ComponentPropOverrides {
 *   ResponsiveContainer: {
 *     aspect: (16 / 9)
 *   },
 *   AreaChart: {},
 *   ReferenceLine: {},
 *   Tooltip: {},
 *   Area: {},
 *   YAxis: {},
 * }`
 *
 * All aspects of the chart use the recharts library.
 * Read more about recharts here: [https://recharts.org/en-US/](https://recharts.org/en-US/)
 *
 * The charts data schema is in the following format: `[{ timestamp: 1649777930879, value: 4 }]`
 *
 * The general look & style of the chart can be control with the DefaultStyle prop.
 * The default exported chart style is below:
 * `export const DefaultTrendChartStyle = {
 *   strokeWidth: 3,
 *   strokeColor: theme.colors.blue,
 *   fill: theme.colors['light-blue'],
 *   fillOpacity: 0.60,
 *   referenceLineColor: theme.colors['medium-gray'],
 *   referenceLineDasharray: '8',
 *   fillTransparent: theme.colors.transparent,
 * };`
 *
 * @param fill - the color of the area
 * @param stroke - the color of the polotted line
 * @param strokeWidth - the plotted line's thickness
 * @param showCursor - show/hide the horizontal line
 * @param showArea - show/hide the area in
 * @param showLine - show/hide the plotted line
 * @param showReferenceLinesWithNoData - should the chart render reference lines if no data and the lines fall within the YAxis's scale range
 * @param animate
 * @param animateOnNoData
 * @param referenceLines - array of options allows for keywords ['min', 'max', 'mean', 'avg', 'median', 'mode', 'range'] a percentage (49%) or literal value (49)
 * @param data - the data for the chart in the format: `[{ timestamp: 1649777930879, value: 4 }, ...]`
 * @param minDataValue
 * @param maxDataValue
 * @param tooltipIcon
 * @param tooltipDataStringModifiers
 * @param useTooltipPortal
 * @param ComponentPropOverrides - allows setting props on the underlying components
 * @param DefaultStyle - controls the general look of the chart
 * @constructor
 */
export const TrendChart: React.FC<TrendChartProps> = ({
  fill,
  stroke,
  strokeWidth,
  showCursor = false,
  showArea = true,
  showLine = true,
  showReferenceLinesWithNoData = false,
  animate = true,
  animateOnNoData = false,
  referenceLines = [],
  data = [],
  minDataValue,
  maxDataValue,
  tooltipIcon,
  tooltipDataStringModifiers,
  useTooltipPortal,
  ComponentPropOverrides,
  DefaultStyle = DefaultTrendChartStyle,
}) => {
  const {
    ResponsiveContainer: ResponsiveContainerProps = {},
    AreaChart: AreaChartProps = {},
    ReferenceLine: ReferenceLineProps = {},
    Tooltip: TooltipProps = {},
    Area: AreaProps = {},
    YAxis: YAxisProps = {},
  } = ComponentPropOverrides || {};
  const {
    strokeWidth: defaultStrokeWidth,
    strokeColor,
    fill: defaultFill,
    fillOpacity,
    referenceLineColor,
    referenceLineDasharray,
    fillTransparent,
  } = Object.assign({}, DefaultTrendChartStyle, DefaultStyle);
  const [activeTooltipIndex, setActiveTooltipIndex] = React.useState<
    number | null
  >(null);
  const [customTooltipPos, setCustomTooltipPos] = React.useState({
    x: 0,
    y: 0,
  });
  const [mouseOverChartArea, setMouseOverChartArea] = React.useState(false);
  const tooltipRef = React.useRef<HTMLDivElement | null>(null);
  const activeDotRef = React.useRef<HTMLElement | null>(null);
  const tooltipPortalElementId = 'tooltip';

  const tooltipIsPortaled = React.useMemo(() => {
    /**
     * Ensures element will be portaled to prevent issues with applying styles
     * for global element position rather than local chart x/y. The tooltip portal
     * only returns a portaled element if the parent element exists so here we're
     * checking if it exists and if a portal is to be used in the first place,
     */
    return useTooltipPortal && document.getElementById(tooltipPortalElementId);
  }, [useTooltipPortal, tooltipPortalElementId]);

  const chartData = React.useMemo(() => {
    if (data.length === 0) return [{ value: 1 }, { value: 1 }];
    return data;
  }, [data]);

  const extractedValues = React.useMemo(() => {
    return data.map(o => Number(o.value));
  }, [data]);

  const minValue = React.useMemo(
    () => getMinFromArray(extractedValues),
    [extractedValues]
  );

  const maxValue = React.useMemo(
    () => getMaxFromArray(extractedValues),
    [extractedValues]
  );

  const averageValue = React.useMemo(
    () => getMeanFromArray(extractedValues),
    [extractedValues]
  );

  const medianValue = React.useMemo(
    () => getMedianFromArray(extractedValues),
    [extractedValues]
  );

  const modeValue = React.useMemo(
    () => getModeFromArray(extractedValues),
    [extractedValues]
  );

  const rangeValue = React.useMemo(
    () => getRangeFromArray(extractedValues),
    [extractedValues]
  );

  const getMappedPercentage = (stringValue: string) => {
    const targetPercent = stringValue.replace('%', '');
    return (Number(targetPercent) / 100) * maxValue;
  };

  const uniqueRefLines = React.useMemo(() => {
    return [...new Set<number | string>(referenceLines)];
  }, [referenceLines]);

  const YAxisDomain: [number | string, number | string] = React.useMemo(() => {
    const min: number | string = minDataValue ? minDataValue : 0;
    const max: number | string = maxDataValue ? maxDataValue : 'auto';

    if (data.length === 0) {
      /**
       * Set a known scale and draw line at y = 1 across chart. If scale is not
       * set, the line may appear at the very top of the chart because the
       * default behavior is to scale the data to give more context.
       */
      return [0, 100];
    }
    return [min, max];
  }, [data, minDataValue, maxDataValue]);

  const calcTooltipPosition = React.useMemo(() => {
    let x = 0,
      y = 0;

    if (tooltipRef.current) {
      const width = tooltipRef.current?.offsetWidth;
      const height = tooltipRef.current?.offsetHeight;
      x = customTooltipPos.x - width / 2;
      y = customTooltipPos.y - height;
    }
    return { x, y };
  }, [tooltipRef, customTooltipPos]);

  const onAreaMouseMove = (props: AreaMouseMoveProps) => {
    if (tooltipIsPortaled && activeDotRef.current) {
      // Get the global position from the window and use it to position the tooltip
      const bounds = activeDotRef.current.getBoundingClientRect();
      const x = bounds.x + bounds.width / 2;
      const y = bounds.y + bounds.height / 2;
      setCustomTooltipPos({ x, y });
    } else {
      const { points } = props;
      // Use the coordinates of the active dot as the tooltip's position
      if (activeTooltipIndex && points) {
        const coord = points[activeTooltipIndex];
        if (coord && 'x' in coord && 'y' in coord) {
          setCustomTooltipPos(coord);
        }
      }
    }
  };

  return (
    <ChartContainer fill={fill} stroke={stroke} strokeWidth={strokeWidth}>
      <ResponsiveContainer {...ResponsiveContainerProps}>
        <AreaChart
          data={chartData}
          margin={{
            top: 6,
            right: 0,
            bottom: 0,
            left: 0,
          }}
          onMouseMove={(props: AreaChartMouseMoveProps) => {
            const { activeTooltipIndex: index } = props;
            if (index) {
              setActiveTooltipIndex(index);
            }
          }}
          {...AreaChartProps}
        >
          <YAxis dataKey="value" domain={YAxisDomain} hide {...YAxisProps} />
          <RechartTooltip
            cursor={mouseOverChartArea && showCursor}
            content={
              <CustomTooltip
                ref={tooltipRef}
                show={mouseOverChartArea}
                usePortal={tooltipIsPortaled}
                icon={tooltipIcon}
                dataStringModifiers={tooltipDataStringModifiers}
              />
            }
            allowEscapeViewBox={{ x: true, y: true }}
            position={{
              x: calcTooltipPosition.x,
              y: calcTooltipPosition.y,
            }}
            {...TooltipProps}
          />
          {uniqueRefLines.map((linePlacement, i) => {
            if (data.length === 0 && !showReferenceLinesWithNoData) {
              return null;
            }
            let y = Number(linePlacement);
            if (typeof linePlacement === 'string') {
              switch (linePlacement) {
                case 'min':
                  y = minValue;
                  break;
                case 'max':
                  y = maxValue;
                  break;
                case 'mean':
                case 'avg':
                  y = averageValue;
                  break;
                case 'median':
                  y = medianValue;
                  break;
                case 'mode':
                  y = modeValue;
                  break;
                case 'range':
                  y = rangeValue;
                  break;
                default:
                  if (linePlacement.includes('%')) {
                    // Fallback to calculating the percentage
                    y = getMappedPercentage(linePlacement);
                  }
              }
            }
            if (isNaN(y)) return null;
            return (
              <ReferenceLine
                key={i}
                stroke={referenceLineColor}
                strokeDasharray={referenceLineDasharray}
                y={Number(y)}
                {...ReferenceLineProps}
              />
            );
          })}
          <Area
            type="monotone"
            dataKey="value"
            baseLine={100}
            strokeWidth={defaultStrokeWidth}
            fillOpacity={fillOpacity}
            fill={showArea ? defaultFill : fillTransparent}
            stroke={showLine ? strokeColor : fillTransparent}
            activeDot={
              <CustomizedActiveDot
                //@ts-ignore
                ref={activeDotRef}
                show={data.length > 0 && mouseOverChartArea}
                stroke={strokeColor}
                strokeWidth={defaultStrokeWidth}
                fill={defaultFill}
              />
            }
            isAnimationActive={data.length === 0 ? animateOnNoData : animate}
            onMouseOver={() => setMouseOverChartArea(true)}
            onMouseOut={() => setMouseOverChartArea(false)}
            //@ts-expect-error missed-matched types
            onMouseMove={onAreaMouseMove}
            {...AreaProps}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
