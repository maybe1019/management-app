import React from 'react';
import { useDispatch } from 'react-redux';
import { generatePath, useLocation } from 'react-router-dom';
import { Flex, Box } from '@chakra-ui/react';
import {
  Frame,
  Text,
  BaseBadge,
  CodeEditor,
  Button,
  DropdownPanel,
  DropdownPanelListItem,
  LoadingOverlay,
  DetailHeader,
  RESOURCE_LOGO_BY_TYPE,
} from '@secberus/components';
import styled from 'styled-components';
import { PenLight } from '@secberus/icons';
import {
  Policy,
  Exception,
  secberusApiGW,
  categoriesApi,
  complianceFrameworksApi,
} from '@secberus/services';
import { useIsLoading } from '@secberus/utils';
import { setFiltersAttribute } from '../../../../../store';
import { ExceptionBadge } from '../../components/AddEditExceptions/AddEditExceptions.styled';
import { HeaderButtons } from '../../components/HeaderButtons/HeaderButtons';
import { RequiredPolicy } from '../tab-bar/TabBar.component';
import { usePermissions } from '../../../../../app/rbac/definitions';
import { dataExplorerPaths } from '../../../../../features/data-explorer/routes';
import { useAppRedirect } from '../../../../../utils/useAppRedirect';
import { useGetExceptionPage } from './hooks/useGetPolicyExceptions';

const FitContent = styled.div`
  height: fit-content;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto 400px;
  grid-gap: 120px;
`;

const FrameContainer = styled.div`
  margin: 0px 32px;
  width: auto;

  &.codeContainer {
    & > div:nth-of-type(2) {
      margin-bottom: 0;
      width: 100%;
    }
  }
  .exceptions {
    margin-top: 48px;
    margin-bottom: 32px;
  }
  .exceptionContainer {
    margin-bottom: 8px;
  }
`;

type EditorTabProps = {
  policy: RequiredPolicy;
  id: NonNullable<Policy['id']>;
  policy_category_id: NonNullable<Policy['policy_category_id']>;
};

export const EditorTab: React.FC<EditorTabProps> = ({
  policy,
  id,
  policy_category_id,
}) => {
  const controls = React.useMemo(() => policy.controls, [policy]);
  const { canUpdate } = usePermissions('policies');
  const { navigateTo } = useAppRedirect();

  // Will only ever be N frameworks long
  const groupedControls = React.useMemo(() => {
    const grouped = controls?.reduce(
      (acc: Record<string, RequiredPolicy['controls']>, control) => {
        if (control.compliance_name && control.identifier) {
          if (!acc[control.compliance_name]) {
            acc[control.compliance_name] = [];
          }
          acc[control.compliance_name!].push(control);
        }
        return acc;
      },
      {}
    );
    return grouped;
  }, [controls]);

  const dispatch = useDispatch();
  const location = useLocation();

  const { data: frameworks = [], isLoading: isFrameworksLoading } =
    complianceFrameworksApi.useGetComplianceFrameworksQuery(
      {
        enabled: 'true',
      },
      {
        selectFromResult: ({ data, ...rest }) => {
          const enabledIds = data?.map(({ id }) => id);
          return {
            data: enabledIds,
            ...rest,
          };
        },
      }
    );

  const {
    isLoading: isPolicyExceptionsLoading,
    getExceptionsByPage,
    page,
    resetState,
    PaginationComponent,
    exceptions,
  } = useGetExceptionPage();

  const policyExceptions = exceptions?.results?.reduce(
    (acc: Exception[], item) => {
      const keyValue = item.conditions.filter(
        ({ field }) => field !== 'policy_id' // it's a given that we are matching the policy
      );
      if (keyValue.length > 0 && item.enabled) {
        acc.push({ ...item, conditions: keyValue });
      }
      return acc;
    },
    []
  );

  React.useEffect(() => {
    getExceptionsByPage({
      page,
      limit: '5',
      policyId: id,
    });
  }, [page, id, getExceptionsByPage]);

  // reset pagination state for exceptions on mount and exit
  React.useEffect(() => {
    resetState();
    return resetState;
  }, [resetState]);

  const { data: policyCategory, isLoading: isCategoryLoading } =
    categoriesApi.useGetCategoryQuery({
      categoryId: policy_category_id,
    });
  const { data: resources, isLoading: isResourcesLoading } =
    secberusApiGW.useGetResourceQuery(
      {
        resourceid: policy?.resource_id as string,
      },
      { skip: !policy?.resource_id }
    );

  const toViewFramework = (id: string) => {
    dispatch(setFiltersAttribute(`active.framework_id`, [id]));
  };
  const toManageExceptions = {
    pathname: `/policies/${id}/exceptions`,
    state: { prevRoute: location.pathname },
  };

  const isLoading = useIsLoading([
    isCategoryLoading,
    isResourcesLoading,
    isPolicyExceptionsLoading,
    isFrameworksLoading,
  ]);

  const editPolicyPath = `${generatePath(
    dataExplorerPaths.dataExplorerManagement,
    {
      viewType: 'policy',
      queryId: policy?.id,
    }
  )}?action=edit_policy`;

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <>
      <DetailHeader title="Policy details">
        <HeaderButtons policy={policy} />
      </DetailHeader>

      <GridContainer>
        <div>
          <FitContent>
            <FrameContainer>
              <Box>
                <Box paddingBottom="4px">
                  <Text type="small-bold" color="dark">
                    Category
                  </Text>
                </Box>
                <Text type="small-regular">
                  {!isCategoryLoading && policyCategory?.name}
                </Text>
              </Box>
              {policy && policy?.rationale && (
                <Box marginTop="24px">
                  <Box paddingBottom="4px">
                    <Text type="small-bold" color="dark">
                      Rationale
                    </Text>
                  </Box>
                  <Text type="small-regular">{policy.rationale}</Text>
                </Box>
              )}
            </FrameContainer>
            <FrameContainer className="codeContainer">
              <Box padding="20px 0px 12px 0px">
                <Flex
                  align="center"
                  justify="space-between"
                  alignItems="center"
                >
                  <Text type="small-bold">Policy logic</Text>
                  {!policy?.secberus_managed &&
                    (policy?.language || '').toLowerCase() !== 'rego' &&
                    canUpdate && (
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => navigateTo(editPolicyPath)}
                        size="small"
                      >
                        <Flex>
                          <PenLight height="12px" width="12px" />
                          <Text type="small-bold">Edit code</Text>
                        </Flex>
                      </Button>
                    )}
                </Flex>
              </Box>
              <Box backgroundColor="#F1F6FA" borderRadius="16px" margin="0px">
                <Box
                  h="500px"
                  borderRadius="16px"
                  paddingX="8px"
                  paddingY="0px"
                >
                  <CodeEditor
                    width="100%"
                    defaultLanguage="REGO"
                    defaultValue={policy?.query || policy?.logic}
                    theme="sb-light"
                    options={{
                      readOnly: true,
                      scrollBeyondLastLine: false,
                      wordWrap: 'on',
                      padding: { top: 16 },
                      automaticLayout: true,
                    }}
                  />
                </Box>
              </Box>
            </FrameContainer>
            {policyExceptions?.length > 0 && (
              <FrameContainer>
                <Box marginBottom="32px">
                  <Box paddingTop="32px">
                    <Flex
                      align="center"
                      justify="space-between"
                      alignItems="center"
                      marginBottom="12px"
                    >
                      <Text type="small-bold">Exceptions</Text>
                      <Button
                        type="button"
                        variant="secondary"
                        to={toManageExceptions}
                        size="small"
                      >
                        <Flex>
                          <PenLight height="12px" width="12px" />{' '}
                          <Text type="small-bold">Edit exceptions</Text>
                        </Flex>
                      </Button>
                    </Flex>
                    {policyExceptions?.map(
                      ({ name, conditions }: Exception) => (
                        <div className="exceptionContainer">
                          <Frame
                            isVisible
                            backgroundColor="light-gray"
                            borderSize={0}
                            titleColor="dark"
                          >
                            <Text color="dark" type="bold">
                              {name}
                            </Text>
                            <ExceptionBadge>
                              {conditions.map(({ field, value }, index) => {
                                return (
                                  <>
                                    {index > 0 &&
                                      index <= conditions.length + 1 && (
                                        <Text type="small-bold" color="dark">
                                          AND
                                        </Text>
                                      )}
                                    <Text type="small-bold" color="dark">
                                      <div>
                                        Key:{' '}
                                        <BaseBadge
                                          light
                                          badgeColor="medium-gray"
                                        >
                                          {field.replace(
                                            /((tags.)|(resource.data.))/g,
                                            ''
                                          )}
                                        </BaseBadge>{' '}
                                      </div>
                                      <div>
                                        Value{' '}
                                        <BaseBadge
                                          light
                                          badgeColor="medium-gray"
                                        >
                                          {value}
                                        </BaseBadge>
                                      </div>
                                    </Text>
                                  </>
                                );
                              })}
                            </ExceptionBadge>
                          </Frame>
                        </div>
                      )
                    )}
                  </Box>
                  {PaginationComponent}
                </Box>
              </FrameContainer>
            )}
          </FitContent>
        </div>
        <Box width="360px" marginBottom="72px">
          <DropdownPanel title="Resource type">
            <DropdownPanelListItem title="" displayOnly={true}>
              <Text type="small-regular">
                <Flex
                  justifyContent="left"
                  flexDirection="row"
                  alignItems="center"
                >
                  {resources?.datasource_types?.map(type => {
                    const typeString = type.toString().toLowerCase();
                    if (typeString in RESOURCE_LOGO_BY_TYPE) {
                      const RenderIcon = RESOURCE_LOGO_BY_TYPE[typeString];
                      return <RenderIcon height={20} width={20} />;
                    }
                    return null;
                  })}
                  &nbsp;
                  {resources?.name}
                </Flex>
              </Text>
            </DropdownPanelListItem>
          </DropdownPanel>
          <Box height="20px" />
          <DropdownPanel title="Included in frameworks">
            {controls ? (
              <>
                {Object.entries(groupedControls).map(
                  ([title, frameworkControls]) => {
                    return (
                      <DropdownPanelListItem key={title} title={title}>
                        <Box padding="2px 2px 6px 2px">
                          <Box paddingBottom="4px">
                            <Text type="xsmall-bold" color="gray">
                              Control ID
                            </Text>
                          </Box>
                          {frameworkControls.map(({ identifier }) => (
                            <>
                              <Box paddingBottom="4px">
                                <Text type="small-regular">{identifier!}</Text>
                              </Box>
                            </>
                          ))}
                          {frameworks.includes(
                            frameworkControls?.[0]?.compliance_id
                          ) &&
                            typeof frameworkControls?.[0]?.compliance_id ===
                              'string' && (
                              <Box paddingTop="12px" paddingBottom="4px">
                                <Button
                                  type="button"
                                  variant="secondary"
                                  onClick={() =>
                                    toViewFramework(
                                      frameworkControls[0].compliance_id!
                                    )
                                  }
                                  to="/compliances"
                                  size="small"
                                >
                                  <Text type="small-bold">View framework</Text>
                                </Button>
                              </Box>
                            )}
                        </Box>
                      </DropdownPanelListItem>
                    );
                  }
                )}
              </>
            ) : (
              <DropdownPanelListItem title="" displayOnly={true}>
                <Text type="caption" color="gray">
                  No controls
                </Text>
              </DropdownPanelListItem>
            )}
          </DropdownPanel>
        </Box>
      </GridContainer>
    </>
  );
};
