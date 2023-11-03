import React from 'react';
import { createEnvAwareLogger } from '@secberus/utils';
import {
  categoriesApi,
  getDefaultPaginatedResponse,
  ListCategoriesApiArg,
  PolicyCategory,
} from '@secberus/services';
import { useAppPagination } from '../../../hooks/useAppPagination';

const logger = createEnvAwareLogger();

export const useGetCategoryPage = () => {
  const [
    listCategories,
    {
      data: categories = getDefaultPaginatedResponse<PolicyCategory>(),
      ...listCategoriesQuery
    },
  ] = categoriesApi.useLazyListCategoriesQuery();

  const {
    PaginationBuilder: PaginationComponent,
    page,
    limit,
    resetState,
  } = useAppPagination({
    tableId: 'categories-list',
    limitProps: {
      page: categories.cursor.page ?? 0,
      limit: categories.cursor.limit ?? 10,
      total: categories.cursor.total ?? 0,
      isLoading: listCategoriesQuery.isLoading,
    },
    navProps: {
      leftDisabled:
        listCategoriesQuery.isLoading ||
        listCategoriesQuery.isFetching ||
        !categories.cursor.page ||
        categories.cursor.page <= 1,
      rightDisabled:
        listCategoriesQuery.isLoading ||
        listCategoriesQuery.isFetching ||
        !categories.cursor.page ||
        !categories.cursor.pages ||
        categories.cursor.page >= categories.cursor.pages,
    },
    pages: categories.cursor.pages,
  });

  const getCategoriesByPage = React.useCallback(
    async (data: ListCategoriesApiArg) => {
      return await listCategories({
        ...data,
        page: page || undefined,
        limit: limit || undefined,
      });
    },
    [listCategories, limit, page]
  );

  React.useEffect(() => {
    if (listCategoriesQuery.isError) {
      logger.error(listCategoriesQuery.error);
    }
  }, [listCategoriesQuery.error, listCategoriesQuery.isError]);

  return {
    isCategoriesUninitialized: listCategoriesQuery.isUninitialized,
    isCategoriesLoading: listCategoriesQuery.isLoading,
    isCategoriesFetching: listCategoriesQuery.isFetching,
    getCategoriesByPage,
    categories: categories.results,
    PaginationComponent,
    resetState,
    limit,
    page,
  };
};
