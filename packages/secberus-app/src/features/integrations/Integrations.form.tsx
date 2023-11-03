import React from 'react';
import _ from 'lodash';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useIsLoading, useModalToggle } from '@secberus/utils';
import { EmailDark } from '@secberus/icons';
import {
  IntegrationInput,
  Button,
  ConfirmModal,
  Text,
  AlertBox,
} from '@secberus/components';
import { IntegrationType } from '@secberus/components';
import { integrationsApi } from '@secberus/services';
import { Box } from '@chakra-ui/react';
import {
  useCreateIntegration,
  useDeleteIntegration,
  useUpdateIntegration,
} from './hooks';
import { useIntegrationHelper } from './Integrations.helper';
import { IntegrationsFormProps } from './Integrations.types';
import {
  ButtonsContainer,
  StyledForm,
  StyledModal,
  StyledConfirmModal,
  CenterText,
} from './Integrations.styled';
import useIntegrationsFormSchema from './integrations.form.schema';
import {
  shouldTriggerModalWarning,
  getErrorMessage,
  isUrlVerificationError,
} from './Integrations.utils';

export const IntegrationsForm: React.FC<IntegrationsFormProps> = ({
  integrationType,
  formData,
  closeCallback,
  submitCallback,
  webhookTitle,
  visible,
  modalTitle = 'Integrations',
}) => {
  // CRUD normal integrations
  const {
    handleCreateIntegration,
    isCreatingIntegration,
    failCreateIntegrationError,
  } = useCreateIntegration();
  const {
    handleUpdateIntegration,
    isUpdatingIntegration,
    failUpdateIntegrationError,
    successUpdateIntegration,
  } = useUpdateIntegration();
  const {
    handleDeleteIntegration,
    isDeletingIntegration,
    successDeleteIntegration,
  } = useDeleteIntegration();
  // Splunk Integrations (Diff endpoint)
  const [createSplunk, createSplunkMutation] =
    integrationsApi.useCreateSplunkMutation();
  const [deleteSplunk, deleteSplunkMutation] =
    integrationsApi.useDeleteSplunkMutation();
  const [createSumoLogic, createSumoLogicMutation] =
    integrationsApi.useCreateSumoLogicMutation();
  const [deleteSumoLogic, deleteSumoLogicMutation] =
    integrationsApi.useDeleteSumoLogicMutation();

  const [deleteModal, toggleDeleteModal] = useModalToggle();
  const [emailModalVisible, toggleEmailModal] = useModalToggle();
  const [emailString, setEmailString] = React.useState<string>('');

  const [formType, setFormType] = React.useState<IntegrationType>();
  React.useEffect(() => {
    if (integrationType) {
      setFormType(
        integrationType.toLowerCase() as `${Lowercase<typeof integrationType>}`
      );
    }
  }, [integrationType]);

  // Deduce if there are default values and if so spread spec to match the
  // form schema (flat object) vs the aws response (response: {spec: {etc}})
  const { isEdit, defaultFormData } = React.useMemo(() => {
    const edit = typeof formData !== 'undefined';
    let defaultFormDataBuilder = {} as any;
    if (edit) {
      switch (formData?.type) {
        case 'SPLUNK':
          defaultFormDataBuilder = {
            id: formData?.id,
            name: formData?.name,
            index: formData?.index,
            splunk_url: formData?.splunk_url,
            hec_token: formData?.hec_token,
          };
          break;
        case 'SUMOLOGIC':
          defaultFormDataBuilder = {
            name: formData?.name,
            id: formData?.id,
            url: formData?.url,
          };
          break;
        default:
          defaultFormDataBuilder = {
            name: formData?.name,
            id: formData?.id,
            ...formData?.spec,
          };
          break;
      }
    }
    if (defaultFormDataBuilder?.emails) {
      defaultFormDataBuilder.emails = []
        .concat(defaultFormDataBuilder.emails)
        .join(',');
    }
    return { isEdit: edit, defaultFormData: defaultFormDataBuilder };
  }, [formData]);

  const validationSchema = useIntegrationsFormSchema(formType, isEdit);

  const { errors, register, handleSubmit, control } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
    defaultValues: defaultFormData,
  });
  // TODO: strongly type data
  const buildIntegrationSpecInfo = (data: Record<string, any>) => {
    const spec = _.cloneDeep(data);
    if (spec.name) {
      delete spec.name;
    }
    if (spec.integrationId) {
      delete spec.integrationId;
    }
    return spec;
  };

  // TODO: strongly type data
  const onSubmit = (data: any) => {
    let builtData, content, res;
    const submit = async () => {
      switch (integrationType) {
        case 'SPLUNK':
          res = await createSplunk({ createSplunk: data }).unwrap();
          if ('error' in res) return;
          break;
        case 'SUMOLOGIC':
          res = await createSumoLogic({ createSumoLogic: data }).unwrap();
          if ('error' in res) return;
          break;
        default:
          builtData = buildIntegrationSpecInfo(data);
          content = {
            createIntegration: {
              spec: {
                ...builtData,
              },
              name: data.name,
              type: integrationType || 'HTTP',
            },
          };
          // @ts-expect-error poorly typed
          await handleCreateIntegration(content);
          break;
      }
      switch (integrationType) {
        case 'EMAIL': {
          setEmailString(data.emails.join(', ') || 'the submitted email(s)');
          toggleEmailModal();
          break;
        }
        default: {
          submitCallback();
        }
      }
    };
    submit();
  };

  const onDelete = async (confirmed: boolean) => {
    if (confirmed) {
      switch (integrationType) {
        case 'SPLUNK':
          await deleteSplunk({ integrationId: defaultFormData?.id });
          break;
        case 'SUMOLOGIC':
          await deleteSumoLogic({ integrationId: defaultFormData?.id });
          break;
        default:
          await handleDeleteIntegration({
            integrationId: defaultFormData.id,
          });
          break;
      }
    }
    toggleDeleteModal();
  };

  // TODO: strongly type data
  const onUpdate = (data: any) => {
    if (typeof data === 'undefined') return;

    const dataBuilder = {
      updateIntegration: {
        name: data.name,
        spec: buildIntegrationSpecInfo(data),
      },
    };

    const update = async () => {
      await handleUpdateIntegration({
        integrationId: defaultFormData.id,
        ...dataBuilder,
      });
    };
    update();
  };

  const { formHelperData, title } = useIntegrationHelper(
    errors,
    register,
    formType,
    isEdit,
    control
  );

  const isLoading = useIsLoading([
    isCreatingIntegration,
    isUpdatingIntegration,
    isDeletingIntegration,
    deleteSplunkMutation.isLoading,
    createSplunkMutation.isLoading,
    deleteSumoLogicMutation.isLoading,
    createSumoLogicMutation.isLoading,
  ]);

  React.useEffect(() => {
    // onSubmit handles createIntegration success case
    if (
      successUpdateIntegration ||
      successDeleteIntegration ||
      createSplunkMutation.isSuccess ||
      deleteSplunkMutation.isSuccess
    ) {
      submitCallback();
    }
  }, [
    submitCallback,
    successDeleteIntegration,
    successUpdateIntegration,
    createSplunkMutation.isSuccess,
    deleteSplunkMutation.isSuccess,
  ]);

  const { showModalError, errorMessage } = React.useMemo(() => {
    if (
      shouldTriggerModalWarning(integrationType) &&
      isUrlVerificationError(
        failCreateIntegrationError ||
          failUpdateIntegrationError ||
          createSplunkMutation.error ||
          createSumoLogicMutation.error
      )
    ) {
      return {
        showModalError: true,
        errorMessage: getErrorMessage(integrationType),
      };
    }
    return {
      showModalError: false,
      errorMessage: undefined,
    };
  }, [
    failCreateIntegrationError,
    failUpdateIntegrationError,
    integrationType,
    createSplunkMutation.error,
    createSumoLogicMutation.error,
  ]);

  if (!formHelperData) {
    return null;
  }
  return (
    <>
      <StyledModal
        handleClose={() => {
          closeCallback();
        }}
        title={`${isEdit ? 'Edit' : 'Setup'} ${modalTitle}`}
        isVisible={visible && !emailModalVisible}
        variant="light"
        options={{
          useBackground: true,
          fixedOverScreen: true,
          useAnimation: true,
          closeIcon: true,
        }}
        loading={isLoading}
        width={formHelperData.width}
      >
        <StyledForm onSubmit={handleSubmit(isEdit ? onUpdate : onSubmit)}>
          {showModalError && errorMessage && (
            <AlertBox
              type="error"
              margin="0 auto 24px auto"
              title={errorMessage.title}
              message={errorMessage?.message}
            />
          )}
          {title && ( // TODO: Prevent need for maxwidth
            <Box pb="24px" maxWidth="440px">
              <Text type="small-regular" color="dark">
                {title}
              </Text>
            </Box>
          )}
          <IntegrationInput
            title={webhookTitle}
            input={formHelperData.input}
            gridStyles={formHelperData.gridStyles}
            errors={errors}
            renderUnderInput={formHelperData.renderUnderInput}
          />
          <ButtonsContainer>
            {formHelperData.buttons
              ? formHelperData.buttons.map((button: any) => {
                  return (
                    <Button
                      {...button}
                      disabled={
                        isCreatingIntegration ||
                        isUpdatingIntegration ||
                        isDeletingIntegration
                      }
                      variant="primary"
                    >
                      Save
                    </Button>
                  );
                })
              : null}
            {isEdit && (
              <>
                &nbsp;
                <Button
                  variant="destructive"
                  disabled={isDeletingIntegration}
                  onClick={toggleDeleteModal}
                >
                  Delete
                </Button>
              </>
            )}
          </ButtonsContainer>
        </StyledForm>
      </StyledModal>
      {isEdit && (
        <ConfirmModal
          title="Confirm deletion"
          handleClose={onDelete}
          isVisible={deleteModal}
          loading={isDeletingIntegration}
        >
          Are you sure you want to delete the {defaultFormData!.type}{' '}
          integration &quot;{defaultFormData!.name}&quot;?
          <Text type="bold">This action is non reversible.</Text>
        </ConfirmModal>
      )}
      <StyledConfirmModal
        handleClose={() => {
          submitCallback();
          toggleEmailModal();
        }}
        align="center"
        useTitle={false}
        isVisible={emailModalVisible}
        allowCancel={false}
        btnText="Close"
        btnOpts={{
          variant: 'quaternary',
          color: 'white',
        }}
        className="light"
      >
        <CenterText>
          <div className="svg_container">
            <EmailDark />
          </div>
          <Text type="small-regular">Please verify your email</Text>
          <br />
          <Text type="small-regular" className="bottomSpace">
            A verification email was sent to <strong>{emailString}</strong>.
            Click the link in the email to complete the setup. If you do not see
            the email, you may need to check your spam folder.
          </Text>
        </CenterText>
      </StyledConfirmModal>
    </>
  );
};
