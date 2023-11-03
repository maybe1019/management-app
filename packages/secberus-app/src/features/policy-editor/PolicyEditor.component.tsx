import React from 'react';
import {
  PageHeader,
  Button,
  ButtonDropdown,
  CodeEditor,
  Text,
  SeverityRange,
  ConfirmModal,
  Input,
  TextArea,
  Select,
  FullscreenModal,
  RadioGroup,
  AlertBox,
} from '@secberus/components';
import { Box, Flex } from '@chakra-ui/react';
import { More, PenLight, Plus, PlusDark, Save } from '@secberus/icons';
import { ThemeContext } from 'styled-components';
import {
  useDeepEffect,
  useIsLoading,
  useMediaQuery,
  useModalToggle,
  useThrottle,
} from '@secberus/utils';
import qs from 'query-string';
import {
  categoriesApi,
  complianceFrameworksApi,
  getDefaultPaginatedResponse,
  PolicyCategory,
  secberusApi,
} from '@secberus/services';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  generatePath,
  useHistory,
  useLocation,
  useParams,
} from 'react-router-dom';
import { tryParseJson } from '@secberus/utils';
import { useDispatch } from 'react-redux';
import { validationSchema } from '../../screens/v2/Policies/Form/AddEditPolicy/schema';
import { FrameworkList } from '../../screens/v2/Policies/components/AddEditDetails/components/FrameworkList';
import { ComplianceContainer } from '../../screens/v2/Policies/components/AddEditDetails/AddEditDetails.styled';
import { CategoryForm } from '../policy-categories/list/Form';
import { ComplianceModal } from '../../screens/v2/Policies/components';
import { dataExplorerPaths } from '../data-explorer/routes';
import { useAppRedirect } from '../../utils/useAppRedirect';
import { attributesActions, selectExplorerQuery } from '../attributes/slice';
import { useTypedSelector } from '../../store';
import { PolicyEditorProps, PolicyControls } from './PolicyEditor.types';
import {
  CodeEditorContainer,
  PageContent,
  PolicyEditorBlock,
} from './PolicyEditor.styled';
import {
  EDITOR_ABOUT_TEXT,
  EDITOR_CONFIG_TEXT,
  EDITOR_RATIONALE_TEXT,
  EDITOR_REMEDIATION_TEXT,
} from './constants';
import { selectDraftPolicy, setDraftPolicy, setDraftPolicyNull } from './slice';

export const PolicyEditor = ({
  isLoading,
  isFormSubmitting,
  clone,
  onSubmit,
  onDelete,
  policy,
  prevPath,
}: PolicyEditorProps) => {
  const dispatch = useDispatch();
  const theme = React.useContext(ThemeContext);
  const history = useHistory();
  const location = useLocation();
  const fromExplorer = Boolean(qs.parse(location?.search)?.fromExplorer);
  const params = useParams<{ policyId?: string; clone?: string }>();
  const tabletQuery = useMediaQuery(theme.breakpoints.tablet);
  const [showComplianceModal, setComplianceModalOpen] = React.useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useModalToggle();
  const [deleteModalVisible, toggleDeleteModal] = useModalToggle();
  const { navigateTo } = useAppRedirect();
  const draftPolicy = useTypedSelector(selectDraftPolicy);

  const isEdit = !!params?.policyId && !!policy && !clone && !fromExplorer;

  const explorerQuery = useTypedSelector(selectExplorerQuery);

  const { data: frameworks = [], isLoading: isGetFrameworksLoading } =
    complianceFrameworksApi.useGetComplianceFrameworksQuery({
      enabled: 'true',
    });

  const [policyFrameworks, setPolicyFrameworks] = React.useState<
    secberusApi.Policy['controls']
  >(policy?.controls || draftPolicy?.controls || []);

  /**
   * @todo just source this information from the policy.
   * @description pulls out resource fields, as they are somewhat temporary,
   * and we should continue to support resources array for the future
   */
  const {
    resource_id,
    datasource_types: _resourceName,
    ...restPolicy
  } = policy ?? {};

  const query = React.useMemo(
    () => (fromExplorer ? explorerQuery : policy?.query || policy?.logic),
    [explorerQuery, fromExplorer, policy?.logic, policy?.query]
  );

  const defaultValues = React.useMemo(
    () => ({
      ...restPolicy,
      severity: policy?.severity || 5,
      label: policy?.label || '',
      name: clone ? `Clone - ${policy?.name}` : policy?.name,
      enabled: policy?.subscribed !== undefined ? policy?.subscribed : true,
      rationale: policy?.rationale || '',
      ...(!isEdit && draftPolicy ? { ...draftPolicy } : {}),
      query,
    }),
    [
      restPolicy,
      policy?.severity,
      policy?.label,
      policy?.name,
      policy?.subscribed,
      policy?.rationale,
      clone,
      isEdit,
      draftPolicy,
      query,
    ]
  );

  const {
    data: allCategories = getDefaultPaginatedResponse<PolicyCategory>(),
    isLoading: categoriesAreLoading,
    isUninitialized: categoriesAreUninitialized,
  } = categoriesApi.useListCategoriesQuery({
    limit: '500',
  });

  const pageLoading = useIsLoading([
    !!isLoading,
    categoriesAreUninitialized,
    categoriesAreLoading,
  ]);

  const securityCategories = React.useMemo<PolicyCategory[]>(
    () =>
      allCategories?.results?.filter(o => o.category_type === 'SECURITY') ?? [],
    [allCategories]
  );

  const onOpenFrameworkForm = React.useCallback(
    () => setComplianceModalOpen(true),
    []
  );
  const onCloseFrameworkForm = () => setComplianceModalOpen(false);

  const {
    control,
    handleSubmit,
    errors,
    setValue,
    getValues,
    register,
    watch,
    formState,
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
    shouldUnregister: false,
  });

  const formValues = watch();

  const debouncedFormValues = useThrottle(formValues, 2500);

  const onRemoveFramework = React.useCallback((frameworkId, idx) => {
    setPolicyFrameworks((prev: PolicyControls) =>
      prev?.filter(({ id }, i) => id !== frameworkId || idx !== i)
    );
  }, []);

  const onAddFramework = (framework: PolicyControls) => {
    //@ts-expect-error concat implied types mismatch PolicyControls
    setPolicyFrameworks((prev: PolicyControls) => prev?.concat(framework));
  };

  const secberusManaged = policy?.secberus_managed && !clone;

  const handleClose = () => {
    // Get rid of draft state so policy & explorer opens with no saved state
    dispatch(setDraftPolicyNull());
    dispatch(
      attributesActions.querySet({
        explorerQuery: '',
      })
    );

    if (policy) {
      history.push(`/policies/policy/details/${policy!.id}/details`);
    } else if (!clone && prevPath) {
      history.push(prevPath);
    } else {
      history.push('/policies');
    }
  };

  const handleClonePolicy = async () => {
    history.push({
      pathname: `/policies/${policy!.id}/form/details?clone=true`,
      state: { prevRoute: location.pathname },
    });
  };
  type SavePolicyArgs = Pick<
    secberusApi.CreatePolicyApiArg['createPolicy'],
    | 'id'
    | 'name'
    | 'policy_category_id'
    | 'description'
    | 'remediation_steps'
    | 'rationale'
    | 'query'
    | 'label'
    | 'enabled'
  >;
  const handleSavePolicy = (formData: SavePolicyArgs) => {
    const policy: any = clone
      ? {
          ...formData,
          id: undefined,
          uuid: undefined,
          enabled: formData.enabled,
          controls: policyFrameworks,
        }
      : { controls: policyFrameworks, ...formData };
    onSubmit(policy);
  };

  React.useEffect(() => {
    if (clone) {
      setValue('name', `Clone - ${policy?.name}`);
    }
  }, [clone, policy?.name, setValue]);

  useDeepEffect(() => {
    if (formState?.isDirty) {
      dispatch(
        //@ts-expect-error language being set
        setDraftPolicy({ controls: policyFrameworks, ...debouncedFormValues })
      );
    }
  }, [dispatch, debouncedFormValues, policyFrameworks]);

  const RenderCreateHeaderOptions = (
    <Button isLoading={isFormSubmitting} type="submit">
      Save policy
    </Button>
  );

  const RenderEditHeaderOptions = (
    <Flex gridGap="8px">
      {tabletQuery ? (
        <Button isLoading={isFormSubmitting} type="submit">
          Save changes
        </Button>
      ) : (
        <Button icon type="submit">
          <Save color={theme.colors.white} />
        </Button>
      )}
      <ButtonDropdown
        icon
        alignRight
        variant="secondary"
        label={<More width="24px" height="24px" />}
        options={[
          {
            id: 'clone',
            name: 'Clone policy',
            onClick: () => handleClonePolicy(),
          },
          {
            id: 'delete',
            name: 'Delete policy',
            destructive: true,
            onClick: () => toggleDeleteModal(),
          },
        ]}
      />
    </Flex>
  );

  const editPolicyPath = `${generatePath(
    dataExplorerPaths.dataExplorerManagement,
    {
      viewType: 'policy',
      queryId: policy?.id,
    }
  )}?action=${isEdit ? 'edit_policy' : 'new_policy'}`;

  const handleEditCode = () => {
    // Set values to ensure all form fields are saved before navigating
    //@ts-expect-error language being set
    dispatch(setDraftPolicy({ controls: policyFrameworks, ...getValues() }));
    navigateTo(editPolicyPath);
  };

  return (
    <>
      <FullscreenModal
        title="Policy editor"
        onClose={handleClose}
        isLoading={pageLoading}
        tag="beta"
      >
        <form onSubmit={handleSubmit(handleSavePolicy)}>
          <PageHeader
            title={
              !secberusManaged
                ? isEdit
                  ? 'Edit policy'
                  : 'Create a new policy'
                : policy?.name
            }
          >
            {isEdit ? RenderEditHeaderOptions : RenderCreateHeaderOptions}
          </PageHeader>
          <PageContent>
            <div className="policy-attributes-container">
              {policy && (
                <ConfirmModal
                  // @ts-expect-error hmmmm...
                  fixedOverScreen
                  title="Confirm deletion"
                  handleClose={confirmed => {
                    if (confirmed) {
                      onDelete();
                    }
                    toggleDeleteModal();
                  }}
                  isVisible={deleteModalVisible}
                >
                  Are you sure you want to delete {policy.name}?
                  <Text type="bold">This action is non reversible.</Text>
                </ConfirmModal>
              )}

              {/* @ts-expect-error `policy.shared` not yet in type */}
              {policy?.shared && (
                <Box padding="24px 40px 0">
                  <AlertBox
                    type="warning"
                    title="This policy is shared"
                    message="This policy is used by more than one organization in your account. Any changes made to this policy will be applied in all places this policy is visible. "
                  />
                </Box>
              )}

              <PolicyEditorBlock title="1. About" text={EDITOR_ABOUT_TEXT}>
                <Flex flexDirection="column" gridGap="24px">
                  <Controller
                    control={control}
                    name="name"
                    render={({ value, onChange }) => (
                      <Input
                        noMargin
                        label="Name"
                        value={value}
                        onChange={onChange}
                        error={errors.name}
                        disabled={isFormSubmitting}
                      />
                    )}
                  />
                  <Box maxWidth="210px">
                    <Controller
                      control={control}
                      name="label"
                      render={({ value, onChange }) => (
                        <Input
                          noMargin
                          label="ID"
                          placeholder="CUSTOM-123"
                          value={value}
                          onChange={onChange}
                          error={errors.label}
                          disabled={isFormSubmitting}
                        />
                      )}
                    />
                  </Box>
                  <Controller
                    control={control}
                    name="policy_category_id"
                    render={({ value, onChange }) => (
                      <Select
                        onChange={onChange}
                        label="Category"
                        placeholder="Select category"
                        value={value}
                        disabled={isFormSubmitting}
                        // @ts-expect-error incompatible "message" types
                        error={errors?.policy_category_id}
                        options={securityCategories.map(({ id, name }) => ({
                          id,
                          name,
                        }))}
                        actionItem={{
                          icon: <Plus />,
                          label: 'New category',
                          onClick: () => setCategoryModalVisible(),
                        }}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="description"
                    render={({ value, onChange }) => (
                      <TextArea
                        label="Description"
                        height={100}
                        value={value}
                        onChange={onChange}
                        error={errors.description}
                        disabled={isFormSubmitting}
                      />
                    )}
                  />
                </Flex>
              </PolicyEditorBlock>

              <PolicyEditorBlock title="2. Configure" text={EDITOR_CONFIG_TEXT}>
                <Flex flexDirection="column" gridGap="24px">
                  <Controller
                    control={control}
                    name="enabled"
                    render={({ value, onChange }) => {
                      const val = tryParseJson(value);
                      return (
                        <RadioGroup
                          label="Status"
                          name="enabled"
                          direction="row"
                          options={[
                            {
                              label: 'Enabled',
                              value: 'true',
                              checked: val,
                            },
                            {
                              label: 'Disabled',
                              value: 'false',
                              checked: !val,
                            },
                          ]}
                          onChange={e => onChange(e.target.value)}
                        />
                      );
                    }}
                  />

                  <Controller
                    control={control}
                    name="severity"
                    render={({ value, onChange }) => (
                      <SeverityRange
                        label="Severity"
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                  <ComplianceContainer className="AddEditPolicy__Compliance">
                    <Text type="small-bold" color="dark">
                      Framework(s)
                    </Text>
                    <FrameworkList
                      frameworks={policyFrameworks ?? []}
                      onRemove={onRemoveFramework}
                    />
                    <Button
                      onClick={e => {
                        e.stopPropagation();
                        onOpenFrameworkForm();
                      }}
                      disabled={isFormSubmitting}
                    >
                      <PlusDark />
                      Add to framework
                    </Button>
                  </ComplianceContainer>
                </Flex>
              </PolicyEditorBlock>

              <PolicyEditorBlock
                title="3. Remediation"
                text={EDITOR_REMEDIATION_TEXT}
              >
                <Controller
                  control={control}
                  name="remediation_steps"
                  render={({ value, onChange }) => (
                    <TextArea
                      height={200}
                      value={value}
                      onChange={onChange}
                      error={errors.remediation_steps}
                      disabled={isFormSubmitting}
                    />
                  )}
                />
              </PolicyEditorBlock>

              <PolicyEditorBlock
                title="4. Rationale"
                text={EDITOR_RATIONALE_TEXT}
              >
                <Controller
                  control={control}
                  name="rationale"
                  render={({ value, onChange }) => (
                    <TextArea
                      height={200}
                      value={value}
                      onChange={onChange}
                      error={errors.rationale}
                      disabled={isFormSubmitting}
                    />
                  )}
                />
              </PolicyEditorBlock>
            </div>
            <div className="policy-logic-container">
              <Flex
                justifyContent="space-between"
                alignItems="center"
                padding="0 0 16px"
                height="auto"
              >
                <Text type="small-bold" color="dark">
                  Policy logic
                </Text>
                {(policy?.language || '').toLowerCase() !== 'rego' && (
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={handleEditCode}
                    disabled={isFormSubmitting}
                  >
                    <PenLight /> Edit code
                  </Button>
                )}
              </Flex>
              <CodeEditorContainer>
                <input type="hidden" name="query" ref={register} />
                <CodeEditor
                  width="95%"
                  theme="sb-light"
                  defaultValue={query}
                  options={{
                    readOnly: true,
                    scrollBeyondLastLine: false,
                    wordWrap: 'on',
                    padding: { top: 16 },
                  }}
                />
              </CodeEditorContainer>
              {errors?.query && (
                <Text type="small-regular" color="red">
                  {errors.query?.message}
                </Text>
              )}
              <Text type="small-regular">
                Policy rules are defined using SQL. Open the data explorer to
                create, edit and validate rules.
              </Text>
            </div>
          </PageContent>
        </form>
        {categoryModalVisible && (
          <CategoryForm
            onRequestClose={() => {
              setCategoryModalVisible();
            }}
            isOpen={categoryModalVisible}
          />
        )}
        {showComplianceModal && (
          <ComplianceModal
            onClose={onCloseFrameworkForm}
            frameworks={frameworks}
            policyFrameworks={policyFrameworks}
            isLoading={isGetFrameworksLoading}
            onSubmit={onAddFramework}
          />
        )}
      </FullscreenModal>
    </>
  );
};
