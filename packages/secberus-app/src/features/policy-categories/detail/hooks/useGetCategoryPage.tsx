import React from 'react';
import {
  categoriesApi,
  getDefaultPaginatedResponse,
  secberusApi_Policy,
  secberusApi_ListPoliciesApiArg,
  policiesApi2,
} from '@secberus/services';
import { createEnvAwareLogger } from '@secberus/utils';
import { usePagination } from '../../../pagination/hooks/usePagination';

const logger = createEnvAwareLogger();

export const useGetCategoryPage = () => {
  const [
    listPolicies,
    {
      data: policies = getDefaultPaginatedResponse<secberusApi_Policy>(),
      ...listPoliciesQuery
    },
  ] = policiesApi2.useLazyListPoliciesQuery();

  const [getCategory, { data: category, ...listCategoriesQuery }] =
    categoriesApi.useLazyGetCategoryQuery();

  // Used twice in file
  const isLoading =
    listPoliciesQuery.isLoading || listCategoriesQuery.isLoading;

  const {
    PaginationBuilder: PaginationComponent,
    page,
    limit,
    resetState,
  } = usePagination({
    tableId: 'category-policies',
    limitProps: {
      page: policies.cursor.page ?? 0,
      limit: policies.cursor.limit ?? 10,
      total: policies.cursor.total ?? 0,
      isLoading,
    },
    navProps: {
      leftDisabled:
        listPoliciesQuery.isLoading ||
        listPoliciesQuery.isFetching ||
        !policies.cursor.page ||
        policies.cursor.page <= 1,
      rightDisabled:
        listPoliciesQuery.isLoading ||
        listPoliciesQuery.isFetching ||
        !policies.cursor.page ||
        !policies.cursor.pages ||
        policies.cursor.page >= policies.cursor.pages,
    },
  });

  const getPoliciesByPage = React.useCallback(
    async (data: secberusApi_ListPoliciesApiArg) => {
      return await listPolicies(
        {
          ...data,
          page: page ? Number(page) : undefined,
          limit: limit ? Number(limit) : undefined,
        },
        true
      );
    },
    [listPolicies, page, limit] //, itemsPerPage, page, location.search]
  );

  React.useEffect(() => {
    if (listCategoriesQuery.isError || listPoliciesQuery.isError) {
      logger.error(listCategoriesQuery.error);
      logger.error(listPoliciesQuery.error);
    }
  }, [listPoliciesQuery, listCategoriesQuery]);

  return {
    isLoading: isLoading,
    isFetching: listCategoriesQuery.isFetching || listPoliciesQuery.isFetching,
    getPoliciesByPage,
    getCategory,
    PaginationComponent,
    resetPaginationState: resetState,
    policies: policies?.results,
    category,
    page,
    pageLimit: limit,
    cursor: policies?.cursor,
  };
};
