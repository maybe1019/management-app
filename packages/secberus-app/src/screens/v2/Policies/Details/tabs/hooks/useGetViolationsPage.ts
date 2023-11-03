import React from 'react';
import {
  violationsApi,
  GetViolationsApiArg,
  getDefaultPaginatedResponse,
  Violation,
} from '@secberus/services';
import { createEnvAwareLogger } from '@secberus/utils';
import { useAppPagination } from '../../../../../../hooks/useAppPagination';

const logger = createEnvAwareLogger();

export const useGetViolationPage = () => {
  const [
    getViolations,
    { data = getDefaultPaginatedResponse<Violation>(), ...getViolationsQuery },
  ] = violationsApi.useLazyGetViolationsQuery();

  const getViolationsByPage = React.useCallback(
    async (arg: GetViolationsApiArg) => getViolations(arg, true),
    [getViolations]
  );

  const {
    PaginationBuilder: PaginationComponent,
    page,
    limit,
    resetState,
  } = useAppPagination({
    tableId: 'violations',
    limitProps: {
      page: data.cursor.page ?? 0,
      limit: data.cursor.limit ?? 10,
      total: data.cursor.total ?? 0,
      isLoading: getViolationsQuery.isLoading,
    },
    navProps: {
      leftDisabled:
        getViolationsQuery.isLoading ||
        getViolationsQuery.isFetching ||
        !data.cursor.page ||
        data.cursor.page <= 1,
      rightDisabled:
        getViolationsQuery.isLoading ||
        getViolationsQuery.isFetching ||
        !data.cursor.page ||
        !data.cursor.pages ||
        data.cursor.page >= data.cursor.pages,
    },
    pages: data.cursor.pages,
  });

  React.useEffect(() => {
    if (getViolationsQuery.isError) {
      logger.error(getViolationsQuery.error);
    }
  }, [getViolationsQuery.isError, getViolationsQuery.error]);

  return {
    isUninitialized: getViolationsQuery.isUninitialized,
    isLoading: getViolationsQuery.isLoading,
    isFetching: getViolationsQuery.isFetching,
    getViolationsByPage,
    resetState,
    PaginationComponent,
    page,
    limit,
    data,
  };
};
