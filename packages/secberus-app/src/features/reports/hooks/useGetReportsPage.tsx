import React from 'react';
import { useIsLoading } from '@secberus/utils';
import {
  getDefaultPaginatedResponse,
  ListReportSchedulesApiArg,
  ReportScheduleList,
  reportSchedulesApi,
} from '@secberus/services';
import { useAppPagination } from '../../../hooks/useAppPagination';

export const useGetReportsPage = ({ tableId }: { tableId: string }) => {
  const [
    listReports,
    {
      data: reports = getDefaultPaginatedResponse<ReportScheduleList>(),
      ...listReportSchedulesQuery
    },
  ] = reportSchedulesApi.useLazyListReportSchedulesQuery();

  const isLoading = useIsLoading([
    listReportSchedulesQuery.isLoading,
    listReportSchedulesQuery.isFetching,
    listReportSchedulesQuery.isUninitialized,
  ]);

  const {
    PaginationBuilder: PaginationComponent,
    page,
    limit,
    resetState,
  } = useAppPagination({
    tableId,
    limitProps: {
      page: reports?.cursor?.page ?? 0,
      limit: reports?.cursor?.limit ?? 10,
      total: reports?.cursor?.total ?? 0,
      isLoading: isLoading,
    },
    navProps: {
      leftDisabled:
        isLoading || !reports.cursor.page || reports.cursor.page <= 1,
      rightDisabled:
        isLoading ||
        !reports.cursor.page ||
        !reports.cursor.pages ||
        reports.cursor.page >= reports.cursor.pages,
    },
    pages: reports.cursor.pages,
  });

  const getReportsByPage = React.useCallback(
    async (data: ListReportSchedulesApiArg) => {
      return await listReports({
        ...data,
        page: page || undefined,
        limit: limit || undefined,
      });
    },
    [listReports, limit, page]
  );

  return {
    isLoading,
    getReportsByPage,
    page,
    PaginationComponent,
    resetState,
    limit,
    reports: reports.results ?? [],
  };
};
