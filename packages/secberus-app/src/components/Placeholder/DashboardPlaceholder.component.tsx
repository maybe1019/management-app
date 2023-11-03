import React from 'react';
import styled from 'styled-components';
import { Text, Button } from '@secberus/components';
import { useHistory } from 'react-router-dom';
import { GridItem } from '@chakra-ui/layout';
import { EmptyStateSVG } from './Placeholder.svg';

const PlaceholderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  margin-top: 80px;
`;

const PlaceholderMessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  height: calc(100% - 250px);
  & > svg {
    width: 100%;
    margin-bottom: 16px;
  }
`;

const actions = {
  datasources: {
    message: 'Looks like there are no data sources...',
    href: '/settings/data-sources',
    label: 'Add data source',
  },
  policies: {
    message: 'Looks like there are no policies enabled...',
    href: '/policies',
    label: 'Subscribe to policies',
  },
  frameworks: {
    message: 'Looks like there are no frameworks enabled...',
    href: '/frameworks',
    label: 'Enable frameworks',
  },
};

export const DashboardPlaceholder: React.FC<{
  missingType: keyof typeof actions;
}> = ({ missingType }) => {
  const history = useHistory();
  return (
    <GridItem colSpan={5} rowSpan={15}>
      <PlaceholderWrapper>
        <PlaceholderMessageWrapper>
          <EmptyStateSVG />
          <Text type="small" color="gray">
            {actions[missingType].message}
          </Text>
          <Button onClick={() => history.push(actions[missingType].href)}>
            {actions[missingType].label}
          </Button>
        </PlaceholderMessageWrapper>
      </PlaceholderWrapper>
    </GridItem>
  );
};
