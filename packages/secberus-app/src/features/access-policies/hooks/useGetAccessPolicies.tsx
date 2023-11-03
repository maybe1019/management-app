import React from 'react';
import {
  accessPoliciesApi,
  AccessPolicy,
  getDefaultPaginatedResponse,
  ListAccessPoliciesApiArg,
} from '@secberus/services';
import { useAdminPagination } from './useAdminPagination';

export const useGetAccessPolicies = () => {
  const [
    getAccessPolicies,
    {
      isLoading,
      isFetching,
      isUninitialized,
      data = getDefaultPaginatedResponse<AccessPolicy>(),
    },
  ] = accessPoliciesApi.useLazyListAccessPoliciesQuery();

  const getAccessPoliciesByPage = React.useCallback(
    async (data: ListAccessPoliciesApiArg) => getAccessPolicies(data),
    [getAccessPolicies]
  );

  const {
    PaginationBuilder: PaginationComponent,
    resetState,
    limit,
    page,
  } = useAdminPagination({
    tableId: 'accessPolicies',
    limitProps: {
      page: data.cursor.page ?? 0,
      limit: data.cursor.limit ?? 10,
      total: data.cursor.total ?? 0,
      isLoading: isLoading,
    },
    navProps: {
      leftDisabled:
        isLoading || isFetching || !data.cursor.page || data.cursor.page <= 1,
      rightDisabled:
        isLoading ||
        isFetching ||
        !data.cursor.page ||
        !data.cursor.pages ||
        data.cursor.page >= data.cursor.pages,
    },
    pages: data.cursor.pages,
  });

  return {
    isAccessPoliciesLoading: isLoading || isFetching || isUninitialized,
    getAccessPoliciesByPage,
    cursor: data.cursor,
    accessPolicies: data.results,
    PaginationComponent,
    resetState,
    limit,
    page,
  };
};
