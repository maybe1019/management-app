import { BaseModal, Button } from '@secberus/components';
import {
  organizationApi,
  UpdateOrgApiArg,
  CreateOrgApiArg,
} from '@secberus/services';
import React from 'react';
import startCase from 'lodash/startCase';
import camelCase from 'lodash/camelCase';
import { Box } from '@chakra-ui/react';
import { FormInput, Form } from '../../form-builder';
import { OrgFormProps } from './definitions';
import { useCreateOrgFormFields } from './OrgForm.fields';
import { updateCreateOrgSchema } from './OrgForm.schema';

export const OrgForm: React.FC<OrgFormProps> = ({
  orgId,
  onClose,
  onSubmit,
  schema = updateCreateOrgSchema,
  fields = ['name'],
}) => {
  const isEdit = !!orgId;

  const { data: formData, ...query } = organizationApi.useGetOrgQuery(
    {
      // @ts-expect-error won't run if undf
      orgid: orgId,
    },
    { skip: !orgId }
  );

  const [createOrg, { ...createOrgQuery }] =
    organizationApi.useCreateOrgMutation();
  const [updateOrg, { ...updateOrgQuery }] =
    organizationApi.useUpdateOrgMutation();

  const onCreate = async (_formData: CreateOrgApiArg['createOrg']) => {
    const data = await createOrg({
      createOrg: _formData,
    });
    onSubmit && onSubmit(data);
    // @ts-expect-error incorrectly typed CreateOrgApiResponse
    onClose && onClose(data?.data?.id);
  };

  const onUpdate = async (_formData: UpdateOrgApiArg['createOrg']) => {
    const data = await updateOrg({
      createOrg: _formData,
      orgid: orgId!,
    });
    onSubmit && onSubmit(data);
    onClose && onClose();
  };

  const orgFormFields = useCreateOrgFormFields();
  const selectedFields = React.useMemo(
    () => orgFormFields.filter(f => fields.includes(f.name)),
    [fields, orgFormFields]
  );
  return (
    <BaseModal
      variant="light"
      title={isEdit ? 'Edit organization' : 'Create organization'}
      handleClose={() => {
        if (typeof onClose === 'function') {
          onClose(orgId);
        }
      }}
      loading={
        query.isLoading || createOrgQuery.isLoading || updateOrgQuery.isLoading
      }
    >
      <Box minWidth="576px">
        <Form
          defaultValues={formData}
          onSubmit={isEdit ? onUpdate : onCreate}
          schema={schema}
          id="org-form"
          gridProps={{
            gap: '24px',
            templateColumns: 'repeat(1, 1fr)',
          }}
        >
          {selectedFields.map(({ name, label, ...rest }) => {
            if (rest.inputType === 'field') {
              return (
                <FormInput
                  key={name}
                  name={name}
                  label={label ?? startCase(camelCase(name))}
                  placeholder={rest.placeholder ?? startCase(camelCase(name))}
                  noMargin
                  gridItemOpts={{ colSpan: 1, rowSpan: 5 }}
                  {...rest}
                />
              );
            }
            return null;
          })}
          <Button variant="primary" type="submit" form="org-form">
            {isEdit ? 'Save changes' : 'Create'}
          </Button>
        </Form>
      </Box>
    </BaseModal>
  );
};
