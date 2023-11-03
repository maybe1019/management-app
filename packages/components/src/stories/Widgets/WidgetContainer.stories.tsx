import React from 'react';
import styled from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Text, WidgetContainer } from '../../components';

const meta: ComponentMeta<typeof WidgetContainer> = {
  title: 'Widgets/WidgetContainer',
  component: WidgetContainer,
};

const StoryContainer = styled.div`
  width: 360px;
  min-height: 144px;
`;

const Template: ComponentStory<typeof WidgetContainer> = args => (
  <StoryContainer>
    <WidgetContainer {...args} />
  </StoryContainer>
);

export const Default = Template.bind({});
Default.args = {
  title: 'Widget Container',
};

export const WithTooltip = Template.bind({});
WithTooltip.args = {
  title: 'Widget Container',
  showTooltip: true,
  tooltipText: 'This is the tooltip text',
};

export const WithComponentRight = Template.bind({});
WithComponentRight.args = {
  title: 'Widget Container',
  componentRight: (
    <Text className="trend-text" type="xsmall-bold" color="gray">
      30d
    </Text>
  ),
};

export const KitchenSinkExample = Template.bind({});
KitchenSinkExample.args = {
  title: 'Widget Container',
  showTooltip: true,
  tooltipText: 'This is the tooltip text',
  componentRight: (
    <Text className="trend-text" type="xsmall-bold" color="gray">
      text
    </Text>
  ),
};

export default meta;
