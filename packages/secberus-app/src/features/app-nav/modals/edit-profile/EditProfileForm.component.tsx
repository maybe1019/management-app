import _ from 'lodash';
import React from 'react';
import { Flex } from '@chakra-ui/react';
import { Button } from '@secberus/components';
import { userApi, UpdateUserApiArg } from '@secberus/services';
import { Form, FormInput } from '../../../form-builder';
import { useSelf } from '../../../../app/core/wrappers/WithFindSelf';
import { notifySuccess } from '../../../../store';
import { CallBackModalRenderedModalProps } from '../../../callback-modal/definitions';
import { updateUserProfileSchema } from './EditProfileForm.schema';
import { StyledModal } from './EditProfileForm.styled';
import { useFormFields } from './EditProfileForm.fields';

export const EditProfileModal: React.FC<CallBackModalRenderedModalProps> = ({
  onClose,
}) => {
  const { id: userid, name, family_name, ...restUserData } = useSelf();
  const formFields = useFormFields();
  const [updateSelf, updateSelfQuery] = userApi.useUpdateSelfMutation();

  const defaultValues = {
    name,
    family_name,
  };

  const onUpdate = async (formData: UpdateUserApiArg['updateUser']) => {
    await updateSelf({
      updateSelf: {
        ...restUserData,
        ...formData,
      },
    });

    onClose?.();
  };

  React.useEffect(() => {
    if (updateSelfQuery.isSuccess) {
      notifySuccess('Profile updated successfully');
    }
  }, [updateSelfQuery.isSuccess]);

  return (
    <StyledModal
      variant="light"
      title="Edit profile"
      handleClose={onClose}
      loading={updateSelfQuery.isLoading}
    >
      <Flex direction="column">
        <Form<UpdateUserApiArg['updateUser']>
          defaultValues={defaultValues}
          onSubmit={onUpdate}
          schema={updateUserProfileSchema}
          id="edit-profile-form"
          gridProps={{
            gap: '24px',
            templateColumns: 'repeat(2, 1fr)',
          }}
        >
          {formFields.map(({ name, label, ...rest }) => {
            if (rest.inputType === 'field') {
              return (
                <FormInput
                  noMargin
                  key={name}
                  name={name}
                  label={label ?? _.startCase(_.camelCase(name))}
                  gridItemOpts={{ colSpan: 1 }}
                  {...rest}
                />
              );
            }
            return null;
          })}
        </Form>
        <Flex pt="48px" sx={{ gap: 8 }}>
          <Button variant="primary" type="submit" form="edit-profile-form">
            Save Changes
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </Flex>
      </Flex>
    </StyledModal>
  );
};
