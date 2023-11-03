import React from 'react';
import styled from 'styled-components';
import { Select, CheckedMultiSelect } from '@secberus/components';
import { differenceBy, isEqual } from 'lodash';
import { userApi, UserOrgRole } from '@secberus/services';

const OWNER_ROLE_ID = 'gDev2sRVZKoUM3UnbmFTWN';

const InputLabel = styled.label`
  ${({ theme }) => theme.typography['small-bold']};
  margin-left: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
`;

const RolePicker: React.FC<{
  defaultValue?: string[];
  onChange: (roles?: string[]) => void;
  label?: string;
  exclude?: UserOrgRole[];
  usePortal?: boolean;
  disableClickAwayListener?: boolean;
  supressDidMountOnChangeEvent?: boolean; // useful when using in table rows to avoid each row from firing initial event
}> = ({
  defaultValue,
  onChange,
  label,
  exclude = [],
  usePortal,
  disableClickAwayListener = false,
}) => {
  const { data: rolesList } = userApi.useListRolesQuery({
    sortBy: 'name',
    limit: '1000',
  });

  const [selected, setSelected] = React.useState<string[] | undefined>(
    defaultValue
  );

  const handleSelected = (v: any) => {
    setSelected(v);
    onChange(v);
  };

  if (selected?.includes(OWNER_ROLE_ID))
    return (
      <InputContainer>
        {label && <InputLabel>Role</InputLabel>}
        <Select
          value={{ id: 'Owner', label: 'Account owner' }}
          options={[{ id: 'Owner', label: 'Account owner' }]}
          displayKey="label"
          name="role-picker"
          id="role-picker"
          disabled
          closeMenuOnScroll
        />
      </InputContainer>
    );

  return (
    <CheckedMultiSelect
      name="role-picker"
      data={differenceBy(
        rolesList?.results,
        exclude.concat(
          rolesList?.results?.filter(
            r => r.name === 'Owner' && r.secberus_managed
          ) || []
        ),
        'id'
      )}
      label={label}
      displayKey="name"
      placeholder="Select roles"
      selectAllLabel="Select all roles"
      valueKey="id"
      value={selected}
      minItemsShown={5}
      onChange={handleSelected}
      menuPortalTarget={usePortal ? document.body : undefined}
      allowSelectAll={false}
      disableClickAwayListener={disableClickAwayListener}
    />
  );
};

const RolePickerMemoized = React.memo(RolePicker, isEqual);

export { RolePickerMemoized as RolePicker };
