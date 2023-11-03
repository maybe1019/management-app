import React from 'react';
import { Flex } from '@chakra-ui/react';
import _ from 'lodash';
import { Button, BaseModal } from '@secberus/components';
import styled from 'styled-components';
import {
  userApi,
  User,
  selectEmail,
  UpdateUserApiArg,
  CreateUserApiArg,
  CreateUserApiResponse,
} from '@secberus/services';
import {
  createEnvAwareLogger,
  parseMaybeBool,
  sortArrayFromKeys,
} from '@secberus/utils';
import { useTypedSelector } from '../../../store/RootStateType';
import {
  Form,
  FormCheckbox,
  FormInput,
  FormRadioGroup,
} from '../../form-builder';
import { useFormFields } from './Form.fields';
import { UserFormProps } from './definitions';
import { createUserFormSchema } from './Form.schema';

export const StyledModal = styled(BaseModal)`
  min-width: 450px;
  width: 40%;
`;

const logger = createEnvAwareLogger();

export const UserForm: React.FC<UserFormProps> = ({
  onClose,
  onSubmit,
  data,
  schema = createUserFormSchema,
  userId,
  fields = ['name', 'family_name', 'username'],
  className,
  overlayZIndex,
  showDelete = true,
}) => {
  const currentUser = useTypedSelector(selectEmail);
  const _userId = userId ?? data?.id;
  const isEdit = !!_userId;

  const { data: formData, ...getUserQuery } = userApi.useGetUserQuery(
    {
      // @ts-expect-error won't run if undf
      userid: _userId,
    },
    { skip: !_userId }
  );

  const formFields = useFormFields({
    isEdit: !!userId,
  });
  const [createUser, { isLoading: isCreateUserLoading }] =
    userApi.useCreateUserMutation();
  const [updateUser, { isLoading: isUpdateUserLoading }] =
    userApi.useUpdateUserMutation();
  const [deleteUser, { isLoading: isDeleteLoading }] =
    userApi.useDeleteUserMutation();

  const onCreate = (_formData: CreateUserApiArg['createUser']) => {
    const asyncFn = async (user: CreateUserApiArg['createUser']) => {
      try {
        const { data } = (await createUser({
          createUser: {
            ...user,
            account_owner: parseMaybeBool(user.account_owner),
          },
        })) as unknown as {
          data: CreateUserApiResponse;
        };
        onSubmit && onSubmit(data);
        onClose && onClose();
      } catch (e) {
        logger.error(e);
      }
    };
    asyncFn(_formData);
  };

  const onUpdate = (_formData: UpdateUserApiArg['updateUser']) => {
    const asyncFn = async (
      user: UpdateUserApiArg['updateUser'],
      userId: NonNullable<User['id']>
    ) => {
      try {
        await updateUser({
          updateUser: {
            ...user,
            account_owner: parseMaybeBool(formData!.account_owner!),
          },
          userid: userId,
        });

        onClose && onClose();
      } catch (e) {
        logger.error(e);
      }
    };
    asyncFn(_formData, userId!);
  };

  const onDelete = async () => {
    try {
      await deleteUser({ userid: userId! });
    } catch (e) {
      logger.error(e);
    }
    onClose && onClose();
  };

  const selectedFields = React.useMemo(
    () =>
      sortArrayFromKeys(
        fields,
        formFields.filter(f => fields.includes(f.name)),
        'name'
      ),
    [fields, formFields]
  );

  return (
    <StyledModal
      title={formData ? 'Edit user' : 'Create user'}
      handleClose={onClose}
      variant="light"
      loading={
        isCreateUserLoading ||
        isUpdateUserLoading ||
        isDeleteLoading ||
        getUserQuery.isLoading
      }
      className={className}
      overlayZIndex={overlayZIndex}
    >
      <Flex direction="column">
        <Form<CreateUserApiArg['createUser'] | UpdateUserApiArg['updateUser']>
          defaultValues={{
            ...formData,
            account_owner: parseMaybeBool(formData?.account_owner),
          }}
          onSubmit={isEdit ? onUpdate : onCreate}
          schema={schema}
          id="user-form"
          gridProps={{
            gap: '24px',
            templateColumns: 'repeat(4, 1fr)',
          }}
        >
          {selectedFields.map(({ name, label, ...rest }) => {
            if (rest.inputType === 'checkbox')
              return (
                <FormCheckbox
                  key={name}
                  name={name}
                  label={label ?? _.startCase(_.camelCase(name))}
                  gridItemOpts={{
                    colSpan: 2,
                    rowSpan: 2,
                    justifyContent: 'center',
                  }}
                  {...rest}
                />
              );
            if (rest.inputType === 'field')
              return (
                <FormInput
                  key={name}
                  name={name}
                  label={label ?? _.startCase(_.camelCase(name))}
                  placeholder={
                    rest.placeholder ?? _.startCase(_.camelCase(name))
                  }
                  noMargin
                  gridItemOpts={{ colSpan: isEdit ? 4 : 2, rowSpan: 2 }}
                  {...rest}
                />
              );
            if (rest.inputType === 'radio')
              return (
                <FormRadioGroup
                  key={name}
                  name={name}
                  options={rest.options}
                  label={label}
                  gridItemOpts={{ colSpan: 2, rowSpan: 2 }}
                  {...rest}
                />
              );
            return null; // this code will never be reached
          })}
        </Form>
        <Flex pt="24px" sx={{ gap: '8px' }}>
          <Button variant="primary" type="submit" form="user-form">
            {isEdit ? 'Save changes' : 'Create'}
          </Button>
          {showDelete && !!userId && formData?.email !== currentUser && (
            <Button variant="destructive" onClick={onDelete}>
              Delete user
            </Button>
          )}
        </Flex>
      </Flex>
    </StyledModal>
  );
};
