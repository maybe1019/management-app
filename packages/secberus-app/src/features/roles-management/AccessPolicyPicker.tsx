import React from 'react';
import { CheckedMultiSelect } from '@secberus/components';
import {
  AccessPolicy,
  accessPoliciesApi,
  AccessPolicyList,
} from '@secberus/services';

type AccessPolicyPickerProps = {
  onChange: (accessPolicy?: any[]) => void;
  value: string[];
};
export const AccessPolicyPicker: React.FC<AccessPolicyPickerProps> = ({
  onChange,
  value,
}) => {
  const {
    data: accessPolicies = { results: [] as AccessPolicyList['results'] },
  } = accessPoliciesApi.useListAccessPoliciesQuery({ limit: '300' });

  const filteredPolicies = accessPolicies.results.map((e: AccessPolicy) => {
    return { name: e.name, id: e.id };
  });

  return (
    <CheckedMultiSelect
      data={filteredPolicies}
      label="Access Policies"
      displayKey="name"
      placeholder="Select policies"
      selectAllLabel="Select all policies"
      valueKey="id"
      value={value}
      minItemsShown={5}
      onChange={onChange}
      allowSelectAll={false}
    />
  );
};
