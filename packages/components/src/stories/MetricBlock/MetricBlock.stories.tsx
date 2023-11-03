import React from 'react';
import styled from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TrendChart } from '../../components';

import { MetricBlock } from '../../components';

const Container = styled.div`
  width: 264px;
`;

const TrendContainer = styled.div`
  width: 100%;
  height: 45px;
`;

const TooltipContainer = styled.div`
  // TODO: fix tooltip clipping issue in storybook demo
  min-width: 50vw;
  min-height: 50vh;
`;

const buildData = (length: number, min: number, max: number) => {
  const diff = max - min;
  const _data = [];
  for (let i = length; i > 0; i--) {
    const val = Math.round(diff * Math.random());
    // Calculates a date from length (default 30 days) up to yesterday's date
    const timestamp = new Date().setDate(new Date().getDate() - i);
    _data.push({ timestamp, value: min + val });
  }
  return _data;
};

const data = buildData(30, 35, 100);

const calculateTrend = (startValue: number, endValue: number) => {
  const diff = startValue - endValue;
  return (diff / startValue) * 100 * -1;
};

export default {
  title: 'MetricBlock/MetricBlock',
  component: MetricBlock,
} as ComponentMeta<typeof MetricBlock>;

const Template: ComponentStory<typeof MetricBlock> = args => (
  <Container>
    <MetricBlock {...args} />
  </Container>
);

const WithChartTemplate: ComponentStory<typeof MetricBlock> = args => (
  <>
    <TooltipContainer id="tooltip">
      <Container>
        <MetricBlock {...args}>
          <TrendContainer>
            <TrendChart
              animate={false}
              data={data}
              minDataValue={0}
              maxDataValue={100}
              useTooltipPortal
            />
          </TrendContainer>
        </MetricBlock>
      </Container>
      <p>
        Tooltip may not work as expected in demo, but works (not clipped) in app
      </p>
    </TooltipContainer>
  </>
);

export const LoadingMetricBlock = Template.bind({});
LoadingMetricBlock.args = {
  header: 'Violations',
  isLoading: true,
};

export const EmptyMetricBlock = Template.bind({});
EmptyMetricBlock.args = {
  header: 'Violations',
  hasColor: true,
};

export const ZeroValueMetricBlock = Template.bind({});
ZeroValueMetricBlock.args = {
  header: 'Violations',
  count: 0,
  trend: 0,
  hasColor: true,
};

export const WithValueMetricBlock = Template.bind({});

WithValueMetricBlock.args = {
  header: 'Violations',
  count: 14423,
  trend: -10,
  hasColor: true,
};

export const WithTrendChart = WithChartTemplate.bind({});

WithTrendChart.args = {
  header: 'Violations',
  count: 14423,
  trend: ((): number => {
    return calculateTrend(data[0].value, data[data.length - 1].value);
  })(),
  hasColor: true,
};
