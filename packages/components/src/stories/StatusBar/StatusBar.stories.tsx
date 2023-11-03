import React from 'react';
import styled from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ProgressBar } from '../../components';

const Container = styled.div`
  width: 264px;
`;

export default {
  title: 'Status/Status',
  component: ProgressBar,
} as ComponentMeta<typeof ProgressBar>;

const Template: ComponentStory<typeof ProgressBar> = args => (
  <Container>
    <ProgressBar {...args} />
  </Container>
);

export const GreenStatus = Template.bind({});
GreenStatus.args = {
  percent: '38%',
  barBackground: 'green',
  progressBackground: 'medium-gray',
};
