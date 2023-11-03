import React from 'react';
import {
  complianceFrameworksApi,
  ComplianceFrameworkSummary,
  GetComplianceFrameworksSummaryApiArg,
  getDefaultPaginatedResponse,
} from '@secberus/services';
import { useAppPagination } from '../../../../../hooks/useAppPagination';

export const useGetComplianceSummary = () => {
  const defaultPageSettings = [{ id: '4', name: '4' }];
  const getComplianceFrameworks =
    complianceFrameworksApi.useGetComplianceFrameworksQuery({
      enabled: 'true',
    });
  const [
    getComplianceSummary,
    {
      data = getDefaultPaginatedResponse<ComplianceFrameworkSummary>(),
      ...getSummary
    },
  ] = complianceFrameworksApi.useLazyGetComplianceFrameworksSummaryQuery({});

  const fetchByPage = React.useCallback(
    async (data: GetComplianceFrameworksSummaryApiArg) =>
      getComplianceSummary(data, true),
    [getComplianceSummary]
  );

  const {
    PaginationBuilder: PaginationComponent,
    page,
    limit,
    resetState,
  } = useAppPagination({
    hideSelect: true,
    tableId: 'compliance-summary-list',
    limitProps: {
      options: defaultPageSettings,
      page: data.cursor.page ?? 0,
      limit: data.cursor.limit ?? 10,
      total: data.cursor.total ?? 0,
      isLoading: getSummary.isLoading,
    },
    navProps: {
      leftDisabled:
        getSummary.isLoading ||
        getSummary.isFetching ||
        !data.cursor.page ||
        data.cursor.page <= 1,
      rightDisabled:
        getSummary.isLoading ||
        getSummary.isFetching ||
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
    getComplianceFrameworks,
    ...getSummary,
  };
};
