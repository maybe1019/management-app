import React from 'react';
import {
  Button,
  Input,
  LoadingOverlay,
  Text,
  ConfirmModal,
} from '@secberus/components';
import { yupResolver } from '@hookform/resolvers/yup';
import { ArrowRight, ArrowRightLight, FilterLight } from '@secberus/icons';
import { useForm, useController } from 'react-hook-form';
import { useModalToggle } from '@secberus/utils';
import {
  workflowsApi,
  dataSourceApi,
  categoriesApi,
  integrationsApi,
} from '@secberus/services';
import { useIsLoading } from '@secberus/utils';
import {
  StyledModal,
  StyledFilterContainer,
  FormContainer,
  StyledFilterSection,
  WorkflowViolationsToggleButtonContainer,
  WorkflowViolationsToggleButton,
  AllSelected,
  ConditionallyVisuallyHidden,
} from './Workflows.styled';
import { Conditions } from './modalSections/Conditions';
import { Integrations } from './modalSections/Actions';
import { schema } from './Workflow.schema';
import { ButtonGroup } from '../../../features/datasources/Forms/Forms.styled';

const ControlledToggleButton = ({ control, name }) => {
  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
    rules: { required: true },
  });

  return (
    <WorkflowViolationsToggleButton
      name="isAllViolations"
      ref={ref}
      buttons={[
        {
          id: false,
          display: 'Filter violations',
          icon: <FilterLight height="14px" width="14px" />,
        },
        {
          id: true,
          display: 'All violations',
          icon: <ArrowRightLight height="14px" width="14px" />,
        },
      ]}
      {...inputProps}
    />
  );
};

const formatWorkflowConditionData = (acc, [key, val]) => {
  if (Array.isArray(val) && !val.length) return acc; // if empty array don't add
  if (!val) return acc; // if falsey don't add

  switch (key) {
    case 'resource.data': {
      return acc.concat(
        val.map(v => {
          const [k1, v1] = v.split(':');
          return {
            field: `resource.data.${k1}`,
            comparator: 'matches',
            value: v1,
          };
        })
      );
    }
    case 'tags': {
      return acc.concat(
        val.map(v => {
          const [k1, v1] = v.split(':');
          return {
            field: `tags.${k1}`,
            comparator: 'matches',
            value: v1,
          };
        })
      );
    }
    default: {
      return acc.concat({
        field: key,
        comparator: 'oneof',
        value: val,
      });
    }
  }
};

const Base = props => {
  const {
    isUninitialized: isCategoriesUninitialized,
    isLoading: isCategoriesLoading,
    data: { results: categories } = { results: [] },
  } = categoriesApi.useListCategoriesQuery({ limit: '500' });

  // Rerequests in the Integrations modal dropdown
  // but since its RTK query it will simply request
  // existing data.

  // It SEEMS like an antipattern but its not as far as i was told
  const {
    isUninitialized: isIntegrationsUninitialized,
    isLoading: isIntegrationsLoading,
  } = integrationsApi.useListIntegrationsQuery({
    limit: '500',
  });

  const {
    isUninitialized: isDataSourcesUninitialized,
    isLoading: isDataSourcesLoading,
    data: { results: dataSources } = { results: [] },
  } = dataSourceApi.useListDatasourcesQuery({
    limit: '500',
  });

  const isLoading = useIsLoading([
    isCategoriesLoading,
    isDataSourcesLoading,
    isCategoriesUninitialized,
    isDataSourcesUninitialized,
    isIntegrationsUninitialized,
    isIntegrationsLoading,
  ]);

  if (isLoading) return <LoadingOverlay />;

  return <Modal {...props} {...{ dataSources, categories }} />;
};

const Modal = ({
  onClose,
  onSubmit: onAction,
  visible,
  formData,
  categories,
  dataSources,
}) => {
  const [deleteWorkflow, { isLoading: isWorkflowDeleting }] =
    workflowsApi.useDeleteWorkflowMutation();
  const [updateWorkflow, { isLoading: isWorkflowUpdating }] =
    workflowsApi.useUpdateWorkflowMutation();
  const [createWorkflow, { isLoading: isWorkflowCreating }] =
    workflowsApi.useCreateWorkflowMutation();

  const [modalVisible, toggleModal] = useModalToggle();
  const [isLoading, setIsLoading] = React.useState(true);

  const isEdit = typeof formData !== 'undefined';

  const prepareFilterData = React.useMemo(
    () =>
      formData?.conditions?.reduce((acc, curr) => {
        if (curr.field.includes('resource.data')) {
          const [key, val] = [curr.field.split('.')[2], curr.value];
          if (!acc.resource) acc.resource = { data: {} };
          acc.resource.data[`${key}:${val}`] = true;
          return acc;
        }
        if (curr.field.includes('tags')) {
          const [key, val] = [curr.field.split('.')[1], curr.value];
          if (!acc.tags) acc.tags = { data: {} };
          acc.tags.data[`${key}:${val}`] = true;
          return acc;
        }
        if (curr.field === 'category_id') {
          acc.category_id = categories.reduce((acc2, curr2) => {
            if (curr.value.includes(curr2.id)) {
              acc2[curr2.id] = true;
            }
            return acc2;
          }, {});
          return acc;
        }
        if (curr.field === 'datasources[*].id') {
          acc.datasource_id = dataSources.reduce((acc2, curr2) => {
            if (curr.value.includes(curr2.id)) {
              acc2[curr2.id] = true;
            }
            return acc2;
          }, {});
          return acc;
        }
        if (curr.field) {
          if (curr.value && Array.isArray(curr.value)) {
            acc[curr.field] = (curr?.value ?? []).reduce((acc2, curr2) => {
              acc2[curr2] = true;
              return acc2;
            }, {});
          }
        }

        return acc;
      }, {}) ?? {},
    [categories, dataSources, formData]
  );

  const prepareActionData = React.useMemo(
    () => formData?.actions.map(val => val.alert) ?? [],
    [formData]
  );

  const integrationsById = React.useMemo(
    () =>
      Object.values(prepareActionData).reduce((acc, cur) => {
        if (cur) {
          acc[cur.id] = cur;
        }
        return acc;
      }, {}),
    [prepareActionData]
  );

  const { register, watch, control, handleSubmit, errors, setValue } = useForm({
    defaultValues: {
      name: formData?.name,
      filters: prepareFilterData,
      actions: integrationsById,
      isAllViolations: formData?.conditions
        ? !formData.conditions.length
        : false,
    },
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const { isAllViolations: watchAllViolations } = watch();

  const handleDelete = async () => {
    setIsLoading(true);
    await deleteWorkflow({
      workflowId: formData.id,
    });
    if (onAction) await onAction();
    onClose();
  };

  const onSubmit = async data => {
    const {
      name,
      actions: actionData,
      filters: {
        category_id: policyData,
        severity_label: priorityData,
        datasource_id: dataSourceData,
        resource: { data: payload },
        tags: { data: tagData },
      } = {},
      isAllViolations,
    } = data;
    const { actions, conditions } = {
      actions: Object.values(actionData ?? {})
        .filter(Boolean)
        .map(action => ({
          alert: action.id,
        })),
      conditions: {
        'datasources[*].id': Object.entries(dataSourceData ?? {}).reduce(
          (acc, [key, val]) => {
            if (val) acc.push(key);
            return acc;
          },
          []
        ),
        category_id: Object.entries(policyData ?? {}).reduce(
          (acc, [key, val]) => {
            if (val) acc.push(key);
            return acc;
          },
          []
        ),
        'resource.data': Object.entries(payload ?? {}).reduce(
          (acc, [key, val]) => {
            if (val) acc.push(key.replace(/['"\\]+/g, ''));
            return acc;
          },
          []
        ),
        tags: Object.entries(tagData ?? {}).reduce((acc, [key, val]) => {
          if (val) acc.push(key.replace(/['"\\]+/g, ''));
          return acc;
        }, []),
        severity_label: Object.entries(priorityData ?? {}).reduce(
          (acc, [key, val]) => {
            if (val) acc.push(key);
            return acc;
          },
          []
        ),
      },
    };

    const requestObject = {
      workflow: {
        name,
        actions,
        conditions: isAllViolations
          ? []
          : Object.entries(conditions).reduce(formatWorkflowConditionData, []),
      },
    };

    if (isEdit) {
      requestObject.workflowId = formData.id;
    }

    setIsLoading(true);
    (await isEdit)
      ? updateWorkflow(requestObject)
      : createWorkflow(requestObject);
    if (onAction) await onAction();
    onClose();
  };

  const sections = React.useMemo(
    () => [
      {
        title: 'Trigger(s)',
        description:
          'Violations meeting all criteria below will trigger the workflow.',
        render: (
          <>
            <WorkflowViolationsToggleButtonContainer>
              <ControlledToggleButton
                name="isAllViolations"
                control={control}
              />
            </WorkflowViolationsToggleButtonContainer>
            <ConditionallyVisuallyHidden hide={!watchAllViolations}>
              <AllSelected>
                <ArrowRight />
                <Text type="small-bold">
                  All violations are triggering workflow
                </Text>
              </AllSelected>
            </ConditionallyVisuallyHidden>
            <ConditionallyVisuallyHidden hide={!!watchAllViolations}>
              <Conditions
                watch={watch}
                register={register}
                control={control}
                setValue={setValue}
                errors={errors.filters}
                dataSources={dataSources}
                categories={categories}
              />
            </ConditionallyVisuallyHidden>
          </>
        ),
      },
      {
        title: 'Action(s)',
        description:
          'Once triggered, workflow will perform the following actions.',
        render: (
          <Integrations
            watch={watch}
            control={control}
            register={register}
            setValue={setValue}
            actions={prepareActionData}
            errors={errors.actions}
          />
        ),
      },
    ],
    [
      control,
      watchAllViolations,
      watch,
      register,
      setValue,
      errors.filters,
      errors.actions,
      dataSources,
      categories,
      prepareActionData,
    ]
  );

  return (
    <>
      <StyledModal
        id="workflow_modal"
        isLoading={isLoading}
        title={isEdit ? 'Update workflow' : 'New workflow'}
        handleClose={onClose}
        isVisible={visible}
        options={{
          useBackground: true,
          fixedOverScreen: true,
          closeIcon: true,
          useAnimation: true,
        }}
      >
        <FormContainer
          onSubmit={handleSubmit(onSubmit)}
          id="workflow_form_container"
        >
          <Input
            ref={register}
            name="name"
            label="Name"
            error={errors.name}
            placeholder="Short name to identify workflow"
            light
          />
          <StyledFilterContainer id="workflow_modal_filter_container">
            {sections.map(({ title, description, render }) => (
              <StyledFilterSection>
                <Text className="title" type="bold">
                  {title}
                </Text>
                <Text className="description" type="small-regular">
                  {description}
                </Text>
                {render}
              </StyledFilterSection>
            ))}
          </StyledFilterContainer>
          <ButtonGroup>
            <Button variant="primary" type="submit" id="workflow_complete">
              {isEdit ? 'Update workflow' : 'Save workflow'}
            </Button>
            {isEdit && (
              <Button
                variant="destructive"
                onClick={toggleModal}
                id="workflow_delete"
              >
                Delete
              </Button>
            )}
          </ButtonGroup>
        </FormContainer>
      </StyledModal>
      {isEdit && (
        <ConfirmModal
          title="Confirm deletion"
          handleClose={async confirmed => {
            if (confirmed) {
              await handleDelete();
            }
            toggleModal();
          }}
          isVisible={modalVisible}
          loading={isWorkflowDeleting}
        >
          Are you sure you want to delete {formData.name}?
          <Text type="bold">This action is non reversible.</Text>
        </ConfirmModal>
      )}
    </>
  );
};

export default Base;
