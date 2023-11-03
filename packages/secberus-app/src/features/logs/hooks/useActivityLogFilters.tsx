import React from 'react';
import { useTableFilters } from '../../filters';

export function useActivityLogFilters() {
  const [queryParams, setQueryParams] = React.useState({});
  const {
    filterPanel: FilterPanel,
    tagBar: TagBar,
    toggleOpen,
    addFilter,
  } = useTableFilters({
    onChange: (filters = {}) => setQueryParams(filters),
    filters: [
      'datasourceType',
      'datasourceId',
      'level',
      'textSearch',
      'earliest',
      'latest',
    ],
  });

  return {
    FilterPanel,
    TagBar,
    toggleOpen,
    queryParams,
    addFilter,
  };
}
