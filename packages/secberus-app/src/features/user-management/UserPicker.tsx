import React from 'react';
import { differenceBy } from 'lodash';
import { SearchComboInput, SearchComboInputProps } from '@secberus/components';
import { Plus, Search } from '@secberus/icons';
import { OrgUser, User, userApi, UserList } from '@secberus/services';
import { usePermissions } from '../../app/rbac/definitions';
import { UserForm } from './user-form';

export const UserPicker: React.FC<{
  exclude: Partial<User & OrgUser>[];
  onSelect: (user: User | null) => void;
  label?: string;
  placeholder?: string;
  noResultsComponent?: SearchComboInputProps['noResultsComponent'];
  withSearchIcon?: boolean;
}> = ({
  exclude,
  onSelect,
  label,
  placeholder,
  noResultsComponent,
  withSearchIcon,
}) => {
  const [userForm, setUserForm] = React.useState(false);
  const { canCreate } = usePermissions('users');
  const { data = { results: [] as UserList['results'] } } =
    userApi.useListUsersQuery({ limit: '300' });

  const filterExcluded = differenceBy(data.results, exclude, 'email');

  return (
    <>
      <SearchComboInput<UserList['results'][0]>
        items={filterExcluded}
        label={label ? label : 'Name'}
        onSelectItem={onSelect}
        menuPortalTarget={document.body}
        placeholder={placeholder ? placeholder : 'name@corporation.com'}
        noResultsComponent={noResultsComponent}
        icon={withSearchIcon ? <Search /> : undefined}
        anchorListItemProps={
          canCreate
            ? {
                text: 'Create new user',
                icon: <Plus height="24px" width="24px" />,
                onClick: () => setUserForm(true),
              }
            : undefined
        }
        itemToString={item => (item ? item.email! : '')}
        getItemFilterPredicate={(inputValue?) => {
          return item => {
            return (
              (!inputValue ||
                item!.email?.toLowerCase().includes(inputValue) ||
                item!.name?.toLowerCase().includes(inputValue) ||
                item!.family_name?.toLowerCase().includes(inputValue)) ??
              false
            );
          };
        }}
      />
      {userForm && (
        <UserForm
          onClose={() => {
            setUserForm(false);
          }}
          overlayZIndex={99999}
        />
      )}
    </>
  );
};
