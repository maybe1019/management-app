import React from 'react';
import { useIsLoading } from '@secberus/utils';
import {
  getDefaultPaginatedResponse,
  explorerApi,
  secberusApi_GetTableDataApiArg,
  secberusApi_GetTableDataApiResponse,
} from '@secberus/services';
import { useAppPagination } from '../../../hooks/useAppPagination';

export const useGetTableQuery = ({ tableId }: { tableId: string }) => {
  const [
    listTables,
    {
      data: table = getDefaultPaginatedResponse<secberusApi_GetTableDataApiResponse>(),
      ...listTableQuery
    },
  ] = explorerApi.useLazyGetTableDataQuery();

  const isLoading = useIsLoading([
    listTableQuery.isLoading,
    listTableQuery.isFetching,
    listTableQuery.isUninitialized,
  ]);

  const {
    PaginationBuilder: PaginationComponent,
    page,
    limit,
    resetState,
  } = useAppPagination({
    tableId,
    limitProps: {
      page: table?.cursor?.page ?? 0,
      limit: table?.cursor?.limit ?? 10,
      total: table?.cursor?.total ?? 0,
      isLoading: isLoading,
    },
    navProps: {
      leftDisabled: isLoading || !table.cursor.page || table.cursor.page <= 1,
      rightDisabled:
        isLoading ||
        !table.cursor.page ||
        !table.cursor.pages ||
        table.cursor.page >= table.cursor.pages,
    },
    pages: table.cursor.pages,
  });

  const [numericPage, numericLimit] = [
    page ? parseInt(page) : undefined,
    limit ? parseInt(limit) : undefined,
  ];

  const getTableDataByPage = React.useCallback(
    async (data: secberusApi_GetTableDataApiArg) => {
      return await listTables({
        ...data,
        page: numericPage || undefined,
        limit: numericLimit || undefined,
      });
    },
    [listTables, numericLimit, numericPage]
  );

  return {
    isLoading,
    getTableDataByPage,
    page: numericPage,
    PaginationComponent,
    resetState,
    limit: numericLimit,
    results: table.results ?? [],
  };
};
