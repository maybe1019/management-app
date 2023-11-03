import React from 'react';
import { isEmptyObject } from '@secberus/utils';
import { Datasource } from '@secberus/services';

const formatFilterData = (
  filterData: Record<string, any>
): Record<string, any> =>
  Object.entries(filterData).reduce((acc, [k, v]) => {
    acc[k] =
      typeof v !== 'object' || Array.isArray(v)
        ? v
        : Object.keys(v).filter(k => v[k]);
    return acc;
  }, {} as Record<string, any>);

const applyAllDpisIfNone = (
  params: Record<string, unknown>,
  dataSources: Datasource[]
) => ({
  ...params,
  datasource_id: isEmptyObject(params.datasource_id as any)
    ? dataSources.map(({ id }) => id)
    : params.datasource_id,
});

type UseFormatFilterData = (
  data: Record<string, any>,
  opts?: {
    filterAvailableDataSources?: boolean | Datasource[];
  },
  dataSources?: Datasource[]
) => Record<string, any>;

export const useFormatFilterData: UseFormatFilterData = (
  data,
  opts = {},
  dataSources = []
) => {
  const { filterAvailableDataSources } = opts;

  return React.useMemo(() => {
    let formattedData = formatFilterData(data);

    if (filterAvailableDataSources) {
      const targetDataSources =
        typeof filterAvailableDataSources === 'boolean'
          ? dataSources
          : filterAvailableDataSources;
      formattedData = applyAllDpisIfNone(formattedData, targetDataSources);
    }

    return formattedData;
  }, [data, dataSources, filterAvailableDataSources]);
};
