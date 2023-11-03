import React from 'react';
import { useIsLoading } from '@secberus/utils';
import {
  logsApi,
  CustomGetLogsApiResponse,
  CustomGetLogsApiArgs,
  CustomGetLogsQueryIdArgs,
  getDefaultPaginatedResponse,
  CustomLog,
} from '@secberus/services';
import { useAppPagination } from '../../../hooks/useAppPagination';

const LOG_PAGINATION_LIMIT_OPTIONS = [
  { id: '10', name: '10' },
  { id: '20', name: '20' },
  { id: '50', name: '50' },
  { id: '100', name: '100' },
];

export const useGetLogsPage = ({ params }: CustomGetLogsQueryIdArgs) => {
  const { data: queryId, ...getQueryIdQuery } = logsApi.useGetQueryIdQuery({
    params: params,
  });
  const [
    getLogs,
    { data = getDefaultPaginatedResponse<CustomLog>(), ...getLogQuery },
  ] = logsApi.useLazyGetLogsQuery({
    selectFromResult: ({ data, ...rest }) => {
      return {
        ...rest,
        data: data as CustomGetLogsApiResponse,
      };
    },
  });

  const isLoading = useIsLoading([
    getLogQuery.isLoading,
    getLogQuery.isFetching,
    getLogQuery.isUninitialized,
    getQueryIdQuery.isLoading,
    getQueryIdQuery.isFetching,
    getQueryIdQuery.isUninitialized,
  ]);

  const {
    PaginationBuilder: PaginationComponent,
    page,
    limit,
    resetState: resetPagination,
  } = useAppPagination({
    tableId: 'activity-log',
    limitProps: {
      page: data?.cursor?.page ?? 1,
      limit: data?.cursor?.limit ?? 10,
      total: data?.cursor?.total ?? 0,
      isLoading,
      options: LOG_PAGINATION_LIMIT_OPTIONS,
    },
    navProps: {
      leftDisabled: isLoading || !data?.cursor?.page || data?.cursor?.page <= 1,
      rightDisabled:
        isLoading ||
        !data?.cursor?.page ||
        !data?.cursor?.pages ||
        data?.cursor?.page >= data?.cursor?.pages,
    },
  });
  // Reset pagination on init, and also when filters change.
  // TODO: Add `noCache` boolean to pagination
  React.useEffect(() => {
    resetPagination(true);
  }, [resetPagination]);

  const getLogsPage = React.useCallback(
    async (args: CustomGetLogsApiArgs['params']) => {
      if (!queryId?.query_id) return;
      getLogs({
        params: args,
        pagination: {
          page: page ? parseInt(page) : 1,
          limit: limit ? parseInt(limit) : 25,
          query_id: queryId?.query_id,
        },
      });
    },
    [getLogs, queryId, limit, page]
  );

  return {
    isLoading,
    data: data as CustomGetLogsApiResponse,
    getLogsPage,
    limit,
    resetPagination,
    PaginationComponent,
  };
};
