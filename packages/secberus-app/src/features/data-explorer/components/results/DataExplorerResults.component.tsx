import React from 'react';
import styled from 'styled-components';
import { ErrorBoundary } from '../../../../utils/wrappers/ErrorBoundaries';
import { DataExplorerResultsProps } from './types/DataExplorerResults.types';
import { useResultsHelper } from './hooks/useResultsHelper';
export const QUERY_TAB_KEY = '___QUERY__QUERY_TAB';

/**
 * @description Container for the tabbar that applies styling to the empty load
 * states as well as generalized container capabilities.
 */
const TabContainer = styled.div<{ tabsExist: boolean }>`
  height: 100%;
  * .pagination-container {
    width: 100%;
    background: ${({ theme }) => theme.colors.white};
  }
  .tabbar-container {
    padding-top: 24px;
    min-height: 72px;
    max-height: 72px;
    overflow-x: auto;
    position: sticky;
    top: 0px;
    left: 0px;
    z-index: 1;
    ${({ tabsExist }) => (!tabsExist ? { display: 'none' } : {})}
    .result-tab {
      span {
        font-weight: 600;
      }
    }
  }
  .default-container {
    display: flex;
    align-items: center;
    .empty-data-table-container {
      align-items: center;
      .empty-data-table-content {
        margin-top: 0px;
      }
    }
  }
`;

/**
 * @description The result panel for the data explorer where Tables will
 * render. This will render views, query results, and tables.
 */
export function DataExplorerResultsComponent({
  activeTabs,
  closeTab,
  queryArgs,
  setQueryFocusCallback,
}: DataExplorerResultsProps) {
  const { TabBar, activeTabIds, queryTab, setQueryTab } = useResultsHelper({
    activeTabs,
    closeTab,
    queryArgs,
    setQueryFocusCallback,
  });
  return (
    <TabContainer tabsExist={!!activeTabIds?.length}>{TabBar}</TabContainer>
  );
}

export function DataExplorerResults(props: DataExplorerResultsProps) {
  return (
    <ErrorBoundary
      height="100%"
      message="Something unexpected went wrong trying to show results."
    >
      <DataExplorerResultsComponent {...props} />
    </ErrorBoundary>
  );
}
