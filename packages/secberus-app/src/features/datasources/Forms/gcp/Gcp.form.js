import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Flex, GridItem } from '@chakra-ui/react';
import {
  Button,
  Input,
  TextArea,
  Text,
  LoadingOverlay,
  RESOURCE_LOGO_BY_DATASOURCE,
  AlertBox,
} from '@secberus/components';
import { yupResolver } from '@hookform/resolvers/yup';
import { startCase } from 'lodash';
import { ReportLight, SignOutLight } from '@secberus/icons';
import { useCreateDataSource, useUpdateDataSource } from '../../hooks';
import { DeleteDataSourceModal } from '../../components/DeleteModal.component';
import {
  ButtonGroup,
  GridFields,
  ModalFooter,
  ModalForm,
  DPIFormModal,
  MaskedTextArea,
} from '../Forms.styled';
import { validationSchema } from './Gcp.validation';
import { manualTextAreas, manualTextFields } from './Gcp.constants';
import {
  DropzoneLabel,
  DragNDrop,
  ManualInputs,
  PasteJSON,
  StyledDropZone,
} from './Gcp.styled';
import { dataSourceApi } from '@secberus/services';
import { formatData } from './Gcp.utils';
import { useParams } from 'react-router';
import { createEnvAwareLogger } from '@secberus/utils';
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
  return <GcpForm {...props} data={data} />;
};

const GcpForm = ({ isOpen, onRequestClose, data = {} }) => {
  const Icon = RESOURCE_LOGO_BY_DATASOURCE.gcp;
  const logger = createEnvAwareLogger();
  const { id: idParam, datasourceId } = useParams();
  const id = idParam || datasourceId;
  const { canUpdate, canDelete } = usePermissions('datasources');

  const isEdit = !!id;

  const {
    register,
    handleSubmit,
    errors,
    setValue,
    setError,
    clearErrors,
    formState: { isSubmitting },
    watch,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
    defaultValues: data,
  });

  const fields = watch();

  const [manualEntry, setManualEntry] = React.useState(false);
  const [pastedJSON, setPastedJSON] = React.useState('');
  const [selectedZones, setSelectedZones] = React.useState({});
  const [addedFile, setAddedFile] = React.useState('');
  const [toggleDelete, setToggleDelete] = React.useState(false);

  React.useEffect(() => {
    if (isEdit) setManualEntry(true);
  }, [isEdit]);

  React.useEffect(() => {
    setValue(
      'data.zones',
      Object.values(selectedZones).map(zone => zone?.name)
    );
  }, [selectedZones, setValue]);

  const handleClose = () => {
    setPastedJSON('');
    setSelectedZones({});
    setManualEntry(false);
    onRequestClose();
  };

  const { handleCreation, errorCreating, isSuccessCreating } =
    useCreateDataSource();
  const { handleUpdate, isUpdating, errorUpdating, isSuccessUpdating } =
    useUpdateDataSource();
  const error = errorCreating || errorUpdating;

  const onSubmit = async data => {
    const data_ = formatData(data);

    await handleCreation(data_, 'GCP');
    if (isSuccessCreating) handleClose();
  };

  const onEdit = async () => {
    const data_ = formatData(fields);

    await handleUpdate(id, { ...data_, datasource_type_id: 'GCP' });
    if (isSuccessUpdating) onRequestClose();
  };

  const toggleDeleteModal = () => {
    setToggleDelete(true);
  };

  const onDrop = React.useCallback(
    acceptedFiles => {
      acceptedFiles.forEach(file => {
        const reader = new window.FileReader();

        reader.onabort = () => logger.log('file reading was aborted');
        reader.onerror = () => logger.log('file reading has failed');
        reader.onload = e => {
          try {
            const result = JSON.parse(e.target.result);
            clearErrors('data.pastedJSON');
            setPastedJSON(JSON.stringify(result));
            setValue('data.creds', result);
            setAddedFile(acceptedFiles[0].name);
          } catch (ex) {
            setError('data.pastedJSON', {
              type: 'required',
              message: 'Invalid JSON',
            });
          }
        };
        reader.readAsText(file);
      });
    },
    [logger, clearErrors, setError, setValue]
  );

  const handlePaste = async e => {
    const clipboardData = e.clipboardData || window.clipboardData;
    const urlString = clipboardData.getData('Text');
    try {
      const result = JSON.parse(urlString);
      clearErrors('data.pastedJSON');
      setValue('data.creds', result);
      setPastedJSON(urlString);
      setManualEntry(true);
    } catch (err) {
      setError('data.pastedJSON', {
        type: 'required',
        message: 'Invalid JSON',
      });
    }
  };

  const handleDelete = e => {
    const key = e.keyCode || e.charCode;
    const deleteKeyCode = 46;
    const backspaceKeyCode = 8;
    if (key === backspaceKeyCode || key === deleteKeyCode) {
      setPastedJSON('');
    }
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
        title={`${isEdit ? 'Edit' : 'Add'} GCP data source`}
        isVisible={!toggleDelete && isOpen}
        handleClose={onRequestClose}
        variant="light"
      >
        <ModalForm id="gcpForm" onSubmit={handleSubmit(onSubmit)}>
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
                Creating a GCP data source begins in your GCP management
                console. Follow these{' '}
                <a
                  href="https://secberus-docs.readme.io/docs/gcp-setup"
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
              <Flex flexDirection="column" marginBottom="24px" sx={{ gap: 24 }}>
                <Input
                  ref={register}
                  name="name"
                  label="Name"
                  placeholder="e.g. Production"
                  error={errors.name}
                  gridColumn="1/3"
                  noMargin
                />
                <Input
                  ref={register}
                  name="data.projects"
                  label="Projects"
                  error={errors.data?.projects}
                  noMargin
                />
              </Flex>
            </GridItem>
            <DragNDrop visible={!manualEntry}>
              <StyledDropZone
                acceptedMimeTypes="application/json"
                onDrop={onDrop}
              >
                <DropzoneLabel>
                  <SignOutLight className="upload" height={50} width={50} />
                  <Box display="flex" marginBottom="8px">
                    <Text type="bold" color="gray">
                      Drag and drop or
                    </Text>
                    <Text type="bold" color="blue">
                      &nbsp;select a file
                    </Text>
                  </Box>
                  <Text type="xsmall-regular" color="gray">
                    {addedFile ? (
                      <Box display="flex" alignItems="center">
                        <ReportLight className="file-icon" /> {addedFile}
                      </Box>
                    ) : (
                      'Only JSON file formats are accepted'
                    )}
                  </Text>
                </DropzoneLabel>
              </StyledDropZone>
              {errors.data?.creds && (
                <Box display="flex" marginLeft="20px">
                  <Text type="small-regular" color="red">
                    Required fields are missing.
                  </Text>
                </Box>
              )}
              <Box display="flex" marginBottom="8px" marginLeft="20px">
                <Text type="small-regular">Alternatively, you may</Text>
                <Box
                  cursor="pointer"
                  onClick={() => setManualEntry(!manualEntry)}
                >
                  <Text type="small-regular" color="blue">
                    &nbsp;enter fields manually.
                  </Text>
                </Box>
              </Box>
            </DragNDrop>
            <ManualInputs visible={manualEntry}>
              {!isEdit && (
                <PasteJSON>
                  <TextArea
                    ref={register}
                    name="data.pastedJSON"
                    label="Paste JSON"
                    error={errors.data?.pastedJSON}
                    height={200}
                    onPaste={handlePaste}
                    onKeyDown={handleDelete}
                    value={pastedJSON}
                    helperText="Paste your JSON object to quickly populate the fields belows"
                    noMargin
                  />
                </PasteJSON>
              )}
              {manualTextFields.map(field => (
                <Input
                  ref={register}
                  name={`data.creds.${field.name}`}
                  label={startCase(field.name)}
                  error={errors.data?.creds && errors.data?.creds[field.name]}
                  noMargin
                />
              ))}
              {manualTextAreas.map(field =>
                field.name === 'private_key' ? (
                  <MaskedTextArea
                    ref={register}
                    name={`data.creds.${field.name}`}
                    label={startCase(field.name)}
                    error={errors.data?.creds && errors.data?.creds[field.name]}
                    noMargin
                  />
                ) : (
                  <TextArea
                    ref={register}
                    name={`data.creds.${field.name}`}
                    label={startCase(field.name)}
                    error={errors.data?.creds && errors.data?.creds[field.name]}
                    noMargin
                  />
                )
              )}
            </ManualInputs>
          </GridFields>
          <ModalFooter>
            <ButtonGroup>
              {isEdit ? (
                <>
                  {canUpdate && (
                    <Button
                      type="button"
                      form="gcpForm"
                      disabled={isUpdating}
                      onClick={() => onEdit()}
                    >
                      Update
                    </Button>
                  )}
                  {canDelete && (
                    <Button
                      variant="destructive"
                      form="gcpForm"
                      disabled={isUpdating}
                      onClick={toggleDeleteModal}
                    >
                      Remove data source
                    </Button>
                  )}
                </>
              ) : (
                <Button type="submit" form="gcpForm" disabled={isSubmitting}>
                  Connect
                </Button>
              )}
              {manualEntry && (
                <Button
                  variant="tertiary"
                  onClick={() => setManualEntry(false)}
                >
                  Go back
                </Button>
              )}
            </ButtonGroup>
          </ModalFooter>
        </ModalForm>
      </DPIFormModal>
    </>
  );
};

export { PreLoad as GcpForm };
