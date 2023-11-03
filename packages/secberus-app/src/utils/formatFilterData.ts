import { isArray } from 'lodash';

export const formatFilterData = (
  filterData: Record<string, any>
): Record<string, any> => {
  const formattedFilterData = {};
  Object.entries(filterData).forEach(([key, values]) => {
    if (isArray(values) || typeof values !== 'object')
      return Object.assign(formattedFilterData, { [key]: values });
    const hasValue = Object.keys(values).filter(k => values[k]);
    if (hasValue) Object.assign(formattedFilterData, { [key]: hasValue });
  });

  return formattedFilterData;
};
