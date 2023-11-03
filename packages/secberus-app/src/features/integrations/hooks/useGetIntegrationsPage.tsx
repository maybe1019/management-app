import React from 'react';
import { createEnvAwareLogger } from '@secberus/utils';
import {
  getDefaultPaginatedResponse,
  Integration,
  integrationsApi,
  ListIntegrationsApiArg,
} from '@secberus/services';
import { useAppPagination } from '../../../hooks/useAppPagination';

const logger = createEnvAwareLogger();

export const useGetIntegrationsPage = () => {
  const [
    listIntegrations,
    {
      data: integrations = getDefaultPaginatedResponse<Integration>(),
      ...listIntegrationsQuery
    },
  ] = integrationsApi.useLazyListIntegrationsQuery({});

  const {
    PaginationBuilder: PaginationComponent,
    page,
    limit,
    resetState,
  } = useAppPagination({
    tableId: 'integrations-list',
    limitProps: {
      page: integrations?.cursor?.page ?? 0,
      limit: integrations?.cursor?.limit ?? 10,
      total: integrations?.cursor?.total ?? 0,
      isLoading: listIntegrationsQuery.isLoading,
    },
    navProps: {
      leftDisabled:
        listIntegrationsQuery.isLoading ||
        listIntegrationsQuery.isFetching ||
        !integrations.cursor.page ||
        integrations.cursor.page <= 1,
      rightDisabled:
        listIntegrationsQuery.isLoading ||
        listIntegrationsQuery.isFetching ||
        !integrations.cursor.page ||
        !integrations.cursor.pages ||
        integrations.cursor.page >= integrations.cursor.pages,
    },
    pages: integrations.cursor.pages,
  });

  const getIntegrationsByPage = React.useCallback(
    async (data: ListIntegrationsApiArg) => {
      return await listIntegrations({
        ...data,
        page: page || undefined,
        limit: limit || undefined,
      });
    },
    [listIntegrations, limit, page]
  );

  React.useEffect(() => {
    if (listIntegrationsQuery.isError) {
      logger.error(listIntegrationsQuery.error);
    }
  }, [listIntegrationsQuery.error, listIntegrationsQuery.isError]);

  return {
    isIntegrationLoading: listIntegrationsQuery.isLoading,
    getIntegrationsByPage,
    page,
    integrations,
    PaginationComponent,
    resetState,
    limit,
  };
};
