import { Button, LoadingOverlay } from '@secberus/components';
import {
  rolesApi,
  CreateRoleApiArg,
  UpdateRoleApiArg,
  AccessPolicy,
} from '@secberus/services';
import React from 'react';
import { useIsLoading } from '@secberus/utils';
import { Box } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { FormInput, FormTextArea, Form } from '../../form-builder';
import { AccessPolicyPicker } from '../AccessPolicyPicker';
import { updateRoleSchema, createRoleSchema } from './RolesForm.schema';
import { StyledModal, ButtonContainer } from './RoleForm.styled';
import { RoleFormProps } from './definitions';

export const RolesForm: React.FC<RoleFormProps> = ({
  isEdit,
  roleId,
  onClose,
  onSubmit,
}) => {
  const history = useHistory();

  const { data: formData, ...query } = rolesApi.useGetRoleQuery(
    {
      // @ts-expect-error won't run if undf
      roleId: roleId,
    },
    { skip: !roleId }
  );

  const [createRole, createRoleQuery] = rolesApi.useCreateRoleMutation();
  const [updateRole, updateRoleQuery] = rolesApi.useUpdateRoleMutation();

  const onCreate = async (_formData: CreateRoleApiArg['createRole']) => {
    const data = await createRole({
      createRole: _formData,
    });
    onSubmit && onSubmit(data);
    onClose && onClose();
  };

  const onUpdate = async (_formData: UpdateRoleApiArg['updateRole']) => {
    const data = await updateRole({
      updateRole: _formData,
      roleId: roleId!,
    });
    onSubmit && onSubmit(data);
    onClose && onClose();
  };

  const defaultValues = {
    ...formData,
    policy_ids: formData?.policies?.map((e: AccessPolicy) => e.id),
  };

  const isLoading = useIsLoading([
    query.isLoading,
    createRoleQuery.isLoading,
    updateRoleQuery.isLoading,
  ]);

  if (isLoading) return <LoadingOverlay />;

  return (
    <StyledModal
      variant="light"
      title={isEdit ? 'Edit role' : 'Add role'}
      handleClose={onClose}
      loading={isLoading}
    >
      <Box minWidth="528px">
        <Form
          defaultValues={defaultValues}
          onSubmit={isEdit ? onUpdate : onCreate}
          schema={isEdit ? updateRoleSchema : createRoleSchema}
          id="accessRole-form"
          gridProps={{
            gap: '20px',
            templateColumns: 'repeat(1, 1fr)',
          }}
        >
          <FormInput
            key="name"
            name="name"
            label="Name"
            placeholder="Administrator"
            noMargin
            gridItemOpts={{ colSpan: 1, rowSpan: 5 }}
          />
          <FormTextArea
            key="description"
            name="description"
            label="Description"
            placeholder="Short description to describe role"
            noMargin
            gridItemOpts={{ colSpan: 1, rowSpan: 4 }}
          />
          <Controller
            render={props => {
              return (
                <AccessPolicyPicker
                  value={props.value}
                  onChange={props.onChange}
                />
              );
            }}
            name="policy_ids"
          />
          <ButtonContainer>
            <Button variant="primary" type="submit" form="accessRole-form">
              {isEdit ? 'Save' : 'Create'}
            </Button>
            {isEdit && (
              <Button
                variant="destructive"
                type="submit"
                form="accessRole-form"
                onClick={() =>
                  history.push(`/admin/roles/form/delete/${roleId}`)
                }
              >
                Remove role
              </Button>
            )}
          </ButtonContainer>
        </Form>
      </Box>
    </StyledModal>
  );
};
