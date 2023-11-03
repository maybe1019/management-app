import React from 'react';
import { Route, useRouteMatch, useHistory, useParams } from 'react-router-dom';
import { ConfirmModal, Text } from '@secberus/components';
import { AnyFn } from '@secberus/utils';
import { rolesApi } from '@secberus/services';
import { RolesForm } from './RolesForm.component';

interface FormOption {
  component: React.ElementType;
  name: string;
  callbackComponent?: React.ElementType | React.FC | (() => JSX.Element);
}

const EditRolesForm: React.FC<{ onRequestClose: AnyFn }> = ({
  onRequestClose,
}) => {
  const { roleId } = useParams<{ roleId: string }>();

  return (
    <RolesForm
      isEdit={true}
      roleId={roleId}
      onClose={onRequestClose}
      onSubmit={onRequestClose}
    />
  );
};

const AddRoleForm: React.FC<{ onRequestClose: AnyFn }> = ({
  onRequestClose,
}) => {
  return <RolesForm onClose={onRequestClose} onSubmit={onRequestClose} />;
};

const ConfirmDelete: React.FC<{ onRequestClose: AnyFn }> = ({
  onRequestClose,
}) => {
  const { roleId } = useParams<{ roleId: string }>();

  const [deleteRole, deleteRoleQuery] = rolesApi.useDeleteRoleMutation();

  const handleClose = async (confirmed: boolean) => {
    if (confirmed) {
      await deleteRole({
        roleId: roleId!,
      });
    }
    onRequestClose();
  };
  return (
    <>
      <ConfirmModal
        isVisible
        btnOpts={{
          color: 'white',
          variant: 'destructive',
        }}
        btnText="Confirm deletion"
        handleClose={handleClose}
        title="Delete role"
        loading={deleteRoleQuery.isLoading}
      >
        This role will be removed from all associated users on deletion.
        <br />
        <br />
        Are you sure you want to delete this role?
        <Text type="bold">This action cannot be reverted.</Text>
        <br />
        <br />
      </ConfirmModal>
    </>
  );
};

const formOptions: FormOption[] = [
  {
    component: AddRoleForm,
    name: 'add',
  },
  {
    component: EditRolesForm,
    name: 'edit',
  },
  {
    component: ConfirmDelete,
    name: 'delete',
  },
];

export const useFormRoutes = () => {
  const history = useHistory();
  const { path } = useRouteMatch();

  const handleFormClose = () => {
    history.push('/admin/roles');
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
            path={`${path}/form/${name}/(edit)?/:id?/callback`}
            key={name + '/callback'}
          >
            <CallbackComponent isOpen onRequestClose={handleFormClose} />
          </Route>
        );
      }

      acc.push(
        <Route path={`${path}/form/${name}/(edit)?/:roleId?`} key={name}>
          <Component isOpen onRequestClose={handleFormClose} />
        </Route>
      );

      return acc;
    },
    []
  );

  return formRoutes;
};
