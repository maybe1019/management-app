import { useMemo } from 'react';
import {
  Datasource,
  ResourceList,
  DatasourceTypeList,
} from '@secberus/services';
import { filterBySelection } from './utils';
import { FilterData } from './types';

/*
  @author: Avery Brown

    NOTE: This list filters by hiding the values that aren't used via css due to performance demands.
    Therefore, the same length array is expected. Changes should lie in the application of a property named
    'hidden'

*/
export const useFilterOptions = ({
  datasourcesTypes,
  datasources,
  resources,
  filterData,
  skip,
}: {
  datasourcesTypes: DatasourceTypeList;
  datasources?: Datasource[];
  resources?: ResourceList;
  filterData?: FilterData;
  skip?: boolean;
}) => {
  const filteredList = useMemo(() => {
    if (skip && resources) return resources;

    if (skip && datasources) return datasources;

    if (filterData && filterData.datasource_type) {
      return filterBySelection(filterData, datasources, resources);
    }
    return resources ? resources : datasources;
  }, [skip, resources, datasources, filterData]);

  return filteredList;
};
