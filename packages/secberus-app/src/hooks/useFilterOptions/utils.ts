import { Datasource, Resource } from '@secberus/services';
import { KeyNames, FilterData } from './types';

const grabAvailable = (data: FilterData, keyName: KeyNames) => {
  return Object.entries(data[keyName] ?? {})
    .filter(([_key, val]) => !!val)
    .map(([key, _val]) => key);
};

export const filterBySelection = (
  filterData: FilterData,
  datasources?: Datasource[],
  resources?: Resource[]
) => {
  const toBeFiltered = resources ? resources : datasources;
  const selectedFilters = grabAvailable(filterData, 'datasource_type');

  const checkProperty = (type: any) => {
    if (resources) {
      return type?.datasource_types?.[0];
    }
    if (datasources) {
      return type?.datasource_type_id;
    }
  };

  if (selectedFilters?.length > 0) {
    return toBeFiltered?.map(type => {
      return selectedFilters.includes(checkProperty(type))
        ? { ...type, hidden: false }
        : { ...type, hidden: true };
    });
  }

  return toBeFiltered;
};
