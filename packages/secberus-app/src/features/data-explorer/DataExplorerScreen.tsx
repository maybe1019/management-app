import React from 'react';
import { uniqueId } from 'lodash';
import { Box } from '@chakra-ui/react';
import {
  Tooltip,
  useTabBar,
  FullscreenModal,
  CustomIconTab,
} from '@secberus/components';
import { explorerApi, policiesApi2 } from '@secberus/services';
import { ThemeContext } from 'styled-components';
import {
  generatePath,
  Redirect,
  useHistory,
  useLocation,
  useParams,
} from 'react-router-dom';
import { PlusLight, FolderOpen } from '@secberus/icons';
import qs from 'query-string';
import { useDispatch } from 'react-redux';
import { Feature } from '../feature-flags/Feature.component';
import { useAppRedirect } from '../../utils/useAppRedirect';
import { ErrorBoundary } from '../../utils/wrappers/ErrorBoundaries';
import { useTypedSelector } from '../../store';
import { attributesActions, selectExplorerQuery } from '../attributes/slice';
import { DataExplorerPanel, DataExplorerWrapper } from './components/common';
import { DataExplorer } from './components';
import type { PathParams, CreateActiveTab } from './DataExplorerScreen.types';
import {
  DEFAULT_QUERY_ID,
  DEFAULT_QUERY_TAB_DATA,
  useDataExplorerContext,
} from './DataExplorerProvider';
import { dataExplorerPaths } from './routes';
import { isQueryNew } from './components/common/utils';
export function DataExplorerScreen() {
  // Context
  const dispatch = useDispatch();
  const { tabStates, setTabState, getTabState, deleteTabState } =
    useDataExplorerContext();
  const policyQuery = useTypedSelector(selectExplorerQuery);
  const theme = React.useContext(ThemeContext);
  const { search } = useLocation();
  const fromEditor = React.useMemo(() => {
    const { fromEditor } = qs.parse(search);
    // string true doesn't matter.
    return !!fromEditor;
  }, [search]);

  const isNewPolicy = React.useMemo(() => qs.parse(search), [search]);

  // Location handling
  const history = useHistory();
  const params = useParams<PathParams>();

  // Parameter stateful values
  const isNewQuery = !!isQueryNew(params?.queryId);
  const isPolicy = params?.viewType === 'policy';
  const isView = params?.viewType === 'view';

  // navigation and handlers
  const { navigateBack } = useAppRedirect();
  const [panelOpen, setPanelOpen] = React.useState<boolean>(false);

  // First load flag for redirect handling
  const [firstLoadComplete, setFirstLoadComplete] =
    React.useState<boolean>(false);

  // Get query information
  const { data, ...listSavedQueriesQuery } =
    explorerApi.useListSavedQueriesQuery({ limit: 500 });

  const [getQuery, getQueryQuery] = explorerApi.useLazyGetSavedQueryQuery();
  const [getView, getViewQuery] = explorerApi.useLazyGetViewQuery();
  const [getPolicy, getPolicyQuery] = policiesApi2.useLazyGetPolicyQuery();

  // isLoading states
  const isLoading =
    getQueryQuery.isLoading ||
    getQueryQuery.isFetching ||
    getViewQuery.isLoading ||
    getViewQuery.isFetching ||
    getPolicyQuery.isLoading ||
    getPolicyQuery.isFetching;

  // isError states
  const isError =
    (!getQueryQuery.isFetching && getQueryQuery.isError) ||
    (!getViewQuery.isFetching && getViewQuery.isError) ||
    (!getPolicyQuery.isFetching && getPolicyQuery.isError);

  // State handlers functions
  const handlePanelToggle = () => {
    setPanelOpen(prev => !prev);
  };

  /**
   * Clear explorer query for policy editor sync, assume user is aborting
   * policy creation. Let appRedirect handle navigation.
   */
  const handleModalClose = () => {
    dispatch(
      attributesActions.querySet({
        explorerQuery: '',
      })
    );
    navigateBack();
  };

  // Collect tabs from tabStates
  const TABS = Object.keys(tabStates).map(id => ({ id, ...tabStates[id] }));

  /**
   * Handles tab changes when user interacts with tabs. Sets the proper URL,
   * including appropriate search params depending on the values set in the tabStates.
   */
  const handleTabChange = React.useCallback(
    (tabKey: string) => {
      const tabType =
        tabStates?.[tabKey]?.attributes?.type?.toLowerCase() || 'query';
      const action = tabStates?.[tabKey]?.attributes?.action;

      const pushLocation = generatePath(
        dataExplorerPaths.dataExplorerManagement,
        {
          viewType: tabType,
          queryId: tabKey,
        }
      );

      history.push(
        `${pushLocation}${isNewPolicy && action ? `?action=${action}` : ''}`
      );
    },
    [history, isNewPolicy, tabStates]
  );

  const newQueryTab = React.useCallback(
    async (activeTab?: CreateActiveTab | 'BLANK') => {
      const createNewBlankTab = () => {
        const tabId = btoa(`new_${Number(uniqueId()) + 1}`);
        setTabState(tabId, DEFAULT_QUERY_TAB_DATA);
        handleTabChange(tabId);
        setFirstLoadComplete(true);
      };
      /**
       * @description I'm sorry Drew im tired lol. This adds the ability
       * to prevent repeated code to delete the default query ID if we're on
       * an initial load edit.
       */
      const deleteFirstTabOnFirstLoadEditMount = () => {
        if (!firstLoadComplete) {
          deleteTabState(DEFAULT_QUERY_ID);
          setFirstLoadComplete(true);
        }
      };
      if (activeTab === 'BLANK') {
        createNewBlankTab();
      } else if (activeTab?.name && !isPolicy && !isNewQuery) {
        /**
         * @description If this tab exists already and is a view or query
         * then we need to go ahead and populate that query information into
         * the tab. If it's not a view, we assume it's a query.
         */
        const res = isView
          ? await getView({
              id: activeTab?.name,
            })
          : await getQuery({ id: activeTab?.name });

        if (res?.data) {
          const isView = params?.viewType === 'view';
          const { id, name, query } = res.data;
          setTabState(id, {
            ...DEFAULT_QUERY_TAB_DATA,
            name,
            query,
            attributes: {
              type: isView ? 'VIEW' : 'QUERY',
            },
          });
          deleteFirstTabOnFirstLoadEditMount();
        }
      } else if (isPolicy && params?.queryId && !isNewQuery) {
        /**
         * @description If this is a policy, we need to set the policy info in
         * the initial tab state after requesting that policy.
         */
        const res = await getPolicy({
          id: params.queryId,
        });
        if (res?.data && !(res.data.id in tabStates)) {
          const { name, logic, query, id } = res.data;
          setTabState(id, {
            ...DEFAULT_QUERY_TAB_DATA,
            name,
            query: query || logic,
            attributes: {
              type: 'POLICY',
            },
          });
          deleteFirstTabOnFirstLoadEditMount();
        }
      } else if (isPolicy && !isNewPolicy && policyQuery) {
        /**
         * @description If this is a policy but is not a currently saved policy
         * we need to populate with the existing query from redux and create
         * a new blank tab for us to use.
         */
        const tabId = btoa(`new_${Number(uniqueId()) + 1}`);
        setTabState(tabId, {
          ...DEFAULT_QUERY_TAB_DATA,
          attributes: {
            type: 'POLICY',
          },
          query: policyQuery,
        });
        handleTabChange(tabId);
        deleteFirstTabOnFirstLoadEditMount();
      }
    },
    [
      isPolicy,
      isNewQuery,
      params.queryId,
      params?.viewType,
      isNewPolicy,
      policyQuery,
      setTabState,
      handleTabChange,
      firstLoadComplete,
      deleteTabState,
      isView,
      getView,
      getQuery,
      getPolicy,
      tabStates,
    ]
  );

  React.useEffect(() => {
    TABS.length === 0 && newQueryTab();
  }, [newQueryTab, TABS]);

  const { TabBar, setCurrentTab, currentTab } = useTabBar({
    closeable: TABS.length > 1,
    defaultRender: null,
    tabWidth: 200,
    onTabClick: key => {
      // Prevent unnecessary reload if tab key is the same
      if (currentTab !== key) {
        handleTabChange(key);
      }
    },
    onTabClose: key => {
      // Remove tab and set tab before last tab as active
      deleteTabState(key);
      const keys = Object.keys(tabStates);
      const lastTab = keys[keys.length - 1];

      if (lastTab === key) {
        handleTabChange(keys[keys.length - 2]);
      }
    },
    tabs: TABS.reduce((acc, { id, name }) => {
      acc[id] = {
        render: <DataExplorer key={`data_explorer_${id}`} />,
        title: name,
        className: 'query-tab',
      };
      return acc;
    }, {} as Record<string, any>),
    customTabs: [
      <CustomIconTab
        data-tip="New query"
        data-for="newquery"
        onClick={() => newQueryTab('BLANK')}
      >
        <PlusLight width="24px" height="24px" />
      </CustomIconTab>,
      <Feature name="data-explorer-rev1">
        <CustomIconTab
          data-tip="Open existing"
          data-for="openexisting"
          onClick={handlePanelToggle}
        >
          <FolderOpen height="24px" width="24px" />
        </CustomIconTab>
      </Feature>,
    ],
  });

  React.useEffect(() => {
    const { queryId } = params;
    const defaultTabState = getTabState(DEFAULT_QUERY_ID);
    if (
      isNewPolicy &&
      !queryId &&
      !Object.prototype.hasOwnProperty.call(
        defaultTabState?.attributes ?? {},
        'type'
      )
    ) {
      // ...setTabState(queryId, {});
      setTabState(DEFAULT_QUERY_ID, {
        attributes: {
          action: 'new_policy',
          type: 'POLICY',
        },
      });
    }
  }, [getTabState, params, isNewPolicy, setTabState]);

  React.useEffect(() => {
    const { queryId } = params;
    if (fromEditor) {
      /**
       * @description If from explorer then ship it.
       */
      newQueryTab();
    } else if (queryId && queryId in tabStates && currentTab !== queryId) {
      // Set the current tab based on the url
      setCurrentTab(queryId);
    } else if (
      queryId &&
      !(queryId in tabStates) &&
      !isLoading &&
      getQueryQuery?.data?.id !== queryId
    ) {
      // Create new tab with provided query id
      newQueryTab({
        name: queryId,
      });
    }
  }, [
    currentTab,
    getQueryQuery?.data?.id,
    isPolicy,
    isLoading,
    isError,
    newQueryTab,
    fromEditor,
    params,
    setCurrentTab,
    tabStates,
  ]);

  if (
    !params?.queryId &&
    params?.queryId !== DEFAULT_QUERY_ID &&
    getQueryQuery.isUninitialized &&
    isNewQuery &&
    !firstLoadComplete
  ) {
    /**
     * @description Redirects the user to the default 'new' tab on a refresh
     * if the tab is denoted as 'new', or there is no queryId
     */
    return (
      <Redirect
        to={`${dataExplorerPaths.dataExplorer}/query/${DEFAULT_QUERY_ID}`}
      />
    );
  }

  return (
    <FullscreenModal
      title="Data explorer"
      isLoading={listSavedQueriesQuery.isLoading}
      onClose={handleModalClose}
      tag="beta"
    >
      <Box w="100%" backgroundColor="red">
        <Box pt="24px" backgroundColor={theme.colors['light-gray']}>
          <DataExplorerWrapper>{TabBar}</DataExplorerWrapper>
          <Tooltip id="newquery" place="bottom" />
          <Tooltip id="openexisting" place="bottom" />
        </Box>
      </Box>
      <Feature name="data-explorer-rev1">
        <DataExplorerPanel onClose={handlePanelToggle} isVisible={panelOpen} />
      </Feature>
    </FullscreenModal>
  );
}

const WithBoundary = () => (
  <ErrorBoundary height="100%" message="Something unexpected went wrong.">
    <Feature name="data-explorer">
      <DataExplorerScreen />
    </Feature>
  </ErrorBoundary>
);

export default WithBoundary;
