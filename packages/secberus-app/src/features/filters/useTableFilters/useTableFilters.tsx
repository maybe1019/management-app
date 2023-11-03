import React from 'react';
import {
  complianceFrameworksApi,
  categoriesApi,
  secberusApiGW,
  dataSourceApi,
  Resource,
  Datasource,
  DatasourceType,
} from '@secberus/services';
import {
  useDeepEffect,
  filterObject,
  StringWithAutoComplete,
} from '@secberus/utils';
import { FilterPanel } from '../../filter-panel';
import {
  Filter,
  FILTER_PANEL_TYPES,
} from '../../filter-panel/FilterPanel.component';
import { TagBar } from '../../tags';
import { useFilterQuery } from '../useFilterQuery';
import { removeEmptyValues } from '../../../hooks/useQuery';

// create id map from object array
const createIdMap = (arr: any[]) =>
  arr.reduce((acc, curr) => {
    acc[curr.id] = curr;
    return acc;
  }, {} as Record<string, any>);

// create react context with hook for filter request data
const FilterRequestDataContext = React.createContext<
  Record<Filter, any> | undefined
>(undefined);

export const useFilterRequestDataContext = () => {
  const context = React.useContext(FilterRequestDataContext);
  if (!context) {
    throw new Error(
      'useFilterRequestDataContext must be used within a FilterRequestDataProvider'
    );
  }
  return context;
};

const requests = {
  complianceId: complianceFrameworksApi.useGetComplianceFrameworksQuery,
  categoryId: categoriesApi.useListCategoriesQuery,
  resourceId: secberusApiGW.useListResourcesQuery,
  datasourceId: dataSourceApi.useListDatasourcesQuery,
  datasourceType: dataSourceApi.useListDatasourceTypesQuery,
};

const useGetTableFilterData = (
  requestIds: StringWithAutoComplete<Filter>[]
) => {
  const requestData = Object.entries(requests).reduce(
    (acc = {}, [requestId, currHook]) => {
      if (requestIds.includes(requestId as Filter)) {
        acc[requestId] = (currHook as any)({ limit: '300' });
      }
      return acc;
    },
    {} as Record<string, ReturnType<typeof requests[keyof typeof requests]>>
  );

  const filterValues = Object.entries(requestData).reduce((acc, [key, val]) => {
    val.data
      ? 'results' in val.data
        ? (acc[key as Filter] = createIdMap(val.data.results))
        : (acc[key as Filter] = createIdMap(val.data))
      : (acc[key as Filter] = {});
    return acc;
  }, {} as Record<Filter, Record<string, any>>);

  return {
    data: filterValues,
    requestData,
    isLoading: Object.values(requestData).some(val => val.isLoading),
  };
};

const filterResourcesByDatasourceType = (
  resources: Resource[],
  type: string[]
) => {
  return resources.filter(resource =>
    resource.datasource_types?.some(datasourceType =>
      type.includes(datasourceType)
    )
  );
};

const filterDatasourcesByDatasourceType = (
  datasources: Datasource[],
  type: string[]
) => {
  return datasources.filter(d => type.includes(d.datasource_type_id));
};

const filterDatasourceTypeByDatasource = (
  datasourceTypes: DatasourceType[],
  datasources: Datasource[]
) => {
  return datasourceTypes.filter(d =>
    datasources.some(ds => ds.datasource_type_id === d.id)
  );
};

export const useTableFilters = ({
  filters = [],
  resultCount,
  onChange,
  entityType = 'results',
  prepareFilterData,
  deductiveDataset = true,
}: {
  filters?: StringWithAutoComplete<Filter>[];
  resultCount?: number;
  onChange?: (filters?: Partial<Record<Filter, string[] | undefined>>) => void;
  entityType?: string;
  prepareFilterData?: (key: Filter, values: any) => any;
  deductiveDataset?: boolean;
}) => {
  const { getQuery, updateQuery } = useFilterQuery(filters);
  const query = filterObject(getQuery() ?? {}, filters) as Record<
    Filter,
    string[]
  >;
  const { data, isLoading } = useGetTableFilterData(filters);
  const prepareData = Object.entries(data as Record<Filter, any[]>).reduce(
    (acc, [key, val]) => {
      const k = key as Filter;

      let datum = prepareFilterData
        ? prepareFilterData(k, Object.values(val))
        : Object.values(val);

      // filter resources and datasources based on datasource type query, if present
      if (deductiveDataset) {
        if (k === 'resourceId' && query.datasourceType) {
          const filtered = filterResourcesByDatasourceType(
            datum,
            query.datasourceType
          );

          const active = Object.values(data.resourceId).filter(d =>
            query.resourceId?.includes(d.id)
          );

          const sorted = [
            // ...active,
            ...active.filter(d => !filtered.some(ad => ad.id === d.id)),
            ...filtered,
          ];

          datum = sorted;
        }
        if (k === 'datasourceId' && query.datasourceType) {
          const filtered = filterDatasourcesByDatasourceType(
            datum,
            query.datasourceType
          );
          const active = Object.values(data.datasourceId).filter(d =>
            query.datasourceId?.includes(d.id)
          );

          const sorted = [
            // ...active,
            ...active.filter(d => !filtered.some(ad => ad.id === d.id)),
            ...filtered,
          ];

          datum = sorted;
        }
        // if (k === 'datasourceType' && query.datasourceId) {
        //   datum = filterDatasourceTypeByDatasource(
        //     datum,
        //     Object.values(data.datasourceId).filter(d =>
        //       query.datasourceId.includes(d.id)
        //     )
        //   );
        // }
      }

      acc[k] = createIdMap(datum);
      return acc;
    },
    {} as Record<Filter, any[]>
  );

  const [open, setOpen] = React.useState(false);

  const toggleOpen = () => {
    setOpen(o => !o);
  };

  const handleChange: React.ComponentProps<typeof FilterPanel>['onChange'] = ([
    k,
    v,
  ]) => {
    updateQuery((prev = {}) => {
      return { ...prev, [k]: v };
    });
  };

  const handleClearAll = () => {
    updateQuery((prev = {}) => {
      const next = filterObject(
        prev,
        filters.filter(f => !FILTER_PANEL_TYPES.includes(f as Filter))
      );
      return next;
    });
    onChange?.();
  };

  const handleTagRemove: React.ComponentProps<typeof TagBar>['onRemove'] = ([
    k,
    v,
  ]) => {
    updateQuery((prev = {}) => {
      const next = prev;
      next[k as Filter] = next[k as Filter]?.filter(item => item !== v);

      return next;
    });
  };

  useDeepEffect(() => {
    onChange?.(query);
  }, [query]);

  const filterPanelQuery = removeEmptyValues(
    filterObject(query, FILTER_PANEL_TYPES)
  );

  return {
    filterPanel: (
      <FilterRequestDataContext.Provider value={prepareData}>
        {filters.length && (
          <FilterPanel
            resultCount={resultCount}
            filters={filters as any}
            values={filterPanelQuery ?? {}}
            onChange={handleChange}
            open={open}
            onClose={toggleOpen}
            onClearAll={handleClearAll}
            isLoading={isLoading}
          />
        )}
      </FilterRequestDataContext.Provider>
    ),
    tagBar: (
      <FilterRequestDataContext.Provider value={data}>
        {filterPanelQuery && (
          <TagBar
            data={filterPanelQuery}
            reset={handleClearAll}
            onRemove={handleTagRemove}
            unit={entityType}
            resultCount={resultCount}
            isLoading={isLoading}
          />
        )}
      </FilterRequestDataContext.Provider>
    ),
    filters: getQuery(),
    toggleOpen,
    addFilter: handleChange,
  };
};
