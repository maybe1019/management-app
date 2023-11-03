import {
  Datasource,
  getDefaultPaginatedResponse,
  policiesApi,
} from '@secberus/services';
import { createEnvAwareLogger } from '@secberus/utils';
import React from 'react';
import { useAppPagination } from '../../../../../../hooks/useAppPagination';

const logger = createEnvAwareLogger();

export const useGetPolicyDatasources = (tableId: string) => {
  const [
    listPolicyDataSources,
    {
      data: policyDataSources = getDefaultPaginatedResponse<Datasource>(),
      ...listPolicyDataSourcesQuery
    },
  ] = policiesApi.useLazyListPolicyDatasourcesQuery();

  const getPolicyDataSourcesByPage = React.useCallback(
    async data =>
      await listPolicyDataSources({
        ...data,
      }),
    [listPolicyDataSources]
  );

  React.useEffect(() => {
    if (listPolicyDataSourcesQuery.isError) {
      logger.error(listPolicyDataSourcesQuery.error);
    }
  }, [listPolicyDataSourcesQuery.error, listPolicyDataSourcesQuery.isError]);

  const {
    PaginationBuilder: PaginationComponent,
    page,
    limit,
    resetState,
  } = useAppPagination({
    tableId: tableId,
    limitProps: {
      page: policyDataSources.cursor.page ?? 0,
      limit: policyDataSources.cursor.limit ?? 10,
      total: policyDataSources.cursor.total ?? 0,
      isLoading: listPolicyDataSourcesQuery.isLoading,
    },
    navProps: {
      leftDisabled:
        listPolicyDataSourcesQuery.isLoading ||
        listPolicyDataSourcesQuery.isFetching ||
        !policyDataSources.cursor.page ||
        policyDataSources.cursor.page <= 1,
      rightDisabled:
        listPolicyDataSourcesQuery.isLoading ||
        listPolicyDataSourcesQuery.isFetching ||
        !policyDataSources.cursor.page ||
        !policyDataSources.cursor.pages ||
        policyDataSources.cursor.page >= policyDataSources.cursor.pages,
    },
  });

  return {
    isUninitialized: listPolicyDataSourcesQuery.isUninitialized,
    isLoading: listPolicyDataSourcesQuery.isLoading,
    isFetching: listPolicyDataSourcesQuery.isFetching,
    getPolicyDataSourcesByPage,
    page,
    limit,
    resetState,
    PaginationComponent,
    policyDataSources,
  };
};
