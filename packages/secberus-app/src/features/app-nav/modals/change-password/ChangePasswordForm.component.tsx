import _ from 'lodash';
import React, { useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { Button } from '@secberus/components';
import { changePassword } from '@secberus/services';
import { createEnvAwareLogger } from '@secberus/utils';
import { Form, FormInput } from '../../../form-builder';
import { useSelf } from '../../../../app/core/wrappers/WithFindSelf';
import { notifyError, notifySuccess } from '../../../../store';
import { useBullUnicodeChars } from '../../../auth/hooks/useBullUnicodeChars';
import { CallBackModalRenderedModalProps } from '../../../callback-modal/definitions';
import { changePasswordFormSchema } from './ChangePasswordForm.schema';
import { StyledModal } from './ChangePasswordForm.styled';
import {
  useFormFields,
  ChangePasswordFormData,
} from './ChangePasswordForm.fields';

export const ChangePasswordForm: React.FC<CallBackModalRenderedModalProps> = ({
  onClose,
}) => {
  const logger = createEnvAwareLogger();
  const self = useSelf();
  const formFields = useFormFields();
  const [isLoading, setIsLoading] = useState(false);
  const chars = useBullUnicodeChars();
  const placeholder = React.useMemo(() => chars, [chars]);
  const [defaultValues, setDefaultValues] = useState({});

  const resetForm = () => {
    setDefaultValues({});
  };

  const onUpdate = async (formData: ChangePasswordFormData) => {
    setIsLoading(true);

    try {
      const { oldPassword, newPassword } = formData;
      if (!self) throw new Error('Something went wrong signing in');
      const response = await changePassword({ oldPassword, newPassword });
      if (typeof response === 'string' && response === 'SUCCESS') {
        notifySuccess('Password updated successfully');
        onClose && onClose();
      } else {
        notifyError(response.message);
        resetForm();
      }
      setIsLoading(false);
    } catch (e) {
      logger.error(e);
      resetForm();
    }
  };

  return (
    <StyledModal
      variant="light"
      title="Change password"
      handleClose={onClose}
      loading={isLoading}
    >
      <Flex direction="column">
        <Form<ChangePasswordFormData>
          defaultValues={defaultValues}
          onSubmit={onUpdate}
          schema={changePasswordFormSchema}
          id="change-password-form"
          gridProps={{
            gap: '24px',
            templateColumns: 'repeat(1, 1fr)',
          }}
        >
          {formFields.map(({ name, label, ...rest }) => {
            if (rest.inputType === 'field') {
              return (
                <FormInput
                  noMargin
                  key={name}
                  type="password"
                  name={name}
                  placeholder={placeholder}
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
          <Button variant="primary" type="submit" form="change-password-form">
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
