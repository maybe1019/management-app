import React from 'react';
import styled from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Label } from 'recharts';
import { theme } from '../../styles/theme';
import { DonutChart } from '../../components';

const Container = styled.div`
  width: 200px;
  height: 200px;
`;

export default {
  title: 'Charts/DonutChart',
  component: DonutChart,
} as ComponentMeta<typeof DonutChart>;

const Template: ComponentStory<typeof DonutChart> = args => (
  <Container>
    <DonutChart {...args} />
  </Container>
);

export const Default = Template.bind({});
Default.args = {
  data: [{ name: 'Cell', value: 81 }],
};

export const WithGradient = Template.bind({});
WithGradient.args = {
  data: [{ name: 'Cell', value: 81 }],
  colors: [
    [
      { offset: '0%', stopColor: '#10857e' },
      { offset: '50.57%', stopColor: '#39b68b' },
      { offset: '100%', stopColor: '#35b589' },
    ],
  ],
};

export const WithInnerLabel = Template.bind({});
WithInnerLabel.args = {
  data: [{ name: 'Cell', value: 81 }],
  InnerLabel: (
    <Label value="$600M" position="center" style={theme.typography.bold} />
  ),
};

export const MultiCell = Template.bind({});
MultiCell.args = {
  data: [
    { name: 'Cell 1', value: 81 },
    { name: 'Cell 2', value: 23 },
    { name: 'Cell 3', value: 14 },
    { name: 'Cell 4', value: 58 },
    { name: 'Cell 5', value: 99 },
  ],
  colors: theme.colors.blue,
};

export const MultiColor = Template.bind({});
MultiColor.args = {
  data: [
    { name: 'Cell 1', value: 81 },
    { name: 'Cell 2', value: 23 },
    { name: 'Cell 3', value: 14 },
    { name: 'Cell 4', value: 58 },
    { name: 'Cell 5', value: 99 },
  ],
  colors: [
    theme.colors.blue,
    [
      { offset: '0%', stopColor: '#10857e' },
      { offset: '50.57%', stopColor: '#39b68b' },
      { offset: '100%', stopColor: '#35b589' },
    ],
    theme.colors.purple,
    theme.colors.red,
    theme.colors.blue,
  ],
};

export const HalfDonut = Template.bind({});
HalfDonut.args = {
  data: [{ name: 'Cell', value: 81 }],
  startAngle: 180,
  endAngle: 0,
};
