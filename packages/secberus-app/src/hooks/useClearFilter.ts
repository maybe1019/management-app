import { useFilterQuery } from '../features/filters';

export const useClearFilters = () => {
  const { getQuery, updateQuery } = useFilterQuery();

  const queryfilters = getQuery();

  const clearAllFilters = () => {
    if (queryfilters) {
      let filters = {};
      Object.keys(queryfilters).forEach((key: string) => {
        filters = { ...filters, [key]: [] };
      });

      updateQuery(filters);
    }
  };

  return { clearAllFilters };
};
