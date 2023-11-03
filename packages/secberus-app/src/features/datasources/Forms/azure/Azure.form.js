import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Input,
  LoadingOverlay,
  RESOURCE_LOGO_BY_DATASOURCE,
  Text,
  AlertBox,
} from '@secberus/components';
import { Box, GridItem } from '@chakra-ui/react';
import { validationSchema } from './Azure.validation';
import {
  ModalFooter,
  GridFields,
  ModalForm,
  ButtonGroup,
  DPIFormModal,
  MaskedTextArea,
} from '../Forms.styled';
import { DeleteDataSourceModal } from '../../components/DeleteModal.component';
import { useCreateDataSource, useUpdateDataSource } from '../../hooks';
import { useParams } from 'react-router';
import { dataSourceApi } from '@secberus/services';
import { usePermissions } from '../../../../app/rbac/definitions';

const PreLoad = props => {
  const { id: idParam, datasourceId } = useParams();
  const id = idParam || datasourceId;

  const { data = { data: {} }, isLoading } =
    dataSourceApi.useGetDatasourceQuery(
      {
        datasourceId: id,
      },
      { skip: !id }
    );

  if (isLoading) return <LoadingOverlay />;
  return <AzureForm {...props} data={data} />;
};

const AzureForm = ({ isOpen, onRequestClose, data = {} }) => {
  const Icon = RESOURCE_LOGO_BY_DATASOURCE.azure;
  const { id: idParam, datasourceId } = useParams();
  const id = idParam || datasourceId;
  const { canUpdate, canDelete } = usePermissions('datasources');

  const isEdit = !!id;

  const {
    register,
    handleSubmit,
    errors,
    watch,
    formState: { isSubmitting },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
    defaultValues: data,
  });
  const fields = watch();

  const { handleCreation, errorCreating, isSuccessCreating } =
    useCreateDataSource();
  const { handleUpdate, isUpdating, errorUpdating, isSuccessUpdating } =
    useUpdateDataSource();
  const error = errorCreating || errorUpdating;

  const [toggleDelete, setToggleDelete] = React.useState(false);

  const onSubmit = async data => {
    await handleCreation(data, 'Azure');
    if (isSuccessCreating) onRequestClose();
  };

  const onEdit = async () => {
    await handleUpdate(id, {
      ...fields,
      datasource_type_id: 'Azure',
    });
    if (isSuccessUpdating) onRequestClose();
  };

  const toggleDeleteModal = () => {
    setToggleDelete(true);
  };

  return (
    <>
      {toggleDelete ? (
        <DeleteDataSourceModal
          datasourceId={id}
          name={data.name}
          open={toggleDelete}
          onRequestClose={onRequestClose}
        />
      ) : null}
      <DPIFormModal
        title={`${isEdit ? 'Edit' : 'Add'} Azure data source`}
        isVisible={!toggleDelete && isOpen}
        handleClose={onRequestClose}
        variant="light"
      >
        <ModalForm id="azureForm" onSubmit={handleSubmit(onSubmit)}>
          <GridFields>
            <Box display="flex" gridColumn="1/3" marginBottom="24px">
              {!!error && (
                <AlertBox
                  type="error"
                  title="Unable to connect to data source"
                  message={`${
                    error?.data?.detail ? `${error?.data?.detail}. ` : ''
                  }Please review the information and try again.`}
                />
              )}
            </Box>
            <Box display="flex" gridColumn="1/3" marginBottom="24px">
              <Box
                display="flex"
                alignItems="center"
                border="1px solid #DFE7EF"
                padding="16px"
                borderRadius="16px"
                marginRight="20px"
              >
                <Icon height={60} width={60} />
              </Box>
              <Text type="small-regular">
                Creating an Azure data source begins in your Azure Active
                Directory. Follow these{' '}
                <a
                  href="https://secberus-docs.readme.io/docs/azure-setup"
                  target="_blank"
                  rel="noreferrer"
                  className="setup-docs-link"
                >
                  instructions
                </a>{' '}
                to provide Secberus read access to necessary resources and
                return to this form to complete setup.
              </Text>
            </Box>
            <GridItem gridColumn="1/3">
              <Input
                ref={register()}
                name="name"
                type="text"
                label="Name"
                placeholder="e.g. Production"
                error={errors.name}
              />
            </GridItem>
            <Input
              ref={register()}
              name="data.client_id"
              type="text"
              label="Application Client ID"
              error={errors.client_id}
            />
            <Input
              ref={register()}
              name="data.tenant_id"
              type="text"
              label="Tenant ID"
              error={errors.tenant_id}
            />
            <GridItem gridColumn="1/3">
              <Input
                ref={register()}
                name="data.subscription_id"
                type="text"
                label="Subscription ID"
                error={errors.subscription_id}
              />
            </GridItem>
            <GridItem gridColumn="1/3">
              <MaskedTextArea
                ref={register}
                name="data.client_secret"
                label="Secret value"
                error={errors.client_secret}
              />
            </GridItem>
          </GridFields>
          <ModalFooter>
            <ButtonGroup>
              {isEdit ? (
                <>
                  {canUpdate && (
                    <Button
                      type="button"
                      form="azureForm"
                      disabled={isUpdating}
                      onClick={() => onEdit()}
                    >
                      Update
                    </Button>
                  )}
                  {canDelete && (
                    <Button
                      type="button"
                      variant="destructive"
                      form="azureForm"
                      disabled={isUpdating}
                      onClick={() => toggleDeleteModal()}
                    >
                      Remove data source
                    </Button>
                  )}
                </>
              ) : (
                <Button type="submit" form="azureForm" disabled={isSubmitting}>
                  Connect
                </Button>
              )}
            </ButtonGroup>
          </ModalFooter>
        </ModalForm>
      </DPIFormModal>
    </>
  );
};

export { PreLoad as AzureForm };
