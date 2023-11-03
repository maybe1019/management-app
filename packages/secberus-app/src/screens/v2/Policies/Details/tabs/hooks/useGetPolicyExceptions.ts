import React from 'react';
import {
  Exception,
  exceptionsApi,
  getDefaultPaginatedResponse,
  ListPolicyExceptionsApiArg,
} from '@secberus/services';
import { createEnvAwareLogger } from '@secberus/utils';
import { useAppPagination } from '../../../../../../hooks/useAppPagination';

const logger = createEnvAwareLogger();

export const useGetExceptionPage = () => {
  const [
    getExceptions,
    {
      data: exceptions = getDefaultPaginatedResponse<Exception>(),
      ...listPolicyExceptionsQuery
    },
  ] = exceptionsApi.useLazyListPolicyExceptionsQuery();

  const getExceptionsByPage = React.useCallback(
    async (data: ListPolicyExceptionsApiArg) => getExceptions(data),
    [getExceptions]
  );

  const {
    PaginationBuilder: PaginationComponent,
    page,
    limit,
    resetState,
  } = useAppPagination({
    tableId: 'policy-exceptions',
    hideSelect: true,
    limitProps: {
      page: exceptions.cursor.page ?? 0,
      limit: exceptions.cursor.limit ?? 10,
      total: exceptions.cursor.total ?? 0,
      isLoading: listPolicyExceptionsQuery.isLoading,
    },
    navProps: {
      leftDisabled:
        listPolicyExceptionsQuery.isLoading ||
        listPolicyExceptionsQuery.isFetching ||
        !exceptions.cursor.page ||
        exceptions.cursor.page <= 1,
      rightDisabled:
        listPolicyExceptionsQuery.isLoading ||
        listPolicyExceptionsQuery.isFetching ||
        !exceptions.cursor.page ||
        !exceptions.cursor.pages ||
        exceptions.cursor.page >= exceptions.cursor.pages,
    },
    pages: exceptions.cursor.pages,
  });

  React.useEffect(() => {
    if (listPolicyExceptionsQuery.isError) {
      logger.error(listPolicyExceptionsQuery.error);
    }
  }, [listPolicyExceptionsQuery.isError, listPolicyExceptionsQuery.error]);

  return {
    isLoading: listPolicyExceptionsQuery.isLoading,
    isFetching: listPolicyExceptionsQuery.isFetching,
    getExceptionsByPage,
    page,
    limit,
    resetState,
    PaginationComponent,
    exceptions,
  };
};
