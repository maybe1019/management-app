import { secberusApiGW } from '../injections';

export const dataSourceApi = secberusApiGW.enhanceEndpoints({
  endpoints: {
    createDatasource: {
      invalidatesTags: [{ type: 'DataSource', id: 'LIST' }],
    },
    getDatasource: {
      providesTags: ['DataSource'],
    },
    listDatasources: {
      providesTags: ['DataSource', { type: 'DataSource', id: 'LIST' }],
    },
    updateDatasource: {
      invalidatesTags: ['DataSource'],
    },
    deleteDatasource: {
      invalidatesTags: [{ type: 'DataSource', id: 'LIST' }],
    },
    githubInstallation: {
      invalidatesTags: ['DataSource'],
    },
    listDatasourcesByRisk: {
      providesTags: ['DataSource', { type: 'DataSource', id: 'LIST' }],
    },
    getDatasourceSummary: {
      providesTags: ['DataSource'],
    },
    getDatasourceResources: {
      providesTags: ['DataSource'],
    },
    listDatasourcesStatus: {
      providesTags: ['DataSource', { type: 'DataSource', id: 'LIST' }],
    },
  },
});
