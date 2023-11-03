import React from 'react';
import { Box } from '@chakra-ui/react';
import { RenderedSidebar } from '../../../sidebar-panel';
import { ErrorBoundary } from '../../../../utils/wrappers/ErrorBoundaries';
import { HandleItemClickProps, useBuildGroups } from './hooks/useBuildGroups';

/**
 * @description The actual sidebar and content of the data explorer.
 * Renders a filterable list of views, tables, and is capable of
 * accepting as many groups as necessary in the future.
 */
export function Screen({ handleItemClick }: HandleItemClickProps) {
  const { groups } = useBuildGroups({ handleItemClick });
  return (
    <Box width="100%" padding="0px 40px">
      <RenderedSidebar
        title="Data browser"
        backgroundColor="white"
        groups={groups}
      />
    </Box>
  );
}

export function DataBrowser({ handleItemClick }: HandleItemClickProps) {
  return (
    <ErrorBoundary height="100%" message="Something unexpected went wrong.">
      <Screen handleItemClick={handleItemClick} />
    </ErrorBoundary>
  );
}
