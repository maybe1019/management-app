import React from 'react';
import { Flex } from '@chakra-ui/react';
import {
  Text,
  Button,
  RCTableExtendedColumnType,
  ConfirmModal,
} from '@secberus/components';
import { Delete } from '@secberus/icons';
import { OrgUser, userApi } from '@secberus/services';
import { symDiff } from '@secberus/utils';
import { debounce } from 'lodash';
import { RolePicker } from '../RolePicker';

const RoleCell: React.FC<OrgUser & { orgId: string }> = ({
  id,
  orgId,
  roles,
}) => {
  const [setUserRoles] = userApi.useSetUserRolesMutation();

  const onChange = React.useCallback(
    async (nextRoleIds?: string[]) => {
      const currRoleIds = roles?.map(r => r.id);

      const skipNoChange =
        symDiff([...(nextRoleIds ?? [])], [...(currRoleIds ?? [])]).length ===
        0;

      if (skipNoChange || !nextRoleIds) return;

      await setUserRoles({
        userid: id!,
        orgId,
        idList: nextRoleIds,
      });
    },
    [id, orgId, roles, setUserRoles]
  );

  const handleChange = React.useCallback(
    debounce((...args) => onChange(...args), 1000),
    [onChange]
  );

  return (
    <RolePicker
      defaultValue={roles?.map(({ id }) => id)}
      onChange={handleChange}
      supressDidMountOnChangeEvent
    />
  );
};

const DeleteCell: React.FC<OrgUser & { orgId: string }> = ({
  id,
  orgId,
  roles,
}) => {
  const [confirm, setConfirm] = React.useState(false);
  const [remove, removeUserRolesQuery] = userApi.useRemoveUserRolesMutation();

  return (
    <>
      <Flex justify="center" align="center">
        <Button
          icon
          variant="secondary"
          size="small"
          onClick={() => setConfirm(true)}
        >
          <Delete />
        </Button>
      </Flex>
      {confirm && (
        <ConfirmModal
          title="Confirm remove"
          handleClose={async (confirmed: boolean) => {
            if (confirmed) {
              await remove({
                userid: id,
                orgId: orgId,
                idList: roles?.map(role => role.id) || [],
              });
            }
            setConfirm(false);
          }}
          isVisible={confirm}
          loading={removeUserRolesQuery.isLoading}
        >
          Are you sure you want to remove this user from the org?
        </ConfirmModal>
      )}
    </>
  );
};

export const orgUsersColumns: RCTableExtendedColumnType<
  OrgUser & { orgId: string }
>[] = [
  {
    key: 'name',
    dataIndex: 'name',
    title: 'Name',
    sort: true,
    width: 347,
    render: (_val, row, _idx) => {
      return (
        <Text type="xsmall-regular" color="extra-dark">
          {row.name + ' ' + row.family_name}
        </Text>
      );
    },
  },
  {
    key: 'email',
    sort: true,
    title: 'Email',
    dataIndex: 'email',
    render: (_val, row, _idx) => {
      return (
        <Text type="xsmall-regular" color="extra-dark">
          {row.email}
        </Text>
      );
    },
  },
  {
    key: 'role',
    title: 'Role',
    width: 370,
    dataIndex: 'account_owner',
    render: (_val, row, _idx) => <RoleCell {...row} />,
  },
  {
    key: 'delete',
    width: 80,
    render: (_val, row, _idx) => {
      const hasOwnerRole = row?.roles?.find(
        r => r.name === 'Owner' && r.secberus_managed
      );

      if (!hasOwnerRole) {
        return <DeleteCell {...row} />;
      }
    },
  },
];
