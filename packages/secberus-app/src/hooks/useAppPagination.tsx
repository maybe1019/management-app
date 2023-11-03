import { Cursor } from '@secberus/services';
import { useGetCurrentOrgId } from '../app/core/useGetCurrentOrg';
import { usePagination } from '../features/pagination/hooks/usePagination';

/**
 * @description
 * This hook is a wrapper around usePagination that provides organizational context
 *
 * @param props - props for usePagination hook sans contextId
 *
 * @returns usePagination hook with contextId set to current orgId
 *
 * @example
 * const { page, limit, onPaginationChange } = useOrgPagination({
 * navProps,
 * limitProps,
 * tableId,
 * defaultLimit = 10,
 * defaultPage = 1,
 * hideSelect = false,
 * pages,
 * });
 *
 */
export const useAppPagination = (
  props: Omit<Parameters<typeof usePagination>[0], 'contextId'>
) => {
  const orgId = useGetCurrentOrgId();

  return usePagination({ ...props, contextId: orgId });
};

/**
 * Simplifies the default pagination setup process by allowing to just pass the
 * cursor and isFetching/isLoading. For more granualar control, use `useAppPagination` directly.
 * @param tableId
 * @param responseCursor
 * @param isLoading
 * @param isFetching
 */
export const useAppPaginationHelper = ({
  tableId,
  responseCursor,
  isLoading,
  isFetching,
}: {
  tableId: string;
  responseCursor: Partial<Cursor>;
  isLoading: boolean;
  isFetching: boolean;
}): Omit<
  ReturnType<typeof useAppPagination>,
  'PaginationBuilder' | 'resetState'
> & {
  PaginationComponent: JSX.Element;
  resetPagination: (resetDefaultWithLimit?: boolean) => void;
} => {
  const {
    PaginationBuilder: PaginationComponent,
    resetState: resetPagination,
    ...rest
  } = useAppPagination({
    tableId,
    limitProps: {
      page: responseCursor?.page ?? 0,
      limit: responseCursor?.limit ?? 10,
      total: responseCursor?.total ?? 0,
      isLoading,
    },
    navProps: {
      leftDisabled:
        isLoading ||
        isFetching ||
        !responseCursor?.page ||
        responseCursor?.page <= 1,
      rightDisabled:
        isLoading ||
        isFetching ||
        !responseCursor?.page ||
        !responseCursor?.pages ||
        responseCursor?.page >= responseCursor?.pages,
    },
    pages: responseCursor?.pages,
  });

  return {
    resetPagination,
    PaginationComponent,
    ...rest,
  };
};
