import React from 'react';
import { useDeepMemo } from '@secberus/utils';
import { explorerApi, secberusApi } from '@secberus/services';
import { useTabBar, Tabs2 } from '@secberus/components';
import { useParams } from 'react-router-dom';
import { ExplorerTable, QueryTable, ViewTable } from '../../list';
import { QUERY_TAB_KEY } from '../..';
import {
  DataExplorerResultsProps,
  KeyTypes,
} from '../types/DataExplorerResults.types';
import { DefaultRender } from '../components/DefaultRender';
import { useDataExplorerContext } from '../../../DataExplorerProvider';

export const useResultsHelper = ({
  closeTab,
  queryArgs,
  setQueryFocusCallback,
  activeTabs,
}: DataExplorerResultsProps) => {
  const { queryId } = useParams<{ queryId?: string }>();
  const { setTabState } = useDataExplorerContext();

  /**
   * @description parses the results of a view down to a basic
   * key value store where you can easily access view information
   * based upon an ID. Used for getting the title of a view tab,
   * but will be useful elsewhere once views can be saved or
   * updated.
   */
  const { data, ...listViewsQuery } = explorerApi.useListViewsQuery(
    {
      limit: 500,
    },
    {
      selectFromResult: ({ data, ...rest }) => {
        const resultList: Record<
          secberusApi.View['id'],
          Pick<secberusApi.View, 'name' | 'query'>
        > = {};
        if (data && data?.results?.length) {
          let cursor: secberusApi.View | undefined;
          for (let i = 0; i <= data?.results?.length - 1; i++) {
            cursor = data?.results?.[i];
            if (cursor?.id)
              resultList[cursor?.id] = {
                name: cursor?.name,
                query: cursor?.query,
              };
          }
        }
        return {
          data: resultList,
          ...rest,
        };
      },
    }
  );
  const [queryTab, setQueryTab] = React.useState<boolean>(false);
  const extendedCloseTab = React.useCallback(
    (id: string) => {
      if (id === QUERY_TAB_KEY) setQueryTab(false);
      else closeTab(id);
    },
    [closeTab]
  );
  /**
   * @description Active tabs managed based upon ids of views and names of
   * tables, upon closing will reset you to the query tab.
   */
  const tabs = useDeepMemo(() => {
    /**
     * @description Basically sets the query tab if the state
     * is set.
     */
    const queryTabOrEmpty: Tabs2 = queryTab
      ? {
          [QUERY_TAB_KEY]: {
            title: 'Query results',
            render: <QueryTable queryArgs={queryArgs} />,
            closeable: true,
            className: 'result-tab',
            onClick: () => {},
          },
        }
      : {};
    /**
     * @param type tables or view
     * @param title the name or ID of the tab
     * @description Gets the name of the applied tab based upon
     * data. In views, we don't have a way to pass the view name
     * through tabs, so this callback basically selects that data
     * from the selectFromResult hook above which massages the views
     * results into an easily-accessed-by-title name.
     */
    const getTitle = (type: KeyTypes, title: string) => {
      switch (type) {
        case 'tables':
          return title;
        case 'views':
          return data?.[title]?.name || title;
        default:
          return title;
      }
    };
    /**
     * @abstract I apologize for the rush here, but in order to get constant
     * and accurate data for views (since we have to run the provided query)
     * and tabs were not built to hold more than a title and id, I had to
     * add some helper functions and run the reduce method above from the
     * selectFromResult to create a key value record for these items.
     * Title has to act as an ID for views, as the ID itself is prepended
     * with a constant string to keep track of which is which.
     */
    if (!activeTabs) {
      return queryTabOrEmpty;
    }
    return activeTabs?.reduce((acc: Tabs2, { id, title, type }) => {
      acc[id] = {
        title: getTitle(type, title),
        render: (
          <>
            {type === 'tables' ? (
              <ExplorerTable tableId={title} />
            ) : (
              <ViewTable id={title} query={data?.[title]?.query} />
            )}
          </>
        ),
        className: 'result-tab',
        onClick: () => {},
      };
      return acc;
    }, queryTabOrEmpty);
  }, [activeTabs, queryArgs, data, queryTab]);

  const { TabBar, currentTab, setCurrentTab } = useTabBar({
    closeable: true,
    mode: 'light',
    tabs,
    defaultRender: <DefaultRender />,
    onTabClose: extendedCloseTab,
    tabWidth: 200,
  });
  /**
   * @description Custom functionality to wrap the setCurrentTab
   * effect from the Data Explorer which is eventually lifted via
   * state through to the query panel. This also lifts setting
   * the local query tabs open/closed state. It's not
   * a great solution, but since the query tab is the 'anchor'
   * point for all tabs on the results panel, it has special cases.
   */
  const extendedQueryFocusCallback = React.useCallback(
    (tabId: string) => {
      if (tabId === QUERY_TAB_KEY) {
        setQueryTab(true);
      }
      setCurrentTab(tabId);
    },
    [setCurrentTab]
  );
  /**
   * @name Set_Query_Focus_Callback_State
   * @description Lifts the queryFocusCallback from above in state
   * from the results panel to the query panel. The query panel
   * should set the current tab to the query tab when a query
   * is executed.
   */
  React.useEffect(() => {
    setQueryFocusCallback(() => extendedQueryFocusCallback);
  }, [extendedQueryFocusCallback, setQueryFocusCallback]);

  /**
   * @description Just parses the IDs of activeTabs into an easily
   * used array. More of a helper than required functionality
   */
  const activeTabIds = React.useMemo(
    () => Object.keys(tabs)?.map((id: string) => id),
    [tabs]
  );

  /**
   * @name No_Tab_Rescue_Effect If you close your current tab, or for
   * some reason your tab is no longer available, this hook will 'save' you
   * @description If you close your current tab, it will revert
   * you to the query tab, or the first tab in the list. The query tab retains
   * priority over other tabs.
   */
  React.useEffect(() => {
    if (activeTabIds?.length && activeTabIds.indexOf(currentTab) === -1) {
      setCurrentTab(
        activeTabIds?.indexOf(QUERY_TAB_KEY) === -1
          ? activeTabIds[0]
          : QUERY_TAB_KEY
      );
    }
  }, [currentTab, setCurrentTab, activeTabIds]);

  return {
    tabs,
    TabBar,
    currentTab,
    setCurrentTab,
    queryFocusCallback: extendedQueryFocusCallback,
    queryTab,
    setQueryTab,
    data,
    listViewsQuery,
    activeTabIds,
  };
};
