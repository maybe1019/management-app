import React from 'react';
import {
  getDefaultPaginatedResponse,
  AccessRole,
  rolesApi,
  ListRolesApiArg,
} from '@secberus/services';
import { useIsLoading } from '@secberus/utils';
import { useAdminPagination } from '../../access-policies/hooks/useAdminPagination';

export const useGetRolePage = () => {
  const [
    listRoles,
    { data = getDefaultPaginatedResponse<AccessRole>(), ...query },
  ] = rolesApi.useLazyListRolesQuery();

  const isLoading = useIsLoading([
    query.isLoading,
    query.isFetching,
    query.isUninitialized,
  ]);

  const {
    PaginationBuilder: PaginationComponent,
    page,
    limit,
    resetState,
  } = useAdminPagination({
    hideSelect: true,
    tableId: 'roles-list',
    limitProps: {
      page: data.cursor.page ?? 0,
      limit: data.cursor.limit ?? 10,
      total: data.cursor.total ?? 0,
      isLoading: isLoading,
    },
    navProps: {
      leftDisabled: isLoading || !data.cursor.page || data.cursor.page <= 1,
      rightDisabled:
        isLoading ||
        !data.cursor.page ||
        !data.cursor.pages ||
        data.cursor.page >= data.cursor.pages,
    },
    pages: data.cursor.pages,
  });

  const getRolesByPage = React.useCallback(
    async (data: ListRolesApiArg) => {
      if (!page || !limit) return;
      return await listRoles({
        ...data,
        page,
        limit,
      });
    },
    [listRoles, limit, page]
  );

  return {
    isLoading,
    data: data.results,
    getRolesByPage,
    page,
    limit,
    resetState,
    PaginationComponent,
  };
};
