import React from 'react';
import { ChevronDownLight, InfoLight } from '@secberus/icons';
import { Controller } from 'react-hook-form';
import { Text, FadeScroll, Tooltip } from '../../index';
import {
  StyledFilterGroup,
  GroupHeader,
  ClearButton,
  FilterGroupOptions,
} from '../MultiSelectionBox.styled';
import { FilterGroupProps } from '../MultiSelectionBox.types';

import { KeyValueSearch } from '../../select-input/components';
import {
  ResourceFilter,
  SeverityFilter,
  BaseFilter,
  TypeaheadFilter,
  SearchTypeAheadComponent,
} from './FilterComponents';

const KeyValueFilter: React.FC<any> = ({ groupId, control }) => {
  return (
    <Controller
      render={({ onChange, value }) => (
        <KeyValueSearch
          onChange={onChange}
          backgroundColor="light-gray"
          values={value}
        />
      )}
      control={control}
      name={groupId}
    />
  );
};

const components = {
  dataSource: ResourceFilter,
  severity: SeverityFilter,
  typeahead: TypeaheadFilter,
  'search-typeahead': SearchTypeAheadComponent,
  'search-key-value': KeyValueFilter,
};

const FilterGroup: React.FC<FilterGroupProps> = ({
  groupId,
  group,
  register,
  control,
  setValue,
  formData = {},
  ...rest
}) => {
  const {
    expanded = false,
    maxHeight = '200px',
    type,
    label,
    values,
    tooltipInfo,
    minHeight,
  } = group;

  const [isExpanded, setExpanded] = React.useState(expanded);
  const formFields = Object.values(formData);
  const selected = formFields.filter(field => field);

  const defaultValues = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    if (type === ('search-typeahead' || 'typeahead')) {
      if ('componentProps' in group) {
        // @ts-ignore
        'setSelected' in group.componentProps &&
          group.componentProps.setSelected({});
      }
    }
    if (values && Array.isArray(values)) {
      values.forEach(({ id }) => setValue(`${groupId}[${id}]`, false));
    } else {
      setValue(groupId, []);
    }
  };

  // @ts-expect-error poorly typed
  const FilterComponent = components[type || ''] || BaseFilter;

  return (
    <StyledFilterGroup className="filter-group">
      {label && (
        <GroupHeader onClick={() => setExpanded(!isExpanded)}>
          <ChevronDownLight
            className={`chevron ${isExpanded ? '' : 'rotate'}`}
            height="24px"
            width="24px"
          />
          <Text type="small-bold">{label}</Text>
          {!!selected?.length && (values || group.type === "search-key-value") &&(
            <Text type="small-bold" color="gray">
              &nbsp;
              {group.type === "search-key-value"? selected.length : `${selected.length}/${values.length}`}
            </Text>
          )}
          {tooltipInfo && (
            <InfoLight
              className="tooltipInfo"
              height={18}
              width={18}
              data-tip={tooltipInfo}
              data-for={groupId}
            />
          )}
          <ClearButton onClick={defaultValues}>Clear</ClearButton>
        </GroupHeader>
      )}
      <FilterGroupOptions
        expanded={isExpanded}
        className="fg-options"
        maxHeight={maxHeight}
        minHeight={minHeight}
      >
        <FadeScroll
          className="filterComponentWrapper"
          fadeBottom={!!isExpanded}
          trigger={values}
        >
          <FilterComponent
            className="filterComponent"
            groupId={groupId}
            register={register}
            control={control}
            group={group}
            minHeight={minHeight}
            setValue={setValue}
            {...rest}
          />
        </FadeScroll>
      </FilterGroupOptions>
      {tooltipInfo && <Tooltip id={groupId} />}
    </StyledFilterGroup>
  );
};

export default FilterGroup;
