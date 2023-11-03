import React from 'react';
import styled from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AzureLight, GithubLight, LogosAws, LogosGcp } from '@secberus/icons';
import { IndicatorContainer, Text } from '../components';

export default {
  title: 'IndicatorContainer',
  component: IndicatorContainer,
} as ComponentMeta<typeof IndicatorContainer>;

const StoryContainer = styled.div`
  width: 550px;
`;
const IndicatorContent = styled.div`
  display: flex;
  gap: 35px;
  padding-bottom: 24px;
`;
const DSContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
`;

const Template: ComponentStory<typeof IndicatorContainer> = args => (
  <StoryContainer>
    <IndicatorContainer {...args} />
  </StoryContainer>
);

export const EmptyContentContainer = Template.bind({});

EmptyContentContainer.args = {
  header: 'Top risk by policy',
  minHeight: '200px',
};

export const DataSourceContainer = Template.bind({});

DataSourceContainer.args = {
  header: 'Data sources monitored',
  menuOptions: [
    {
      id: 'Manage data sources',
      name: 'Manage data sources',
    },
  ],
  children: (
    <IndicatorContent>
      <DSContainer>
        <LogosAws height={32} width={32} />
        <Text type="xsmall">104</Text>
      </DSContainer>
      <DSContainer>
        <AzureLight height={32} width={32} />
        <Text type="xsmall">22</Text>
      </DSContainer>
      <DSContainer>
        <LogosGcp height={32} width={32} />
        <Text type="xsmall">0</Text>
      </DSContainer>
      <DSContainer>
        <GithubLight height={32} width={32} />
        <Text type="xsmall">54</Text>
      </DSContainer>
    </IndicatorContent>
  ),
};
