import React from 'react';
import { Flex, Box, Divider } from '@chakra-ui/react';
import {
  LoadingOverlay,
  Button,
  Text,
  Checkbox,
  TableGW,
  RCTableExtendedColumnType,
  ButtonDropdown,
  ConfirmModal,
} from '@secberus/components';
import { Switch, useHistory, useLocation, useParams } from 'react-router-dom';
import { GetUserApiResponse, userApi, UserOrg } from '@secberus/services';
import { Delete, PlusDark, Settings } from '@secberus/icons';
import { ErrorBoundary } from '../../utils/wrappers/ErrorBoundaries';
import { RolePicker } from '../organization-management/RolePicker';
import { useAppDispatch } from '../../store/RootStateType';
import { useFormRoutes } from './formRoutes';

type UserOrgListData = UserOrg & { userId: string };

const RoleCell: React.FC<UserOrgListData> = ({ id, userId, roles }) => {
  const dispatch = useAppDispatch();
  const [setUserRoles] = userApi.useSetUserRolesMutation();

  const onChange = React.useCallback(
    async (roles?: string[]) => {
      if (!roles) return;

      const { data: userOrgs = [] } = await dispatch(
        userApi.endpoints.getUserOrgs.initiate({ userid: userId })
      );

      const org = await userOrgs.find(o => o.id === id);

      if (org) {
        await setUserRoles({
          userid: userId!,
          orgId: org.id,
          idList: roles,
        });
      }
    },
    [dispatch, id, setUserRoles, userId]
  );

  return (
    <RolePicker
      defaultValue={roles.map(({ id }) => id)}
      onChange={onChange}
      supressDidMountOnChangeEvent
    />
  );
};

const DeleteCell: React.FC<UserOrgListData> = ({ id, name, userId, roles }) => {
  const [confirm, setConfirm] = React.useState<boolean>(false);
  const [remove, query] = userApi.useRemoveUserRolesMutation();
  return (
    <>
      <Flex alignItems="center" justifyContent="center">
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
                userid: userId,
                orgId: id,
                idList: roles.map(role => role.id),
              });
            }
            setConfirm(false);
          }}
          isVisible={confirm}
          loading={query.isLoading}
        >
          Are you sure you want to remove this user from {name}?
        </ConfirmModal>
      )}
    </>
  );
};

const orgTableColumns: RCTableExtendedColumnType<UserOrgListData>[] = [
  {
    key: 'name',
    ellipsis: true,
    title: 'Organization',
    render: (_val, row, _idx) => (
      <Text type="xsmall-regular" color="extra-dark">
        {row.name}
      </Text>
    ),
  },
  {
    key: 'role',
    width: 370,
    title: 'Role',
    render: (_val, row, _idx) => <RoleCell {...row} />,
  },
  {
    key: 'delete',
    width: 64,
    render: (_val, row) => <DeleteCell {...row} />,
  },
];

const EditUser = () => {
  const { userId } = useParams<{ userId: string }>();

  const formRoutes = useFormRoutes();
  const history = useHistory();
  const location = useLocation();

  const {
    data: {
      account_owner,
      family_name,
      given_name,
      email,
      name,
      phone,
      zoneinfo,
      orgs = [],
    } = {} as GetUserApiResponse,
    ...getUserQuery
  } = userApi.useGetUserQuery({
    userid: userId,
  });
  const [updateUser, updateUserQuery] = userApi.useUpdateUserMutation();

  const onToggleAccountOwner = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    await updateUser({
      userid: userId,
      updateUser: {
        account_owner: e.target.checked,
        // @ts-expect-error just forward this - bad modeling
        family_name,
        given_name,
        name,
        phone,
        zoneinfo,
      },
    });
  };

  const listData = React.useMemo(
    () => orgs.map(v => ({ ...v, userId })),
    [orgs, userId]
  );

  if (getUserQuery.isLoading) return <LoadingOverlay />;

  return (
    <>
      <Box w="100%" h="100%">
        <Flex
          w="100%"
          wrap="wrap"
          direction="column"
          padding="32px"
          backgroundColor="#F1F6FA"
        >
          <Flex justifyContent="space-between" alignItems="center">
            <Flex direction="column">
              <Text type="medium">{`${name} ${family_name}`}</Text>
              <Text type="regular" color="gray">
                {email}
              </Text>
            </Flex>
            <ButtonDropdown
              variant="secondary"
              icon
              label={<Settings />}
              alignRight
              options={[
                {
                  id: 'edit',
                  name: 'Change name',
                  onClick: () => history.push(`${location.pathname}/form/name`),
                },
                {
                  id: 'delete',
                  name: 'Delete user',
                  destructive: true,
                  onClick: () =>
                    history.push(`${location.pathname}/form/delete`),
                },
              ]}
            />
          </Flex>
        </Flex>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          padding="16px 32px"
        >
          <Text type="small">Manage access</Text>
          {!account_owner && (
            <div>
              <Button to={`${location.pathname}/form/permissions`}>
                <PlusDark />
                &nbsp;Add permissions
              </Button>
            </div>
          )}
        </Flex>
        <Divider />
        <Box padding="32px">
          <Box
            padding="16px"
            borderStyle="solid"
            borderColor="#F1F6FA"
            borderWidth="1px"
            borderRadius="4px"
            backgroundColor={account_owner ? '#DEEEFE' : 'unset'}
          >
            <Checkbox
              label="Account owner"
              labelType="small-bold"
              onChange={onToggleAccountOwner}
              checked={account_owner}
              name="account_owner"
            />
            <Text type="small-regular">
              Account owners have unrestricted access to Secberus and can access
              all organizations.
            </Text>
          </Box>
          {!account_owner && (
            <Box marginTop="24px" paddingBottom="72px">
              <TableGW
                columns={orgTableColumns}
                data={listData}
                emptyText="No access"
              />
            </Box>
          )}
        </Box>
      </Box>
      {(updateUserQuery.isLoading || getUserQuery.isFetching) && (
        <LoadingOverlay />
      )}
      <Switch>{formRoutes}</Switch>
    </>
  );
};

const WithBoundary = () => (
  <ErrorBoundary>
    <EditUser />
  </ErrorBoundary>
);

export { WithBoundary as EditUserScreen };
