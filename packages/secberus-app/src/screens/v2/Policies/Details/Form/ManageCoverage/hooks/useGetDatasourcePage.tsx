import React from 'react';
import {
  Datasource,
  dataSourceApi,
  getDefaultPaginatedResponse,
} from '@secberus/services';
import { useAppPagination } from '../../../../../../../hooks/useAppPagination';

export const useGetDataSourcePage = () => {
  const [
    listDataSources,
    {
      data = getDefaultPaginatedResponse<Datasource>(),
      ...listDataSourcesQuery
    },
  ] = dataSourceApi.useLazyListDatasourcesQuery();

  const {
    PaginationBuilder: PaginationComponent,
    page,
    limit,
    resetState: resetPagination,
  } = useAppPagination({
    tableId: 'policy-coverage-data-sources-select-list',
    limitProps: {
      page: data.cursor.page ?? 0,
      limit: data.cursor.limit ?? 10,
      total: data.cursor.total ?? 0,
      isLoading: listDataSourcesQuery.isLoading,
    },
    navProps: {
      leftDisabled:
        listDataSourcesQuery.isLoading ||
        listDataSourcesQuery.isFetching ||
        !data.cursor.page ||
        data.cursor.page <= 1,
      rightDisabled:
        listDataSourcesQuery.isLoading ||
        listDataSourcesQuery.isFetching ||
        !data.cursor.page ||
        !data.cursor.pages ||
        data.cursor.page >= data.cursor.pages,
    },
  });

  const getDataSourcesByPage = React.useCallback(
    async data => {
      return await listDataSources({
        ...data,
        page: page || undefined,
        limit: limit || undefined,
      });
    },
    [limit, listDataSources, page]
  );

  return {
    isLoading: listDataSourcesQuery.isLoading,
    isFetching: listDataSourcesQuery.isFetching,
    getDataSourcesByPage,
    resetPagination,
    PaginationComponent,
    page,
    limit,
    data,
  };
};
