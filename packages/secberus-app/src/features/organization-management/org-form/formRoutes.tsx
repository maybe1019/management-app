import React from 'react';
import { Box } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';
import {
  Route,
  useRouteMatch,
  useHistory,
  generatePath,
} from 'react-router-dom';
import styled from 'styled-components';
import * as yup from 'yup';
import {
  BaseModal,
  Button,
  ConfirmModal,
  ListItem,
  Text,
} from '@secberus/components';
import {
  GetOrgUsersApiResponse,
  organizationApi,
  UserOrgRole,
  userApi,
} from '@secberus/services';
import { AnyFn } from '@secberus/utils';
import { Form } from '../../form-builder';
import { UserPicker } from '../../user-management';
import { orgManagementPaths } from '../routes';
import { RolePicker } from '../RolePicker';
import { settingsPaths } from '../../settings/routes';
import { orgMemberPaths } from '../../settings/Members/routes';
import { adminPaths } from '../../admin-panel/routes';
import { useGetCurrentOrgId } from '../../../app/core/useGetCurrentOrg';
import { usePermissions } from '../../../app/rbac/definitions';
import { OrgForm } from './OrgForm.component';

const StyledModal = styled(BaseModal)`
  .modal-content {
    overflow: unset;
  }
`;

const FormButton = styled(Button)`
  margin-top: 48px;
`;

const ListItemWithPadding = styled(ListItem)`
  padding: 12px 16px;
`;

interface FormOption {
  component: React.ElementType;
  name: string;
  callbackComponent?: React.ElementType | React.FC | (() => JSX.Element);
}

const EditOrgForm: React.FC<{ onRequestClose: AnyFn }> = ({
  onRequestClose,
}) => {
  const orgId = useGetCurrentOrgId();
  return (
    <OrgForm orgId={orgId} onClose={onRequestClose} onSubmit={onRequestClose} />
  );
};

const requiredMessage = 'This is required';

export const AddMemberSchema: yup.SchemaOf<{
  userId: string;
  roles: string[];
}> = yup.object({
  userId: yup.string().required(requiredMessage),
  roles: yup
    .array(yup.string().required())
    .min(1, requiredMessage)
    .required(requiredMessage),
});

const AddMemberForm: React.FC<{
  onRequestClose: AnyFn;
  isAdminRoute?: boolean;
}> = ({ onRequestClose, isAdminRoute }) => {
  const orgId = useGetCurrentOrgId();
  const { canCreate } = usePermissions('users');

  const {
    data: orgUsers = { results: [] as GetOrgUsersApiResponse['results'] },
  } = organizationApi.useGetOrgUsersQuery({
    orgid: orgId,
    limit: '1000',
  });

  const [add, addUserRolesQuery] = userApi.useAddUserRolesMutation();

  const { data: org, ...getOrgQuery } = organizationApi.useGetOrgQuery({
    orgid: orgId,
  });

  const modalTitle = React.useMemo<string>(() => {
    if (isAdminRoute) return 'Add members';
    return `Add member to ${org?.name ?? 'organization'}`;
  }, [isAdminRoute, org?.name]);

  const onSubmit = async (formData: { userId: string; roles: string[] }) => {
    await add({
      userid: formData.userId,
      orgId: org!.id,
      idList: formData.roles,
    });

    onRequestClose(true);
  };

  return (
    <StyledModal
      title={modalTitle}
      handleClose={onRequestClose}
      variant="light"
      loading={getOrgQuery.isLoading || addUserRolesQuery.isLoading}
    >
      <Box minWidth="528px">
        <Form<{ userId: string; roles: UserOrgRole[] }>
          schema={AddMemberSchema}
          onSubmit={onSubmit}
        >
          <Controller
            name="userId"
            render={props => (
              <UserPicker
                withSearchIcon={!isAdminRoute}
                label={!isAdminRoute ? 'Select user' : undefined}
                placeholder={!isAdminRoute ? 'Find user' : undefined}
                exclude={orgUsers.results}
                onSelect={user => {
                  props.onChange(user?.id);
                }}
                noResultsComponent={
                  !isAdminRoute && !canCreate ? (
                    <ListItemWithPadding>
                      <Text type="small-bold">No matches found</Text>
                      <Text type="xsmall-regular">
                        Contact an account owner to add new users.
                      </Text>
                    </ListItemWithPadding>
                  ) : undefined
                }
              />
            )}
          />
          <Controller
            name="roles"
            render={props => (
              <Box paddingTop="24px">
                <RolePicker
                  label={isAdminRoute ? 'Roles' : 'Assign roles'}
                  onChange={props.onChange}
                />
              </Box>
            )}
          />
          <FormButton type="submit">
            {!isAdminRoute ? 'Add member' : 'Submit'}
          </FormButton>
        </Form>
      </Box>
    </StyledModal>
  );
};

const ConfirmDelete: React.FC<{ onRequestClose: AnyFn }> = ({
  onRequestClose,
}) => {
  const orgId = useGetCurrentOrgId();
  const [deleteOrganization, deleteOrganizationQuery] =
    organizationApi.useDeleteOrgMutation();

  const handleClose = (confirmed: boolean) => {
    if (confirmed) {
      deleteOrganization({
        orgid: orgId,
      });
    }
    onRequestClose(!confirmed);
  };
  return (
    <ConfirmModal
      isVisible
      handleClose={handleClose}
      title="Delete organization"
      loading={deleteOrganizationQuery.isLoading}
    >
      Are you sure you want to delete this organization?
      <Text type="bold">This action cannot be reverted.</Text>
    </ConfirmModal>
  );
};

const formOptions: FormOption[] = [
  {
    component: AddMemberForm,
    name: 'member',
  },
  {
    component: EditOrgForm,
    name: 'name',
  },
  {
    component: ConfirmDelete,
    name: 'delete',
  },
];

export const useFormRoutes = () => {
  const history = useHistory();
  const { url, path } = useRouteMatch();
  const orgId = useGetCurrentOrgId();
  const isSettingsPage = React.useMemo(
    () =>
      url.indexOf(settingsPaths.base + orgMemberPaths.memberManagement) !== -1,
    [url]
  );

  const editPath = React.useMemo(
    () =>
      isSettingsPage
        ? orgMemberPaths.memberManagement
        : orgManagementPaths.editOrg,
    [isSettingsPage]
  );

  const listPath = React.useMemo(
    () =>
      isSettingsPage
        ? orgMemberPaths.memberManagement
        : orgManagementPaths.orgManagement,
    [isSettingsPage]
  );

  /**
   *
   * @param backToOrg - should the user be redirected back to the org being viewed
   */
  const handleFormClose = (backToOrg?: boolean) => {
    const returnUrl = generatePath(
      `${isSettingsPage ? settingsPaths.base : adminPaths.admin}${
        backToOrg ? editPath : listPath
      }`,
      backToOrg
        ? {
            orgId,
          }
        : undefined
    );

    history.push(returnUrl);
  };

  const formRoutes = formOptions.reduce(
    (
      acc: JSX.Element[],
      { component: Component, callbackComponent: CallbackComponent, name }
    ) => {
      if (CallbackComponent) {
        acc.push(
          <Route
            exact
            path={`${path}/form/${name}/callback`}
            key={name + '/callback'}
          >
            <CallbackComponent isOpen onRequestClose={handleFormClose} />
          </Route>
        );
      }

      acc.push(
        <Route path={`${path}/form/${name}`} key={name}>
          <Component
            isOpen
            onRequestClose={handleFormClose}
            isAdminRoute={!isSettingsPage}
          />
        </Route>
      );

      return acc;
    },
    []
  );

  return formRoutes;
};
