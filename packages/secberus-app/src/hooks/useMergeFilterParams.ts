import { useDispatch } from 'react-redux';
import { setFiltersAttribute } from '../store';
import { formatFilterData } from '../utils/formatFilterData';
import { useDeepEffect } from './useDeepEffect';

export const useMergeFilterParams = (filterData: any) => {
  const dispatch = useDispatch();
  useDeepEffect(() => {
    const formattedFilterData = formatFilterData(filterData);
    Object.entries(formattedFilterData).forEach(([key, val]) => {
      dispatch(setFiltersAttribute(`active.${key}`, val));
    });
  }, [filterData]);
};
