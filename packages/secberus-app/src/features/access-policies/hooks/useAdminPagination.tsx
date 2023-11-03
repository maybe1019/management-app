import { usePagination } from '../../pagination/hooks/usePagination';

/**
 * @description
 * This hook is a wrapper around usePagination that that provides an admin context
 *
 * @param props - props for usePagination hook sans contextId
 *
 * @returns usePagination hook with admin page context
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
export const useAdminPagination = (
  props: Omit<Parameters<typeof usePagination>[0], 'contextId'>
) => usePagination({ ...props, contextId: '@secberus-admin-app' });
