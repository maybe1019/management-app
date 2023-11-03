import React from 'react';
import {
  Frame,
  Text,
  Input,
  Button,
  RadioGroup,
  ConfirmModal,
} from '@secberus/components';
import { PlusLight, DeleteLight } from '@secberus/icons';
import { Controller, useForm } from 'react-hook-form';
import { ComparatorItems } from './AddEditExceptions.constants';
import {
  FormGrid,
  FormItem,
  FormButton,
  Form,
  StyledDropdownGate,
  StyledDisplayGate,
  GateContainer,
  InputContainer,
  FlexFrame,
  PaddingContainer,
  DeleteRed,
} from './AddEditExceptions.styled';
import { replaceAnyOf, tryParseJson, useModalToggle } from '@secberus/utils';
import { Spinner, Box } from '@chakra-ui/react';
import { useCreateExceptions, useUpdateExceptions } from './hooks';
import { exceptionsApi } from '@secberus/services';

const exceptionKeys = ['key', 'value'];

export const AddEditExceptionsFrame = ({
  exceptionData,
  policy,
  frameTitle,
  isSubmitting,
  toggleConfirmDeleteModal,
  resetPagination,
}) => {
  const [keyValuePairs, setKeyValuePairs] = React.useState(1);
  const { handleCreateException, isExceptionCreating } = useCreateExceptions();
  const { handleUpdateException, isExceptionUpdating } = useUpdateExceptions();
  const [deleteException, { isLoading: isExceptionDeleting }] =
    exceptionsApi.useDeleteExceptionMutation();

  const [deleteModal, toggleDeleteModal] = useModalToggle();
  React.useEffect(() => {
    setKeyValuePairs(
      exceptionData.conditions.length > 1
        ? exceptionData.conditions.length - 1
        : 1
    );
  }, [exceptionData]);

  const disabled =
    isExceptionCreating || isExceptionUpdating || isExceptionDeleting;
  const { comparators, fields, values, exceptionTypes } = React.useMemo(() => {
    const _exceptionData = exceptionData.conditions.filter(
      ({ field }) => field !== 'policy_id'
    );
    const fields = [];
    const exceptionTypes = [];
    _exceptionData.forEach(({ field }) => {
      let fieldString = replaceAnyOf(field, ['resource.data.', 'tags.'], '');
      fieldString = tryParseJson(fieldString) || fieldString;
      fields.push(fieldString);
      exceptionTypes.push(field.startsWith('tags.') ? 'tags' : 'resource.data');
    });
    const values = _exceptionData.map(({ value }) => value);
    const comparators = _exceptionData.map(({ comparator }) => ({
      id: comparator,
      value: comparator,
    }));
    return {
      fields,
      values,
      comparators,
      exceptionTypes,
    };
  }, [exceptionData]);

  const isEdit = React.useMemo(
    () => !!exceptionData.conditions.length,
    [exceptionData]
  );

  const {
    register,
    handleSubmit,
    watch,
    errors,
    reset,
    setValue,
    control,
    clearErrors,
  } = useForm({
    defaultValues: {
      name: exceptionData?.name || '',
      exception_type: exceptionTypes || ['tags'],
      key: fields || [''],
      keyType: comparators || ['contains'],
      value: values || [''],
    },
  });

  const touchedFormData = watch();

  // Get formData from watch and add extra custom info
  const formData = React.useMemo(
    () => ({
      policyData: {
        field: 'rule_id',
        matches: policy?.id,
      },
      ...touchedFormData,
    }),
    [touchedFormData, policy]
  );

  const removeIndeces = index => {
    if (index === 0) {
      toggleConfirmDeleteModal(exceptionData.id);
    } else {
      exceptionKeys.forEach(keyString => {
        const value = touchedFormData[keyString];
        if (value.length > 0) {
          value.splice(index, 1);
        }
        setValue(keyString, value);
      });
      clearErrors();
      setKeyValuePairs(keyValuePairs - 1);
    }
  };

  const buildDefaultRadioValues = index => [
    {
      label: 'Resource tags',
      value: 'tags',
      dark: true,
      defaultChecked:
        touchedFormData?.exception_type?.[index] !== 'resource.data'
          ? true
          : false,
    },
    {
      label: 'Resource data',
      value: 'resource.data',
      dark: true,
      defaultChecked:
        touchedFormData.exception_type.length &&
        touchedFormData.exception_type[index] === 'resource.data'
          ? true
          : false,
    },
  ];

  const handleExceptionUpdate = async data => {
    const { key, keyType, value, exception_type, exception_id } = data;
    // Keys and values should always match lengths.
    const builtValues = key.map((key, index) => {
      return {
        field: `${exception_type[index].toString()}.${JSON.stringify(key)}`,
        value: value[index],
        comparator: keyType[index].value,
      };
    });

    // TODO: @sigkar Once this file is JS move this logic to TS hooks
    const payload = {
      exceptionId: exception_id,
      updateException: {
        name: data.name,
        conditions: [
          {
            field: 'policy_id',
            comparator: 'matches',
            value: policy.id,
          },
          ...builtValues,
        ],
        enabled: true,
      },
    };
    await handleUpdateException(payload);
    clearErrors();
  };

  const handleExceptionDelete = async confirmed => {
    if (confirmed && exceptionData?.id) {
      await deleteException({
        exceptionId: exceptionData.id,
      });
      typeof resetPagination === 'function' && resetPagination();
    }
    toggleDeleteModal();
  };

  const handleExceptionSubmit = async data => {
    const { key, keyType, value, exception_type } = data;
    // Keys and values should always match lengths.

    const builtValues = key.map((key, index) => {
      return {
        field: `${exception_type[index].toString()}.${JSON.stringify(key)}`,
        value: value[index],
        comparator: keyType[index].value,
      };
    });
    // TODO: @sigkar Once this file is JS move this logic to TS hooks
    const payload = {
      name: data.name,
      conditions: [
        {
          field: 'policy_id',
          comparator: 'matches',
          value: policy.id,
        },
        ...builtValues,
      ],
      enabled: true,
    };
    await handleCreateException(payload);
    setKeyValuePairs(1);
    // strict default resets
    reset({
      value: [''],
      name: '',
      key: [''],
      keyType: ['contains'],
      exception_type: ['tags'],
    });
  };

  // toggle the input frame open only

  return (
    <>
      <PaddingContainer>
        <Frame
          title={
            frameTitle || (
              <>
                {isEdit ? 'Exception rule group' : 'Create a new rule group'}{' '}
                {isSubmitting && <Spinner />}
              </>
            )
          }
          variant="secondary"
          isVisible
        >
          <FlexFrame>
            <div className="descriptionContainer">
              <Text type="small-regular" color="medium-gray">
                Create a set of rules to determine which violations to suppress
                after a scan
              </Text>
            </div>

            <Form>
              <Box w={'90%'}>
                <InputContainer>
                  <Input
                    ref={register({ required: true })}
                    error={errors.name}
                    name="name"
                    label="Name"
                    color="gray"
                    dark
                    placeholder="Describe the exception"
                    className="nameInput"
                  />
                </InputContainer>
              </Box>

              {Array(keyValuePairs)
                .fill(0)
                .map((_val, index) => {
                  const radioValues = buildDefaultRadioValues(index);
                  return (
                    <>
                      <FormGrid>
                        <FormItem className="formItem">
                          <label
                            className="radioLabel"
                            htmlFor={`exception_type`}
                          >
                            <Text type="small-bold" color="white">
                              If exception type
                            </Text>
                          </label>
                          <div className="radioContainer">
                            <Controller
                              control={control}
                              name={`exception_type[${index}]`}
                              defaultValue="tags"
                              as={
                                <RadioGroup
                                  dark
                                  name={`exception_type[${index}]`}
                                  error={errors?.exception_type?.[index]}
                                  ref={register({
                                    required: true,
                                  })}
                                  options={radioValues}
                                />
                              }
                            />
                          </div>
                        </FormItem>
                        <FormItem className="formItem">
                          <Text type="small-bold" color="white">
                            Includes key:value pair
                          </Text>
                          <GateContainer>
                            <StyledDisplayGate
                              inputProps={{
                                placeholder: 'Enter value',
                                backgroundColor: 'dark-gray',
                                color: 'white',
                                ref: register({
                                  required: true,
                                }),
                                name: `key[${index}]`,
                                error: errors?.key?.[index],
                              }}
                              useTypeahead={false}
                              leftComponentDisplay={{
                                items: ComparatorItems,
                                labelMargin: '20px',
                                displayOnlyText: 'is',
                              }}
                              textLabelProps={{
                                labelText: 'Key',
                                labelProps: {
                                  color: 'medium-gray',
                                  type: 'small-bold',
                                },
                              }}
                            />
                          </GateContainer>
                          <GateContainer>
                            <Controller
                              control={control}
                              name={`keyType[${index}]`}
                              defaultValue={'matches'}
                              as={
                                <StyledDropdownGate
                                  maxHeight={'none'}
                                  defaultValue={
                                    touchedFormData.keyType[index] || {
                                      id: 'matches',
                                      value: 'matches',
                                    }
                                  }
                                  inputProps={{
                                    placeholder: 'Enter value',
                                    backgroundColor: 'dark-gray',
                                    color: 'white',
                                    ref: register({
                                      required: true,
                                    }),
                                    name: `value[${index}]`,
                                    error: errors?.value?.[index],
                                  }}
                                  useTypeahead={false}
                                  leftComponentDropdown={{
                                    ref: register({
                                      required: true,
                                    }),
                                    name: `keyType[${index}]`,
                                    items: ComparatorItems,
                                    displayLabel: 'value',
                                    displayOnlyText: 'is',
                                    displayLabelColor: 'white',
                                  }}
                                  textLabelProps={{
                                    labelText: 'Value',
                                    labelProps: {
                                      color: 'medium-gray',
                                      type: 'small-bold',
                                    },
                                  }}
                                />
                              }
                            />
                          </GateContainer>
                        </FormItem>
                        <FormItem className="buttonHandler">
                          <div>
                            {keyValuePairs !== index + 1 &&
                            keyValuePairs > 1 ? (
                              <Text type="small-bold" color="white">
                                AND
                              </Text>
                            ) : (
                              <>
                                {(isEdit || index >= 1) && (
                                  <Button
                                    variant="secondary"
                                    onClick={() => removeIndeces(index)}
                                    icon
                                  >
                                    <DeleteLight />
                                  </Button>
                                )}
                                <FormButton>
                                  <Button
                                    variant="secondary"
                                    onClick={() =>
                                      setKeyValuePairs(keyValuePairs + 1)
                                    }
                                  >
                                    <PlusLight /> rule
                                  </Button>
                                </FormButton>
                              </>
                            )}
                          </div>
                        </FormItem>
                      </FormGrid>
                    </>
                  );
                })}
              <Box pt="40px">
                <FormButton>
                  <Button
                    variant="secondary"
                    disabled={disabled}
                    onClick={handleSubmit(() =>
                      isEdit
                        ? handleExceptionUpdate({
                            exception_id: exceptionData.id,
                            ...formData,
                          })
                        : handleExceptionSubmit(formData)
                    )}
                  >
                    Save {isEdit ? 'changes' : 'rule group'}
                  </Button>
                  {isEdit && (
                    <Button
                      color="red"
                      background="dark-gray"
                      disabled={disabled}
                      onClick={toggleDeleteModal}
                    >
                      <DeleteRed />
                      Delete rule group
                    </Button>
                  )}
                </FormButton>
              </Box>
            </Form>
          </FlexFrame>
        </Frame>
      </PaddingContainer>
      {deleteModal && (
        <ConfirmModal
          title="Delete exception"
          handleClose={handleExceptionDelete}
          isVisible={deleteModal}
          loading={isExceptionDeleting}
          btnOpts={{
            variant: 'destructive',
            color: 'white',
          }}
          btnText="Confirm deletion"
        >
          <Box display="inline">
            Are you sure you want to delete the exception {exceptionData?.name}
            ?&nbsp;
            <br />
            <Text type="bold">This action is non reversible.</Text>
          </Box>
        </ConfirmModal>
      )}
    </>
  );
};
