import { secberusApiGW } from '../injections';

export const dataSourceTypeApi = secberusApiGW.enhanceEndpoints({
  endpoints: {
    listDatasourceTypes: {
      providesTags: ['DataSourceType', { type: 'DataSourceType', id: 'LIST' }],
    },
  },
});
