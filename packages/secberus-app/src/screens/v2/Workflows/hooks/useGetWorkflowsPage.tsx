import React from 'react';
import { createEnvAwareLogger } from '@secberus/utils';
import {
  getDefaultPaginatedResponse,
  ListWorkflowsApiArg,
  workflowsApi,
  Workflow,
} from '@secberus/services';
import { useAppPagination } from '../../../../hooks/useAppPagination';

const logger = createEnvAwareLogger();

export const useGetWorkflowsPage = () => {
  const [
    listWorkflows,
    {
      data: workflows = getDefaultPaginatedResponse<Workflow>(),
      ...listWorkflowsQuery
    },
  ] = workflowsApi.useLazyListWorkflowsQuery({});

  const {
    PaginationBuilder: PaginationComponent,
    page,
    limit,
    resetState,
  } = useAppPagination({
    tableId: 'workflows-list',
    limitProps: {
      page: workflows.cursor.page ?? 0,
      limit: workflows.cursor.limit ?? 10,
      total: workflows.cursor.total ?? 0,
      isLoading: listWorkflowsQuery.isLoading,
    },
    navProps: {
      leftDisabled:
        listWorkflowsQuery.isLoading ||
        listWorkflowsQuery.isFetching ||
        !workflows.cursor.page ||
        workflows.cursor.page <= 1,
      rightDisabled:
        listWorkflowsQuery.isLoading ||
        listWorkflowsQuery.isFetching ||
        !workflows.cursor.page ||
        !workflows.cursor.pages ||
        workflows.cursor.page >= workflows.cursor.pages,
    },
    pages: workflows.cursor.pages,
  });

  const getWorkflowsByPage = React.useCallback(
    async (data: ListWorkflowsApiArg) => {
      return await listWorkflows({
        ...data,
        page: page || undefined,
        limit: limit || undefined,
      });
    },
    [listWorkflows, limit, page]
  );

  React.useEffect(() => {
    if (listWorkflowsQuery.isError) {
      logger.error(listWorkflowsQuery.error);
    }
  }, [listWorkflowsQuery.error, listWorkflowsQuery.isError]);

  return {
    isWorkflowsLoading: listWorkflowsQuery.isLoading,
    isWorkflowsFetching: listWorkflowsQuery.isFetching,
    getWorkflowsByPage,
    page,
    workflows,
    PaginationComponent,
    resetState,
    limit,
  };
};
