import React from 'react';
import { SeverityBadge, SlidePanel } from '@secberus/components';
import {
  AmazonAwsLight,
  AzureLightCustom,
  DataLight,
  GithubLight,
  GoogleCloudPlatformLight,
  SwitchOn,
  SwitchOff,
  SecberusSymbolLight,
  UserLight,
} from '@secberus/icons';
import {
  PolicyCategory,
  Resource,
  Datasource,
  DatasourceType,
  ListPoliciesApiArg,
  GetViolationsApiArg,
  LogLevel,
} from '@secberus/services';
import { Flex } from '@chakra-ui/react';
import { Framework } from '../frameworks/Frameworks.types';
import { useFilterRequestDataContext } from '../filters';
import { FilterPanelContainer } from './FilterPanelContainer.component';
import CheckboxGroup from './CheckboxGroup';
import { FilterGroup } from './FilterGroup.component';
import { KeyValueSearch } from './search-key-value/KeyValueSearch.component';

// sort object array by name
export const sortByName = (a: { name: string }, b: { name: string }) =>
  a.name.localeCompare(b.name);

type SeverityBadgeCheckBoxGroupProps = {
  onChange: (values: string[]) => void;
  checked?: string[];
};
const SEVERITY_LABELS = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];
const SeverityBadgeCheckBoxGroup = ({
  onChange,
  checked = [],
}: SeverityBadgeCheckBoxGroupProps) => {
  const checkedList = new Set(checked);

  return (
    <Flex gridGap="10px">
      {SEVERITY_LABELS.map(value => (
        <SeverityBadge
          key={value}
          onChange={() => {
            if (checkedList.has(value)) {
              checkedList.delete(value);
            } else {
              checkedList.add(value);
            }
            onChange(Array.from(checkedList));
          }}
          value={checkedList.has(value)}
          priorityVal={value}
        />
      ))}
    </Flex>
  );
};

export const getResourceIcon = (type?: 'aws' | 'azure' | 'gcp' | 'github') =>
  ({
    aws: AmazonAwsLight,
    azure: AzureLightCustom,
    gcp: GoogleCloudPlatformLight,
    github: GithubLight,
    default: DataLight,
  }[(type?.toLowerCase() as typeof type) || 'default'] ?? DataLight);

// utility type to convert an object to a union of its keys
type KeysOfUnion<T> = T extends T ? keyof T : never;

export type Filter =
  | KeysOfUnion<
      Pick<
        ListPoliciesApiArg,
        | 'categoryId'
        | 'complianceId'
        | 'resourceId'
        | 'datasourceId'
        | 'datasourceType'
        | 'secberusManaged'
        | 'subscribed'
        | 'tag'
        | 'severityLabel'
        | 'resourceData'
      > &
        Pick<GetViolationsApiArg, 'suppressed'>
    >
  | 'showPassing'
  | 'level';

export const FILTER_PANEL_TYPES: Filter[] = [
  'categoryId',
  'complianceId',
  'resourceId',
  'datasourceId',
  'datasourceType',
  'secberusManaged',
  'subscribed',
  'resourceData',
  'tag',
  'severityLabel',
  'resourceData',
  'suppressed',
  'showPassing',
  'level',
];

const isCategoryFilter = (
  filter: Filter,
  options: any[]
): options is PolicyCategory[] => {
  return filter === 'categoryId';
};

const isFrameworkFilter = (
  filter: Filter,
  options: any[]
): options is Framework[] => {
  return filter === 'complianceId';
};

const isResourceTypeFilter = (
  filter: Filter,
  options: any[]
): options is Resource[] => {
  return filter === 'resourceId';
};

const isLogStatusFilter = (
  filter: Filter,
  options: any[]
): options is LogLevel[] => {
  return filter === 'level';
};

const isDatasourceFilter = (
  filter: Filter,
  options: any[]
): options is Datasource[] => {
  return filter === 'datasourceId';
};

const isDatasourceTypeFilter = (
  filter: Filter,
  options: any[]
): options is DatasourceType[] => {
  return filter === 'datasourceType';
};

const filterGroupFactory = (
  filter: Filter,
  options: any[],
  values: string[] | undefined,
  onChange: (arg: [string, string[]]) => void,
  isLoading?: boolean
) => {
  const handleChange = (vals: string[]) => {
    onChange([filter, vals]);
  };

  const handleClear = () => {
    onChange([filter, []]);
  };

  if (isCategoryFilter(filter, options)) {
    return (
      <FilterGroup
        label="Categories"
        id="categoryId"
        onClear={handleClear}
        selected={values?.length}
        total={options.length}
      >
        <CheckboxGroup
          isLoading={isLoading}
          name="categoryId"
          checked={values}
          onChange={handleChange}
          options={options.map(o => ({
            label: o.name,
            value: o.id as string,
          }))}
        />
      </FilterGroup>
    );
  }
  if (isFrameworkFilter(filter, options)) {
    return (
      <FilterGroup
        label="Frameworks"
        id="complianceId"
        onClear={handleClear}
        selected={values?.length}
        total={options.length}
      >
        <CheckboxGroup
          isLoading={isLoading}
          name="complianceId"
          checked={values}
          onChange={handleChange}
          options={options.sort(sortByName).map(o => ({
            label: o.name,
            value: o.id,
          }))}
        />
      </FilterGroup>
    );
  }
  if (isResourceTypeFilter(filter, options)) {
    return (
      <FilterGroup
        label="Resource type"
        id="resourceId"
        onClear={handleClear}
        selected={values?.length}
        total={options.length}
      >
        <CheckboxGroup
          isLoading={isLoading}
          name="resourceId"
          checked={values}
          onChange={handleChange}
          options={options.map(o => ({
            label: o.description,
            value: o.id,
            icon: getResourceIcon(o.datasource_types![0] as any),
          }))}
        />
      </FilterGroup>
    );
  }

  if (isDatasourceFilter(filter, options)) {
    return (
      <FilterGroup
        label="Data source name"
        id="datasourceId"
        onClear={handleClear}
        selected={values?.length}
        total={options.length}
      >
        <CheckboxGroup
          isLoading={isLoading}
          name="datasourceId"
          checked={values}
          onChange={handleChange}
          options={options.map(o => ({
            label: o.name,
            value: o.id!,
            icon: getResourceIcon(o.datasource_type_id as any),
          }))}
        />
      </FilterGroup>
    );
  }
  if (isLogStatusFilter(filter, options)) {
    return (
      <FilterGroup
        label="Level"
        id="level"
        onClear={handleClear}
        selected={values?.length}
        total={options.length}
      >
        <CheckboxGroup
          isLoading={isLoading}
          name="level"
          checked={values}
          onChange={handleChange}
          options={[
            {
              label: 'Critical',
              value: 'CRITICAL',
            },
            {
              label: 'Error',
              value: 'ERROR',
            },
            {
              label: 'Warning',
              value: 'WARNING',
            },
            {
              label: 'Info',
              value: 'INFO',
            },
          ]}
        />
      </FilterGroup>
    );
  }
  if (isDatasourceTypeFilter(filter, options)) {
    return (
      <FilterGroup
        label="Data source type"
        id="datasourceType"
        onClear={handleClear}
        selected={values?.length}
        total={options.length}
      >
        <CheckboxGroup
          isLoading={isLoading}
          name="datasourceType"
          checked={values}
          onChange={handleChange}
          options={options.sort(sortByName).map(o => ({
            label: o.name,
            value: o.id!,
            icon: getResourceIcon(o.id as any),
          }))}
        />
      </FilterGroup>
    );
  }

  if (filter === 'secberusManaged') {
    return (
      <FilterGroup
        label="Author"
        id="secberusManaged"
        onClear={handleClear}
        selected={values?.length}
        total={2}
      >
        <CheckboxGroup
          name="secberusManaged"
          checked={values}
          onChange={handleChange}
          options={[
            {
              label: 'Secberus',
              value: 'true',
              icon: SecberusSymbolLight,
            },
            { label: 'Custom', value: 'false', icon: UserLight },
          ]}
        />
      </FilterGroup>
    );
  }

  if (filter === 'severityLabel')
    return (
      <FilterGroup
        label="Severity"
        id="severityLabel"
        onClear={handleClear}
        selected={values?.length}
        total={SEVERITY_LABELS.length}
      >
        <SeverityBadgeCheckBoxGroup onChange={handleChange} checked={values} />
      </FilterGroup>
    );

  if (filter === 'subscribed')
    return (
      <FilterGroup
        label="Status"
        id="subscribed"
        onClear={handleClear}
        selected={values?.length}
        total={2}
      >
        <CheckboxGroup
          name="subscribed"
          checked={values}
          onChange={handleChange}
          options={['true', 'false'].map(value => ({
            label: value === 'true' ? 'On' : 'Off',
            value,
            icon: value === 'true' ? SwitchOn : SwitchOff,
          }))}
        />
      </FilterGroup>
    );

  if (filter === 'suppressed')
    return (
      <FilterGroup
        label="Exceptions"
        id="suppressed"
        onClear={handleClear}
        selected={values?.length}
        total={2}
      >
        <CheckboxGroup
          name="suppressed"
          checked={values}
          onChange={handleChange}
          options={['true', 'false'].map(value => ({
            label: value === 'true' ? 'Exceptions' : 'Active violations',
            value,
          }))}
        />
      </FilterGroup>
    );

  if (filter === 'resourceData')
    return (
      <FilterGroup
        label="Resource data"
        id="resourceData"
        onClear={handleClear}
        selected={values?.length}
      >
        <KeyValueSearch
          onChange={t => handleChange(t.map(([k, v]) => `${k}:${v}`))}
          values={values?.map(v => v.split(':'))}
        />
      </FilterGroup>
    );

  if (filter === 'tag')
    return (
      <FilterGroup
        label="Resource tags"
        id="tag"
        onClear={handleClear}
        selected={values?.length}
      >
        <KeyValueSearch
          onChange={t => handleChange(t.map(([k, v]) => `${k}:${v}`))}
          values={values?.map(v => v.split(':'))}
        />
      </FilterGroup>
    );

  if (filter === 'showPassing')
    return (
      <FilterGroup
        label="Show passing"
        id="tag"
        onClear={handleClear}
        selected={values?.length}
        total={1}
      >
        <CheckboxGroup
          name="showPassing"
          checked={values}
          onChange={handleChange}
          options={[{ value: 'true', label: 'Show passing policies' }].map(
            ({ label, value }) => ({
              label,
              value,
            })
          )}
        />
      </FilterGroup>
    );
};

type FilterPanelProps = {
  filters: Filter[];
  values: Partial<Record<Filter, string[] | undefined>>;
  open?: boolean;
  resultCount?: number;
  onClose?: (...args: any) => void;
  onChange: (arg: [string, string[]]) => void;
  onClearAll?: () => void;
  isLoading?: boolean;
};
export const FilterPanel = ({
  filters,
  values,
  onClearAll,
  onClose,
  onChange,
  open = false,
  resultCount,
  isLoading,
}: FilterPanelProps) => {
  const data = useFilterRequestDataContext();

  return (
    <SlidePanel isVisible={open} onClose={onClose}>
      <FilterPanelContainer
        onClose={onClose}
        onClearAll={onClearAll}
        activeCount={resultCount}
        isLoading={isLoading}
      >
        {filters.map(filter => {
          const t = filterGroupFactory(
            filter,
            Object.values(data[filter] ?? {}) ?? [],
            values[filter] ?? [],
            onChange
          );

          return <React.Fragment key={filter}>{t}</React.Fragment>;
        })}
      </FilterPanelContainer>
    </SlidePanel>
  );
};
