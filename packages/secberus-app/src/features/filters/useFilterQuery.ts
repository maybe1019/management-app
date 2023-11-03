import { useQueryV2 } from '../../hooks/useQuery';
import type { Filter } from '../filter-panel/FilterPanel.component';

export const useFilterQuery = <
  T = Partial<Record<Filter, string[] | undefined>>
>(
  filterKeys?: string[]
) => {
  const { getQuery, updateQuery, deleteQuery } = useQueryV2<T>(
    'filter',
    undefined,
    true,
    filterKeys
  );

  return { getQuery, updateQuery, deleteQuery };
};
