/**
 * @author Duncan Pierce <duncan@secberus.com>
 * @description The overarching screen which contains the
 * data explorer as tabs. It uses the components built in this folder.
 * There are several callbacks in here which are extended or modified
 * locally by hooks. These are documented below
 * @see ../results/useResultsHelper.tsx
 */
import React from 'react';
import { PropertyNames, StyledSplitPane } from '@secberus/components';
import { Box } from '@chakra-ui/react';
import { useDeepMemo } from '@secberus/utils';
import { secberusApi_RunQueryApiArg } from '@secberus/services';
import { useParams } from 'react-router-dom';
import { DataBrowser, DataExplorerQuery, DataExplorerResults } from '../';
import { ErrorBoundary } from '../../../../utils/wrappers/ErrorBoundaries';
import { useDataExplorerContext } from '../../DataExplorerProvider';
import { DEFAULT_QUERY_ID } from '../../DataExplorerProvider';

export type ActiveTableViews = {
  tables: {
    [key: string]: boolean;
  };
  views: {
    [key: string]: boolean;
  };
};
export type KeyTypes = PropertyNames<ActiveTableViews>;

export type HandleItemClickArgs = {
  id: string;
  keyType: PropertyNames<ActiveTableViews>;
};

export type OpenTab = {
  id: string;
  title: string;
  type: HandleItemClickArgs['keyType'];
};

/**
 * @description The orchestrated and containing screen for the data explorer.
 * This screen will render based upon tab options for queries.
 */
function DataExplorerComponent() {
  const { queryId } = useParams<{ queryId?: string }>();
  const { getTabState, setOpenTabs, removeOpenTab } = useDataExplorerContext();
  const [queryArgs, setQueryArgs] = React.useState<
    secberusApi_RunQueryApiArg['sqlQuery']
  >({
    query: '',
    parameters: {},
  });
  const currentQueryId = queryId ?? DEFAULT_QUERY_ID;

  const tabState = React.useMemo(
    () => getTabState(currentQueryId),
    [getTabState, currentQueryId]
  );

  const [queryTabFocusCallback, setQueryTabFocusCallback] =
    React.useState<React.Dispatch<React.SetStateAction<string>>>();

  const builtResultTabs = useDeepMemo(
    () => [
      ...(tabState?.openTabs?.tables?.map(table => {
        return {
          id: table,
          title: table,
          type: 'tables',
        } as OpenTab;
      }) || []),
      ...(tabState?.openTabs?.views?.map(
        view =>
          ({
            id: view,
            title: view,
            type: 'views',
          } as OpenTab)
      ) || []),
    ],
    [tabState?.openTabs?.tables, tabState?.openTabs?.views]
  );

  const handleTabClose = React.useCallback(
    (key: string, ...args: any[]) => {
      const type = builtResultTabs.find(tab => tab.id === key)?.type;
      if (type) {
        removeOpenTab(currentQueryId, key, type);
      }
    },
    [builtResultTabs, currentQueryId, removeOpenTab]
  );

  return (
    <Box
      position="relative"
      background="white"
      height="calc(100vh - 152px)"
      width="100vw"
    >
      <StyledSplitPane
        separator
        minSize={300}
        defaultSizes={[416, 1024]}
        proportionalLayout
      >
        <StyledSplitPane.Pane preferredSize="28%">
          <Box
            position="relative"
            h="100%"
            className="left-pane-container"
            maxHeight="100%"
            overflowY="auto"
          >
            <DataBrowser
              handleItemClick={(id, keyType) => {
                setOpenTabs(queryId, id, keyType);
                queryTabFocusCallback?.(id);
              }}
            />
          </Box>
        </StyledSplitPane.Pane>
        <StyledSplitPane separator vertical defaultSizes={[4, 6]}>
          <Box
            position="relative"
            h="100%"
            className="left-pane-container"
            maxHeight="100%"
            overflowY="hidden"
          >
            <DataExplorerQuery
              setQueryFocus={queryTabFocusCallback}
              setQueryArg={setQueryArgs}
            />
          </Box>
          <Box
            position="relative"
            h="100%"
            className="left-pane-container"
            height="100%"
            maxHeight="100%"
          >
            <DataExplorerResults
              closeTab={handleTabClose}
              activeTabs={builtResultTabs}
              queryArgs={queryArgs}
              setQueryFocusCallback={setQueryTabFocusCallback}
            />
          </Box>
        </StyledSplitPane>
      </StyledSplitPane>
    </Box>
  );
}
export function DataExplorer() {
  return (
    <ErrorBoundary height="100%" message="Something unexpected went wrong.">
      <DataExplorerComponent />
    </ErrorBoundary>
  );
}
