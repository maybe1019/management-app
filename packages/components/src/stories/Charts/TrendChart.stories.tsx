import React from 'react';
import { omit } from 'lodash';
import styled from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TrendChart } from '../../components';

const meta: ComponentMeta<typeof TrendChart> = {
  title: 'Charts/TrendChart',
  component: TrendChart,
};

const Container = styled.div`
  margin-top: 80px;
  margin-left: 80px;
  width: 360px;
  height: 118px;
`;

const buildData = (length: number, min: number, max: number) => {
  const diff = max - min;
  const _data = [];
  for (let i = length; i > 0; i--) {
    const val = Math.round(diff * Math.random());
    const timestamp = new Date().setDate(new Date().getDate() - i);
    _data.push({ timestamp, value: min + val });
  }
  return _data;
};

const Template: ComponentStory<typeof TrendChart> = args => (
  <Container>
    <TrendChart {...args} />
  </Container>
);

const data = buildData(30, 1, 100);
const smallerData = buildData(30, 1, 30);

const defaultProps = {
  fill: '',
  strokeWidth: 0,
  data,
  referenceLines: [0, 50, 100],
};

export const Default = Template.bind({});
Default.args = defaultProps;

export const NoAnimation = Template.bind({});
NoAnimation.args = {
  ...defaultProps,
  animate: false,
};

export const NoDataOrAnimation = Template.bind({});
NoDataOrAnimation.args = {
  ...omit(defaultProps, 'data'),
  animate: false,
  referenceLines: [0, 50, 100],
};

export const NoData = Template.bind({});
NoData.args = {
  ...omit(defaultProps, 'data'),
  referenceLines: [0, 50, 100],
};

export const WithBackground = Template.bind({});
WithBackground.args = {
  ...defaultProps,
  fill: '#b75dc9',
  stroke: '#118511',
  strokeWidth: 1,
};

export const LineChart = Template.bind({});
LineChart.args = {
  ...defaultProps,
  showArea: false,
};

export const AreaChart = Template.bind({});
AreaChart.args = {
  ...defaultProps,
  showLine: false,
};

export const AxisScaleToData = Template.bind({});
AxisScaleToData.args = {
  ...defaultProps,
  data: smallerData,
  minDataValue: 0,
  maxDataValue: 'auto',
  referenceLines: [0, '50%', '100%'],
};

export const FixedScale = Template.bind({});
FixedScale.args = {
  ...defaultProps,
  data: smallerData,
  minDataValue: 0,
  maxDataValue: 100,
};

export default meta;
