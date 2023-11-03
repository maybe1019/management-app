import React from 'react';
import styled from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { RiskScoreWidget } from '../../components';

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

const meta: ComponentMeta<typeof RiskScoreWidget> = {
  title: 'Widgets/RiskScoreWidget',
  component: RiskScoreWidget,
  args: {
    score: 83,
    dataDurationText: '30d',
    trendData: buildData(30, 1, 80),
  },
};

const Container = styled.div`
  width: 360px;
  height: 118px;
`;

const Template: ComponentStory<typeof RiskScoreWidget> = args => (
  <Container>
    <RiskScoreWidget {...args} />
  </Container>
);

export const Default = Template.bind({});
Default.args = {
  score: 83,
};

export default meta;
