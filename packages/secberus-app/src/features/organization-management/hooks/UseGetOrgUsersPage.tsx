import React from 'react';
import {
  organizationApi,
  GetOrgUsersApiArg,
  getDefaultPaginatedResponse,
  OrgUser,
} from '@secberus/services';
import { useAppPagination } from '../../../hooks/useAppPagination';

export const useGetOrgUsersPage = () => {
  const [
    getOrganizationUsers,
    { data = getDefaultPaginatedResponse<OrgUser>(), ...query },
  ] = organizationApi.useLazyGetOrgUsersQuery({});

  const fetchByPage = React.useCallback(
    async (data: GetOrgUsersApiArg) => getOrganizationUsers(data, true),
    [getOrganizationUsers]
  );

  const {
    PaginationBuilder: PaginationComponent,
    page,
    limit,
    resetState,
  } = useAppPagination({
    tableId: 'user-management-org-users',
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

  return {
    fetchByPage,
    page,
    limit,
    resetState,
    PaginationComponent,
    data: data.results,
    ...query,
  };
};
