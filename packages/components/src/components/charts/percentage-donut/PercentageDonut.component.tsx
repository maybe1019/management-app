import React from 'react';
import { Label } from 'recharts';
import { theme } from '../../../styles/theme';
import {
  DonutChart,
  DonutChartProps,
  DonutColorGradientStop,
} from '../donut-chart';
import { GradientsMain } from '../../../types';
import { PercentageDonutProps } from './PercentageDonut.types';

const GRADIENTS: Record<
  Extract<GradientsMain, 'purple' | 'red' | 'orange' | 'green'>,
  DonutColorGradientStop
> = {
  purple: [
    { offset: '0%', stopColor: '#8E01B0' },
    { offset: '50.4%', stopColor: '#B41EFF' },
    { offset: '100%', stopColor: '#CE6DFF' },
  ],
  red: [
    { offset: '0%', stopColor: '#DB1B2E' },
    { offset: '52.6%', stopColor: '#DC3545' },
    { offset: '100%', stopColor: '#FF8087' },
  ],
  orange: [
    { offset: '0%', stopColor: '#F1853B' },
    { offset: '50%', stopColor: '#F49B3E' },
    { offset: '100%', stopColor: '#FFC385' },
  ],
  green: [
    { offset: '0%', stopColor: '#10857e' },
    { offset: '50.57%', stopColor: '#39b68b' },
    { offset: '100%', stopColor: '#35b589' },
  ],
};

/**
 * PercentageDonut makes it easy to use the DonutChart to display a simple
 * percentage with a label in the center.
 *
 * @param percent - the percentage as a number (negative allowed if allowNegativeValue set to true)
 * @param textType - same type as on Text component (i.e.: "regular", "small-bold", etc.)
 * @param textDark - whether the text is over dark background or not
 * @param useGradientColors - whether to use solid or gradient colors
 * @param showPercentText - show the label or not
 * @param showPercentSign - show the percentage sign or not
 * @param animate - allow animations or not
 * @param allowNegativeValue - whether to animate and show a negative percentage
 * @param ComponentPropOverrides - Override the underlying components. In this case the DonutChart
 * @constructor
 */
export const PercentageDonut: React.FC<PercentageDonutProps> = ({
  percent = 0,
  textType = 'bold',
  textDark = false,
  useGradientColors = false,
  showPercentText = true,
  showPercentSign = true,
  animate = true,
  allowNegativeValue = false,
  ComponentPropOverrides,
}) => {
  const { DonutChart: DonutChartProps } = ComponentPropOverrides || {};
  const data = React.useMemo(() => {
    let target = percent;
    let remainder = 100 - target;

    if (target < 0 && !allowNegativeValue) {
      target = 0;
      remainder = 0;
    }

    return [{ value: target }, { value: remainder }];
  }, [percent, allowNegativeValue]);

  const colorArray = React.useMemo(() => {
    const colors: DonutChartProps['colors'] = [
      useGradientColors ? GRADIENTS.purple : theme.colors.purple,
      theme.colors.transparent,
    ];

    if (percent > 75) {
      colors[0] = useGradientColors ? GRADIENTS.green : theme.colors.green;
    } else if (percent > 50) {
      colors[0] = useGradientColors ? GRADIENTS.orange : theme.colors.orange;
    } else if (percent > 25) {
      colors[0] = useGradientColors ? GRADIENTS.red : theme.colors.red;
    }

    return colors;
  }, [percent, useGradientColors]);

  const renderLabel = () => {
    if (!showPercentText) return undefined;
    return (
      <Label
        value={`${percent}${showPercentSign ? '%' : ''}`}
        position="center"
        style={{
          ...theme.typography[textType],
          fill: theme.colors[textDark ? 'medium-gray' : 'dark'],
        }}
      />
    );
  };

  return (
    <DonutChart
      data={data}
      animate={animate}
      colors={colorArray}
      InnerLabel={renderLabel()}
      {...DonutChartProps}
    />
  );
};
