// @ts-nocheck
import { ErrorBoundary } from '@sentry/react';
import React from 'react';
import { Box } from '@chakra-ui/react';
import { StyledSplitPane } from '@secberus/components';

export function DataWarehouse() {
  return (
    <>
      <Box w="100%">
        <StyledSplitPane
          preferredSize="80%"
          minSize={300}
          allowResize
          split="vertical"
        >
          <StyledSplitPane preferredSize="50%" split="horizontal">
            <Box margin="8px">Querying (to be built)</Box>
            <Box margin="8px">Results (to be built)</Box>
          </StyledSplitPane>
          <Box margin="8px">Data Visualizer (to be built)</Box>
        </StyledSplitPane>
      </Box>
    </>
  );
}

const WithBoundary = () => (
  <ErrorBoundary>
    <DataWarehouse />
  </ErrorBoundary>
);

export default WithBoundary;
