// todo: @sigkar 1/27/2023 - I think this file is not in use. Confirm it.
import React from 'react';
import { ExceptionLight, ViolationLight } from '@secberus/icons';
import {
  Text,
  BaseBadge,
  SeverityBadge,
  LoadingOverlay,
  CodeBlock,
} from '@secberus/components';
import { useHistory, useParams } from 'react-router-dom';
import moment from '../../../../utils/moment';
import { PageHeader, SummaryItem, PayloadItem } from './Details.styled';
import { RemediationTab } from '../../Policies/Details/tabs';
import {
  PolicyDetailsWrapper,
  FlexContainer,
} from '../../Policies/Details/Details.styled';
import { ErrorBoundary } from '../../../../utils/wrappers/ErrorBoundaries';
import { violationsApi, policiesApi2, categoriesApi } from '@secberus/services';
import { isNotEmptyOrUndefined, useIsLoading } from '@secberus/utils';

const ViolationDetails = () => {
  const history = useHistory();
  const { id: violationId } = useParams();

  const {
    data: violation,
    isSuccess: isGetViolationSuccess,
    isError: isGetViolaionError,
  } = violationsApi.useGetViolationQuery({
    violationId,
  });

  const { data: category, isSuccess: isGetCategorySuccess } =
    categoriesApi.useGetCategoryQuery(
      {
        categoryId: violation?.category_id,
      },
      { skip: !violation }
    );

  const { data: policy, isSuccess: isGetPolicySuccess } =
    policiesApi2.useGetPolicyQuery(
      {
        policyId: violation?.policy_id,
      },
      { skip: !violation }
    );

  const isLoading = useIsLoading([
    !isGetViolationSuccess,
    !isGetCategorySuccess,
    !isGetPolicySuccess,
  ]);

  React.useEffect(() => {
    if (isGetViolaionError) history.replace('/risk-posture');
  }, [history, isGetViolaionError]);

  const firstDetected = moment(violation?.create_timestamp ?? null).isValid()
    ? moment.unix(violation?.create_timestamp).format('YYYY-MM-DD hh:mm')
    : '-';
  const lastDetected = moment(violation?.seen_timestamp ?? null).isValid()
    ? moment.unix(violation?.seen_timestamp).format('YYYY-MM-DD hh:mm')
    : '-';

  if (isLoading) return <LoadingOverlay />;

  return (
    <PolicyDetailsWrapper>
      <PageHeader>
        <FlexContainer
          css={`
            max-width: 670px;
          `}
        >
          <SummaryItem>
            <Text type="small-bold" color="gray" className="summary-item-label">
              Policy
            </Text>
            <Text type="small" color="dark">
              {policy.name}
            </Text>
          </SummaryItem>
        </FlexContainer>
        <FlexContainer>
          <SummaryItem>
            <Text type="small-bold" color="gray" className="summary-item-label">
              Severity
            </Text>
            <SeverityBadge full priorityNum={policy.severity} />
          </SummaryItem>
          <SummaryItem>
            <Text type="small-bold" color="gray" className="summary-item-label">
              Status
            </Text>
            <BaseBadge light>
              {violation.suppressed ? (
                <>
                  <ExceptionLight /> Exception
                </>
              ) : (
                <>
                  <ViolationLight className="active-violation" /> Active
                </>
              )}
            </BaseBadge>
          </SummaryItem>
          <SummaryItem>
            <Text type="small-bold" color="gray" className="summary-item-label">
              Data source(s)
            </Text>
            <FlexContainer>
              {violation.datasources.map(({ name, dp }) => (
                <BaseBadge light label={name} icon={dp} />
              ))}
            </FlexContainer>
          </SummaryItem>
          <SummaryItem>
            <Text type="small-bold" color="gray" className="summary-item-label">
              Author
            </Text>
            <BaseBadge
              label={policy.secberus_managed ? 'Secberus' : 'Custom'}
              light
            />
          </SummaryItem>
          <SummaryItem>
            <Text type="small-bold" color="gray" className="summary-item-label">
              Category
            </Text>
            <BaseBadge label={category.name} light />
          </SummaryItem>
          <SummaryItem>
            <Text type="small-bold" color="gray" className="summary-item-label">
              Resource type
            </Text>
            <FlexContainer>
              <BaseBadge
                light
                label={policy.resource_name}
                icon={policy.datasource_types[0]}
              />
            </FlexContainer>
          </SummaryItem>
          <SummaryItem>
            <Text type="small-bold" color="gray" className="summary-item-label">
              Exposure
            </Text>
            <BaseBadge
              label={moment.unix(violation.create_timestamp).fromNow(true)}
              light
            />
          </SummaryItem>
          <SummaryItem>
            <Text type="small-bold" color="gray" className="summary-item-label">
              First detected
            </Text>
            <BaseBadge label={firstDetected} light />
          </SummaryItem>
          <SummaryItem>
            <Text type="small-bold" color="gray" className="summary-item-label">
              Last detected
            </Text>
            <BaseBadge label={lastDetected} light />
          </SummaryItem>
        </FlexContainer>
        <FlexContainer
          css={`
            width: 100%;
          `}
        >
          {violation?.tags && (
            <PayloadItem>
              <Text
                type="small-bold"
                color="gray"
                className="summary-item-label"
              >
                Resource tags
              </Text>
              {!isNotEmptyOrUndefined(violation.tags) ? (
                <Text type="small-bold" color="dark-gray">
                  No tags detected
                </Text>
              ) : (
                <CodeBlock data={violation.tags} />
              )}
            </PayloadItem>
          )}
        </FlexContainer>
        <FlexContainer
          css={`
            width: 100%;
          `}
        >
          {violation?.resource?.data && (
            <PayloadItem>
              <Text
                type="small-bold"
                color="gray"
                className="summary-item-label"
              >
                Resource data
              </Text>
              <CodeBlock data={violation.resource} />
            </PayloadItem>
          )}
        </FlexContainer>
      </PageHeader>
      <RemediationTab remediationSteps={policy.remediation_steps} />
    </PolicyDetailsWrapper>
  );
};

const WithBoundary = () => (
  <ErrorBoundary>
    <ViolationDetails />
  </ErrorBoundary>
);

export { WithBoundary as ViolationDetailsScreen };

export default WithBoundary;
