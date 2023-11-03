import React from 'react';
import produce from 'immer';
import {
  ActiveTabs,
  DeleteResultTab,
  HandleResultTabUpdate,
  QueryExplorerStatesContext,
  RecordActiveTabs,
  SetOrRemoveTab,
  SetTabAttributes,
} from './DataExplorerScreen.types';

export const DEFAULT_QUERY_ID = btoa('new_1');

export const DEFAULT_QUERY_TAB_DATA = {
  name: 'New query',
  query: '',
  currentTab: '',
  openTabs: {
    tables: [],
    views: [],
  },
  expandedBrowsers: {
    SEARCH_TABLES: false,
    SEARCH_VIEWS: false,
  },
  searchFilters: {
    tables: '',
    views: '',
  },
  attributes: {},
};

export const DataExplorerContext =
  React.createContext<QueryExplorerStatesContext>(undefined!);

// TODO: remove context debug displayName or find out if it's removed in production builds
DataExplorerContext.displayName = 'DataExplorerContext';

/**
 * @description Create query context states and maintain them internally
 * @param children
 * @constructor
 */
export const DataExplorerProvider: React.FC = ({ children }) => {
  const [activeResultsByQueryTabs, setActiveResultsByQueryTabs] =
    React.useState<RecordActiveTabs>({
      [DEFAULT_QUERY_ID]: DEFAULT_QUERY_TAB_DATA,
    });

  const getTabState = React.useCallback(
    (key?: string | null): ActiveTabs | null =>
      activeResultsByQueryTabs?.[key as string] ?? null,
    [activeResultsByQueryTabs]
  );

  const setTabState: HandleResultTabUpdate = React.useCallback((key, value) => {
    if (key) {
      setActiveResultsByQueryTabs(prevState =>
        produce(prevState, (draft: RecordActiveTabs) => {
          draft[key] = { ...draft[key], ...value };
        })
      );
    }
  }, []);

  const setTabAttributes: SetTabAttributes = React.useCallback(
    (key, attributes) => {
      if (key) {
        setActiveResultsByQueryTabs(prevState =>
          produce(prevState, (draft: RecordActiveTabs) => {
            draft[key].attributes = attributes;
          })
        );
      }
    },
    []
  );

  const deleteTabState: DeleteResultTab = React.useCallback(key => {
    setActiveResultsByQueryTabs(prevState =>
      produce(prevState, (draft: RecordActiveTabs) => {
        if (draft[key]) {
          delete draft[key];
        }
        return draft;
      })
    );
  }, []);

  const setOpenTabs: SetOrRemoveTab = React.useCallback(
    (queryId, id, keyType) => {
      const currentQueryId = queryId ?? DEFAULT_QUERY_ID;
      if (currentQueryId)
        setActiveResultsByQueryTabs(prevState => {
          const prevData = prevState[currentQueryId];

          return produce(prevState, draft => {
            draft[currentQueryId] = {
              ...prevData,
              currentTab: id,
              openTabs: {
                ...prevData.openTabs,
                [keyType]: [
                  ...new Set([...(prevData.openTabs?.[keyType] ?? []), id]),
                ],
              },
            };
          });
        });
    },
    []
  );

  const removeOpenTab: SetOrRemoveTab = React.useCallback(
    (queryId, id, keyType) => {
      setActiveResultsByQueryTabs(prevState => {
        if (!queryId) return prevState;
        const prevData = prevState[queryId];

        // Return previous state if invalid key type
        if (!(keyType in prevData?.openTabs)) {
          return prevState;
        }

        return produce(prevState, draft => {
          draft[queryId] = {
            ...prevData,
            currentTab: id,
            openTabs: {
              ...prevData.openTabs,
              [keyType]: prevData.openTabs?.[keyType]?.filter(
                val => val !== id
              ),
            },
          };
        });
      });
    },
    []
  );

  const contextValue = React.useMemo(
    () => ({
      tabStates: activeResultsByQueryTabs,
      getTabState,
      setTabState,
      deleteTabState,
      setOpenTabs,
      removeOpenTab,
      setTabAttributes,
    }),
    [
      activeResultsByQueryTabs,
      deleteTabState,
      getTabState,
      removeOpenTab,
      setOpenTabs,
      setTabState,
      setTabAttributes,
    ]
  );

  return (
    <>
      <DataExplorerContext.Provider value={contextValue}>
        {children}
      </DataExplorerContext.Provider>
    </>
  );
};

/**
 * Provides access to DataExplorerContext. Intended to be used in children of
 * DataExplorerProvider.
 */
export const useDataExplorerContext = () =>
  React.useContext(DataExplorerContext);

export const withDataExplorerContext = <P extends Record<string, unknown>>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  return props => (
    <DataExplorerProvider>
      <Component {...props} />
    </DataExplorerProvider>
  );
};
