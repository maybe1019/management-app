import React from 'react';
import styled from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PercentageDonut, Text } from '../../components';

const DonutContainer = styled.div`
  margin-bottom: 60px;
  width: 80px;
  height: 80px;
`;

export default {
  title: 'Charts/PercentageDonut',
  component: PercentageDonut,
} as ComponentMeta<typeof PercentageDonut>;

const Template: ComponentStory<typeof PercentageDonut> = args => (
  <div>
    <DonutContainer>
      <PercentageDonut {...args} />
    </DonutContainer>
    <Text type="small-regular" color="green">
      100% - 76% green
    </Text>
    <Text type="small-regular" color="blue">
      75% - 51% blue
    </Text>
    <Text type="small-regular" color="purple">
      50% - 26% purple
    </Text>
    <Text type="small-regular" color="red">
      25% - 0% red
    </Text>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  percent: 68,
};

export const WithGradient = Template.bind({});
WithGradient.args = {
  percent: 68,
  useGradientColors: true,
};

export const AllowNegativePercent = Template.bind({});
AllowNegativePercent.args = {
  percent: -15,
  allowNegativeValue: true,
};
