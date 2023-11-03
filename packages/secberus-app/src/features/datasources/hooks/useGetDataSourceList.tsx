import React from 'react';
import {
  dataSourceApi,
  ListDatasourcesApiArg,
  getDefaultPaginatedResponse,
  Datasource,
} from '@secberus/services';
import { createEnvAwareLogger } from '@secberus/utils';
import { useAppPagination } from '../../../hooks/useAppPagination';

const logger = createEnvAwareLogger();

export const useGetDataSourceList = (tableId: string) => {
  const [
    listDataSources,
    {
      data: dataSources = getDefaultPaginatedResponse<Datasource>(),
      ...listDatasourcesQuery
    },
  ] = dataSourceApi.useLazyListDatasourcesStatusQuery();

  const getDataSourcesByPage = React.useCallback(
    async (data: ListDatasourcesApiArg) => listDataSources(data),
    [listDataSources]
  );

  const {
    PaginationBuilder: PaginationComponent,
    page,
    limit,
    resetState,
  } = useAppPagination({
    tableId,
    limitProps: {
      page: dataSources.cursor.page ?? 0,
      limit: dataSources.cursor.limit ?? 10,
      total: dataSources.cursor.total ?? 0,
      isLoading: listDatasourcesQuery.isLoading,
    },
    navProps: {
      leftDisabled:
        listDatasourcesQuery.isLoading ||
        listDatasourcesQuery.isFetching ||
        !dataSources.cursor.page ||
        dataSources.cursor.page <= 1,
      rightDisabled:
        listDatasourcesQuery.isLoading ||
        listDatasourcesQuery.isFetching ||
        !dataSources.cursor.page ||
        !dataSources.cursor.pages ||
        dataSources.cursor.page >= dataSources.cursor.pages,
    },
    pages: dataSources.cursor.pages,
  });

  React.useEffect(() => {
    if (listDatasourcesQuery.isError) {
      logger.error(listDatasourcesQuery.error);
    }
  }, [listDatasourcesQuery.error, listDatasourcesQuery.isError]);

  return {
    isUninitialized: listDatasourcesQuery.isUninitialized,
    isLoading: listDatasourcesQuery.isLoading,
    isFetching: listDatasourcesQuery.isFetching,
    getDataSourcesByPage,
    page,
    limit,
    resetState,
    PaginationComponent,
    dataSources,
  };
};
