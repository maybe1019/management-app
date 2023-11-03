import { Box } from '@chakra-ui/react';
import { BaseModal, Button, ConfirmModal, Text } from '@secberus/components';
import { Org, userApi } from '@secberus/services';
import { AnyFn } from '@secberus/utils';
import React from 'react';
import {
  Route,
  useRouteMatch,
  useHistory,
  useParams,
  generatePath,
} from 'react-router-dom';
import * as yup from 'yup';
import { Controller } from 'react-hook-form';
import styled from 'styled-components';
import { Form } from '../form-builder';
import { OrgPicker } from '../organization-management/OrgPicker.component';
import { RolePicker } from '../organization-management/RolePicker';
import { userManagementPaths } from './routes';
import { UserForm } from './user-form';
import { orgsSchema, updateUserFormSchema } from './user-form/Form.schema';

interface FormOption {
  component: React.ElementType;
  name: string;
  callbackComponent?: React.ElementType | React.FC | (() => JSX.Element);
}

interface UserPermFormProps {
  orgs: Org[];
  roles: string[];
}

const StyledModal = styled(BaseModal)`
  .modal-content {
    overflow: unset;
  }
`;

const FormButton = styled(Button)`
  margin-top: 48px;
`;

const EditUserForm: React.FC<{ onRequestClose: AnyFn }> = ({
  onRequestClose,
}) => {
  const { userId } = useParams<{ userId: string }>();

  return (
    <UserForm
      schema={updateUserFormSchema}
      userId={userId}
      onClose={onRequestClose}
      onSubmit={onRequestClose}
      fields={['name', 'family_name']}
      showDelete={false}
    />
  );
};

const requiredMessageRole = 'Please select a Role';
const requiredMessageOrg = 'Please select an Organization';

export const addPermissionsSchema: yup.SchemaOf<UserPermFormProps> = yup.object(
  {
    orgs: yup
      .array(yup.string().required())
      .min(1, requiredMessageOrg)
      .required(requiredMessageOrg)
      .of(orgsSchema),
    roles: yup
      .array(yup.string().required())
      .min(1, requiredMessageRole)
      .required(requiredMessageRole),
  }
);

const AddPermissionsForm: React.FC<{ onRequestClose: AnyFn }> = ({
  onRequestClose,
}) => {
  const { userId } = useParams<{ userId: string }>();

  const [add, addUserRolesQuery] = userApi.useAddUserRolesMutation();

  const { data: userOrgs = [] } = userApi.useGetUserOrgsQuery(
    {
      userid: userId,
    },
    { skip: true }
  );

  const onSubmit = async (formData: UserPermFormProps) => {
    await Promise.all(
      formData.orgs.map(async org => {
        return await add({
          userid: userId,
          orgId: org.id,
          idList: formData.roles,
        });
      })
    );

    onRequestClose();
  };

  return (
    <StyledModal
      title="Add permissions"
      handleClose={onRequestClose}
      variant="light"
      loading={addUserRolesQuery.isLoading}
    >
      <Box minWidth="528px">
        <Form<UserPermFormProps>
          schema={addPermissionsSchema}
          onSubmit={onSubmit}
          // TODO: fix default role "Viewer" not being auto populated on init
          // defaultValues={{
          //   roles: [
          //     rolesList?.results.filter(
          //       role => role.name === 'Viewer' && role.secberus_managed === true
          //     )[0]?.id,
          //   ],
          // }}
          defaultValues={{}}
        >
          <Controller
            render={props => (
              <OrgPicker
                onChange={props.onChange}
                exclude={userOrgs}
                selectLimit={5}
              />
            )}
            name="orgs"
          />
          <Controller
            render={props => (
              <Box paddingTop="24px">
                <RolePicker label="Roles" onChange={props.onChange} />
              </Box>
            )}
            name="roles"
          />
          <FormButton type="submit">Submit</FormButton>
        </Form>
      </Box>
    </StyledModal>
  );
};

const ConfirmDelete: React.FC<{ onRequestClose: AnyFn }> = ({
  onRequestClose,
}) => {
  const history = useHistory();
  const { userId } = useParams<{ userId: string }>();
  const [deleteUser, query] = userApi.useDeleteUserMutation();

  const onClose = async (confirm: boolean) => {
    const returnUrl = generatePath(
      `/admin${
        confirm ? userManagementPaths.base : userManagementPaths.editUser
      }`,
      !confirm
        ? {
            userId,
          }
        : undefined
    );
    if (confirm) deleteUser({ userid: userId });
    history.push(returnUrl);
  };
  return (
    <ConfirmModal
      title="Confirm deletion"
      isVisible
      handleClose={onClose}
      loading={query.isLoading}
    >
      Are you sure you want to delete this user?
      <Text type="bold">This action is non reversible.</Text>
    </ConfirmModal>
  );
};

const formOptions: FormOption[] = [
  {
    component: AddPermissionsForm,
    name: 'permissions',
  },
  {
    component: EditUserForm,
    name: 'name',
  },
  {
    component: ConfirmDelete,
    name: 'delete',
  },
];

export const useFormRoutes = () => {
  const history = useHistory();
  const { path } = useRouteMatch();
  const { userId } = useParams<{ userId: string }>();

  const handleFormClose = () => {
    const returnUrl = generatePath(`/admin${userManagementPaths.editUser}`, {
      userId,
    });

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
          <Component isOpen onRequestClose={handleFormClose} />
        </Route>
      );

      return acc;
    },
    []
  );

  return formRoutes;
};
