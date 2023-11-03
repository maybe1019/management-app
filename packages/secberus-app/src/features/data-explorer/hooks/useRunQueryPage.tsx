import React from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import {
  getDefaultPaginatedResponse,
  explorerApi,
  secberusApi_RunQueryApiArg,
  secberusApi_RunQueryApiResponse,
} from '@secberus/services';
import { useAppPagination } from '../../../hooks/useAppPagination';

export const useRunQueryByPage = ({ tableId }: { tableId: string }) => {
  const [
    runQuery,
    {
      data: query = getDefaultPaginatedResponse<secberusApi_RunQueryApiResponse>(),
      ...runQueryQuery
    },
  ] = explorerApi.useRunQueryMutation();

  const isLoading = runQueryQuery.isLoading;

  const {
    PaginationBuilder: PaginationComponent,
    page,
    limit,
    resetState,
  } = useAppPagination({
    tableId,
    limitProps: {
      page: query?.cursor?.page ?? 0,
      limit: query?.cursor?.limit ?? 10,
      total: query?.cursor?.total ?? 0,
      isLoading: isLoading,
    },
    navProps: {
      leftDisabled:
        isLoading || !query?.cursor?.page || query?.cursor?.page <= 1,
      rightDisabled:
        isLoading ||
        !query?.cursor?.page ||
        !query?.cursor?.pages ||
        query?.cursor?.page >= query?.cursor?.pages,
    },
    pages: query?.cursor?.pages,
  });

  const [numericPage, numericLimit] = [
    page ? parseInt(page) : undefined,
    limit ? parseInt(limit) : undefined,
  ];

  const getQueryDataByPage = React.useCallback(
    async (data: secberusApi_RunQueryApiArg) => {
      return await runQuery({
        ...data,
        page: numericPage,
        limit: numericLimit,
      });
    },
    [runQuery, numericLimit, numericPage]
  );

  return {
    isLoading,
    getQueryDataByPage,
    page: numericPage,
    PaginationComponent,
    resetState,
    limit: numericLimit,
    results: query.results ?? [],
    errors: {
      error: runQueryQuery.error as FetchBaseQueryError,
      isError: runQueryQuery.isError,
    },
  };
};
