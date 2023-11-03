import { secberusApi } from '../injections';

export const explorerApi = secberusApi.secberusApi.enhanceEndpoints({
  endpoints: {
    listSavedQueries: {
      providesTags: [
        'ExplorerQueries',
        { type: 'ExplorerQueries', id: 'LIST' },
      ],
    },
    saveQuery: {
      invalidatesTags: [{ type: 'ExplorerQueries', id: 'LIST' }],
    },
    runQuery: {
      extraOptions: {
        muteError: [400],
        maxRetries: 1,
      },
    },
    getSavedQuery: {
      providesTags: ['ExplorerQueries'],
      extraOptions: {
        muteError: [404],
        maxRetries: 0,
      },
    },
    editQuery: {
      invalidatesTags: ['ExplorerQueries'],
    },
    deleteQuery: {
      invalidatesTags: [{ type: 'ExplorerQueries', id: 'LIST' }],
    },
    getTableData: {
      providesTags: ['ExplorerTables'],
    },
    listTables: {
      providesTags: ['ExplorerTables', { type: 'ExplorerTables', id: 'LIST' }],
    },
    listViews: {
      providesTags: ['ExplorerViews', { type: 'ExplorerViews', id: 'LIST' }],
    },
    saveView: {
      invalidatesTags: [{ type: 'ExplorerViews', id: 'LIST' }],
    },
    getView: {
      providesTags: ['ExplorerViews'],
      extraOptions: {
        muteError: [404],
        maxRetries: 0,
      },
    },
    updateView: {
      invalidatesTags: ['ExplorerViews'],
    },
    deleteView: {
      invalidatesTags: [{ type: 'ExplorerViews', id: 'LIST' }],
    },
  },
});
