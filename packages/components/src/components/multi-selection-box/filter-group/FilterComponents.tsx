import React from 'react';
import { Controller } from 'react-hook-form';
import { Text, Checkbox, SeverityBadge, KeyValueSearch } from '../../index';
import { StyledSeverityFilter } from '../MultiSelectionBox.styled';
import { FilterComponentProps } from '../MultiSelectionBox.types';
import { SearchTypeAhead } from '../../select-input/components';
import { AutoCompleteSelectMain } from '../../autocomplete-select/AutoCompleteSelect.component';
import { RESOURCE_LOGO_BY_DATASOURCE } from '../../../constants';
import { StyledAutoComplete } from './FilterComponents.styled';

export const BaseFilter = ({
  groupId,
  register,
  group,
}: FilterComponentProps) =>
  group.values.map(({ id, name, label, icon: Icon }) => (
    <Checkbox key={id} ref={register} name={`${groupId}[${id}]`}>
      {Icon && <Icon className="BaseFilter__icon" height="20px" width="20px" />}
      <Text type="small-bold">{label || name}</Text>
    </Checkbox>
  ));

export const ResourceFilter = ({
  groupId,
  register,
  group,
}: FilterComponentProps) =>
  group.values.map(({ id, datasource_type_id, name, label }) => {
    const Icon =
      RESOURCE_LOGO_BY_DATASOURCE[
        datasource_type_id.toLowerCase() || 'default'
      ] ?? RESOURCE_LOGO_BY_DATASOURCE.default;
    return (
      <Checkbox key={id} ref={register} name={`${groupId}[${id}]`}>
        <Icon height="24px" width="24px" />
        <Text className="ResourceFilter__resourcesLabel" type="small-bold">
          {label || name}
        </Text>
      </Checkbox>
    );
  });

export const SeverityFilter = ({
  groupId,
  control,
  group,
}: FilterComponentProps) => (
  <StyledSeverityFilter>
    {group.values.map(({ id, value }) => {
      return (
        <Controller
          as={SeverityBadge}
          control={control}
          key={id}
          priorityVal={value}
          name={`${groupId}[${id}]`}
        />
      );
    })}
  </StyledSeverityFilter>
);

export const TypeaheadFilter: React.FC<AutoCompleteSelectMain> = ({
  data,
  valueKey,
  displayKey,
  setSelected,
  selected,
  placeholder,
  group,
  control,
  groupId,
  setValue,
  maxLength,
}) => {
  React.useEffect(() => {
    setValue(groupId, selected);
  }, [groupId, selected, setValue]);

  return (
    <Controller
      group={group}
      as={StyledAutoComplete}
      control={control}
      data={data}
      name={groupId}
      valueKey={valueKey}
      displayKey={displayKey}
      setSelected={setSelected}
      selected={selected}
      setValue={setValue}
      placeholder={placeholder}
      maxLength={maxLength}
    />
  );
};

export const SearchTypeAheadComponent: React.FC<AutoCompleteSelectMain> = ({
  data,
  valueKey,
  displayKey,
  setSelected,
  selected,
  placeholder,
  group,
  control,
  groupId,
  setValue,
  maxLength,
}) => {
  React.useEffect(() => {
    setValue(groupId, selected);
  }, [groupId, selected, setValue]);

  return (
    <Controller
      group={group}
      as={SearchTypeAhead}
      control={control}
      data={data}
      name={groupId}
      valueKey={valueKey}
      displayKey={displayKey}
      setSelected={setSelected}
      selected={selected}
      setValue={setValue}
      placeholder={placeholder}
      maxLength={maxLength}
    />
  );
};
export const KeyValueFilter: React.FC<FilterComponentProps> = ({
  groupId,
  control,
}) => {
  return (
    <Controller
      render={({ onChange, value }) => (
        <KeyValueSearch
          onChange={onChange}
          backgroundColor="light-gray"
          values={value}
          allFieldsRequired
        />
      )}
      control={control}
      name={groupId}
    />
  );
};
