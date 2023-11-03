import React from 'react';
import { useIsLoading, createEnvAwareLogger } from '@secberus/utils';
import {
  userApi,
  ListUsersApiArg,
  User,
  getDefaultPaginatedResponse,
} from '@secberus/services';
import { useAdminPagination } from '../../access-policies/hooks/useAdminPagination';

const logger = createEnvAwareLogger();

export const useGetUsersPage = () => {
  const [
    listUsers,
    { data: users = getDefaultPaginatedResponse<User>(), ...listUsersQuery },
  ] = userApi.useLazyListUsersQuery({});

  const isUsersLoading = useIsLoading([
    listUsersQuery.isLoading,
    listUsersQuery.isFetching,
    listUsersQuery.isUninitialized,
  ]);

  const {
    PaginationBuilder: PaginationComponent,
    page,
    limit,
    resetState,
  } = useAdminPagination({
    tableId: 'users-list',
    limitProps: {
      page: users?.cursor?.page ?? 0,
      limit: users?.cursor?.limit ?? 10,
      total: users?.cursor?.total ?? 0,
      isLoading: isUsersLoading,
    },
    navProps: {
      leftDisabled:
        isUsersLoading || !users.cursor.page || users.cursor.page <= 1,
      rightDisabled:
        isUsersLoading ||
        !users.cursor.page ||
        !users.cursor.pages ||
        users.cursor.page >= users.cursor.pages,
    },
    pages: users.cursor.pages,
  });

  const getUsersByPage = React.useCallback(
    async (data: ListUsersApiArg) => {
      return await listUsers({
        ...data,
        page: page || undefined,
        limit: limit || undefined,
      });
    },
    [listUsers, limit, page]
  );

  React.useEffect(() => {
    if (listUsersQuery.isError) {
      logger.error(listUsersQuery.error);
    }
  }, [listUsersQuery]);

  return {
    isUsersLoading,
    getUsersByPage,
    page,
    users,
    PaginationComponent,
    resetState,
    limit,
  };
};
