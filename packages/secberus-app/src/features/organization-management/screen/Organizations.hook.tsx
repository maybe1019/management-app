import React from 'react';
import {
  organizationApi,
  ListOrgsApiArg,
  getDefaultPaginatedResponse,
  Org,
} from '@secberus/services';
import { useAdminPagination } from '../../access-policies/hooks/useAdminPagination';

export const useGetOrgPage = () => {
  const [listOrgs, { data = getDefaultPaginatedResponse<Org>(), ...query }] =
    organizationApi.useLazyListOrgsQuery({});

  const {
    PaginationBuilder: PaginationComponent,
    page,
    limit,
    resetState,
  } = useAdminPagination({
    hideSelect: true,
    tableId: 'orgs-list',
    limitProps: {
      page: data.cursor.page ?? 0,
      limit: data.cursor.limit ?? 10,
      total: data.cursor.total ?? 0,
      isLoading: query.isLoading,
    },
    navProps: {
      leftDisabled:
        query.isLoading ||
        query.isFetching ||
        !data.cursor.page ||
        data.cursor.page <= 1,
      rightDisabled:
        query.isLoading ||
        query.isFetching ||
        !data.cursor.page ||
        !data.cursor.pages ||
        data.cursor.page >= data.cursor.pages,
    },
    pages: data.cursor.pages,
  });

  const getOrgsByPage = React.useCallback(
    async (data: ListOrgsApiArg) => {
      if (!page || !limit) return;
      return await listOrgs({
        ...data,
        page,
        limit,
      });
    },
    [listOrgs, limit, page]
  );

  return {
    data: data.results,
    getOrgsByPage,
    page,
    limit,
    resetState,
    PaginationComponent,
    ...query,
  };
};
