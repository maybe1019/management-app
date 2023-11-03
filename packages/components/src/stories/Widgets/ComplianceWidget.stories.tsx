import React from 'react';
import styled from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ComplianceWidget } from '../../components';

const meta: ComponentMeta<typeof ComplianceWidget> = {
  title: 'Widgets/ComplianceWidget',
  component: ComplianceWidget,
};

const StoryContainer = styled.div`
  width: 360px;
  min-height: 144px;
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

const Template: ComponentStory<typeof ComplianceWidget> = args => (
  <StoryContainer>
    <ComplianceWidget {...args} />
  </StoryContainer>
);

export const Default = Template.bind({});
Default.args = {
  title: 'Compliance',
  compliance: 83,
  trendData: buildData(30, 1, 80),
  dataDurationText: '30d',
};

export default meta;
