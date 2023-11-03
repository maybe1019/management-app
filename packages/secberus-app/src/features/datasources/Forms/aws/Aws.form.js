import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, GridItem } from '@chakra-ui/react';
import {
  Input,
  Button,
  Validation,
  CheckedMultiSelect,
  CopyField,
  Text,
  RadioGroup,
  LoadingOverlay,
  RESOURCE_LOGO_BY_DATASOURCE,
  AlertBox,
} from '@secberus/components';
import { MaskedTextArea } from '../Forms.styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { v4 } from 'uuid';
import { SECBERUS_AWS_ACCOUNT_ID } from '../../../../constants';
import { DeleteDataSourceModal } from '../../components/DeleteModal.component';
import { useCreateDataSource, useUpdateDataSource } from '../../hooks';
import {
  ModalFooter,
  ModalForm,
  ButtonGroup,
  GridFields,
  DPIFormModal,
} from '../Forms.styled';
import { validationSchema } from './Aws.validation';
import { REGIONS } from './Aws.constants';
import { dataSourceApi } from '@secberus/services';
import { useParams } from 'react-router';
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
  return <AwsForm {...props} data={data} />;
};

const AwsForm = ({ isOpen, onRequestClose, data }) => {
  const Icon = RESOURCE_LOGO_BY_DATASOURCE.aws;
  const { id: idParam, datasourceId } = useParams();
  const id = idParam || datasourceId;
  const { canUpdate, canDelete } = usePermissions('datasources');

  const isEdit = !!id;

  const generatedExternalId = v4();

  const {
    register,
    handleSubmit,
    errors,
    watch,
    control,
    formState: { isSubmitting },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      ...data,
      authMethod: isEdit ? (data.data.role_arn ? 'roleArn' : 'iam') : 'roleArn',
      data: {
        ...data.data,
        external_id: data.data.external_id ?? generatedExternalId,
      },
    },
  });
  const fields = watch();

  const { handleCreation, errorCreating, isSuccessCreating } =
    useCreateDataSource();
  const { handleUpdate, isUpdating, errorUpdating, isSuccessUpdating } =
    useUpdateDataSource();
  const error = errorCreating || errorUpdating;

  const [toggleDelete, setToggleDelete] = React.useState(false);

  const onSubmit = async () => {
    const { authMethod, ...formattedFields } = fields;

    await handleCreation(formattedFields, 'AWS');
    if (isSuccessCreating) onRequestClose();
  };

  const onEdit = async () => {
    const { authMethod, ...formattedFields } = fields;

    await handleUpdate(id, {
      ...formattedFields,
      datasource_type_id: 'AWS',
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
        title={`${isEdit ? 'Edit' : 'Add'} AWS data source`}
        isVisible={!toggleDelete && isOpen}
        handleClose={onRequestClose}
        variant="light"
      >
        <ModalForm id="awsForm" onSubmit={handleSubmit(onSubmit)}>
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
                Creating an AWS data source begins in your AWS Management
                Console. Follow these{' '}
                <a
                  href="https://secberus-docs.readme.io/docs/aws-setup"
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
                ref={register}
                name="name"
                placeholder="e.g. Production"
                label="Name"
                error={errors.name}
              />
            </GridItem>
            <GridItem gridColumn="1/3">
              <Validation name="data.regions" error={errors.data?.regions}>
                <Controller
                  control={control}
                  name="data.regions"
                  render={props => {
                    return (
                      <CheckedMultiSelect
                        data={REGIONS}
                        label="Regions"
                        displayKey="code"
                        placeholder="Select region"
                        selectAllLabel="Select all regions"
                        valueKey="code"
                        value={props.value}
                        onChange={props.onChange}
                      />
                    );
                  }}
                />
              </Validation>
            </GridItem>
            <GridItem gridColumn="1/3" marginBottom="24px">
              <RadioGroup
                label="Authentication method"
                ref={register}
                name="authMethod"
                options={[
                  {
                    label: 'Using IAM role',
                    value: 'roleArn',
                    name: 'authMethod',
                    subtext:
                      'Temporary credentials are provided to perform read operations',
                  },
                  {
                    label: 'Using IAM user credentials',
                    value: 'iam',
                    name: 'authMethod',
                    subtext:
                      'User credentials are used to perform read operations',
                  },
                ]}
              />
            </GridItem>
            {fields.authMethod === 'iam' ? (
              <>
                <GridItem gridColumn="1/3">
                  <Input
                    ref={register}
                    name="data.access_key_id"
                    key="accessKeyId"
                    label="Access key ID"
                    error={errors.data?.access_key_id}
                  />
                </GridItem>
                <GridItem gridColumn="1/3">
                  <MaskedTextArea
                    ref={register}
                    name="data.secret_access_key"
                    key="secretAccessKey"
                    label="Secret access key"
                    error={errors.data?.secret_access_key}
                  />
                </GridItem>
              </>
            ) : (
              <>
                <CopyField
                  disabled
                  key="accountId"
                  defaultValue={SECBERUS_AWS_ACCOUNT_ID}
                  label="Account ID"
                />
                <CopyField
                  disabled
                  copyFieldRef={register}
                  name="data.external_id"
                  key="externalId"
                  label="External ID"
                />
                <GridItem gridColumn="1/3">
                  <Input
                    ref={register}
                    name="data.role_arn"
                    key="roleArn"
                    label="Role ARN"
                    error={errors.data?.access_key_id}
                  />
                </GridItem>
              </>
            )}
          </GridFields>
          <ModalFooter>
            <ButtonGroup>
              {isEdit ? (
                <>
                  {canUpdate && (
                    <Button
                      type="button"
                      form="awsForm"
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
                      form="awsForm"
                      disabled={isUpdating}
                      onClick={() => toggleDeleteModal()}
                    >
                      Remove data source
                    </Button>
                  )}
                </>
              ) : (
                <Button type="submit" form="awsForm" disabled={isSubmitting}>
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

export { PreLoad as AwsForm };
