import React from 'react';
import { Flex, Box } from '@chakra-ui/react';
import {
  LoadingOverlay,
  PassFailBadge,
  PolicyBadge,
  ViolationsBadge,
  Branding,
  PageHeader,
  Text,
  Button,
} from '@secberus/components';
import { useParams } from 'react-router-dom';
import { Filter } from '@secberus/icons';
import { complianceFrameworksApi, secberusApiGW } from '@secberus/services';
import { ErrorBoundary } from '../../../../utils/wrappers/ErrorBoundaries';
import {
  HeaderWidgetContainer,
  PageDivider,
  BadgeContainer,
} from '../Compliances.styled';
import getTitleWithOrdinal from '../../../../utils/getTitleWithOrdinal';
import { ControlPolicies } from './ControlPolicies';
import { useTableFilters } from '../../../../features/filters';
import { RightButtonContainer } from '../../../../features/page-header';

const Control = () => {
  const listRef = React.useRef();
  const { id: controlId } = useParams();
  const { data: ancestry, isLoading: isAncestryLoading } =
    secberusApiGW.useGetControlAncestryQuery({
      controlId,
    });

  const parentFrameworkName = React.useMemo(() => {
    if (ancestry?.length > 0) {
      return ancestry[0]?.identifier ?? '';
    }
    return '';
  }, [ancestry]);

  const [isInit, setIsInit] = React.useState(false);

  const [queryParams, setQueryParams] = React.useState({});

  const {
    data: compliance = { policies: [], violations: [] },
    isLoading: isComplianceLoading,
    isFetching: isComplianceFetching,
    isUninitialized: isComplianceUninit,
  } = complianceFrameworksApi.useComputeControlComplianceQuery({
    controlId,
    ...queryParams,
  });

  React.useEffect(() => {
    if (!isInit && !isComplianceLoading && !isComplianceUninit) setIsInit(true);
  }, [isComplianceLoading, isComplianceUninit, isInit]);

  React.useEffect(() => {
    if (listRef.current) {
      listRef.current.resetAfterIndex(0);
    }
  }, [compliance]);

  const {
    filterPanel: FilterPanel,
    tagBar: TagBar,
    toggleOpen,
  } = useTableFilters({
    onChange: (filters = {}) => setQueryParams(filters),
    filters: ['datasourceId', 'resourceData', 'resourceId'],
  });

  const title = getTitleWithOrdinal(
    compliance.ordinal ?? '',
    compliance.identifier ?? ''
  );

  const isLoading =
    isComplianceLoading || isComplianceFetching || isAncestryLoading;

  if (!isInit) return <LoadingOverlay />;

  const {
    policy_count = 0,
    failed_policy_count = 0,
    violation_count = 0,
  } = compliance;

  return (
    <Box w="100%" h="100%">
      {FilterPanel}
      <Flex
        w="100%"
        wrap="wrap"
        direction="column"
        padding="32px 0px 32px 0px"
        backgroundColor="#F1F6FA"
      >
        <Flex direction="column" sx={{ paddingBottom: '20px' }}>
          {parentFrameworkName?.length > 0 && (
            <Flex width="100%" direction="column">
              <Flex sx={{ padding: '0px 32px' }}>
                <Branding title={parentFrameworkName} />
              </Flex>

              <PageDivider />
            </Flex>
          )}
          <Flex sx={{ padding: '0px 32px' }}>
            <Text type="small">{title}</Text>
          </Flex>
        </Flex>
        <Flex sx={{ padding: '0px 32px' }}>
          <HeaderWidgetContainer>
            <BadgeContainer>
              <PolicyBadge count={policy_count} size="small" />
              <PassFailBadge
                pass={policy_count - failed_policy_count}
                fail={failed_policy_count}
              />
            </BadgeContainer>
            <BadgeContainer className="violations">
              <ViolationsBadge
                light
                withViolations
                violations={violation_count}
              />
            </BadgeContainer>
          </HeaderWidgetContainer>
        </Flex>
      </Flex>
      <Flex w="100%" direction="column">
        <Flex w="100%">
          <PageHeader align="flex-end">
            <RightButtonContainer>
              <Button
                icon
                variant="secondary"
                desc="Filters"
                onClick={toggleOpen}
              >
                <Filter />
              </Button>
            </RightButtonContainer>
          </PageHeader>
        </Flex>
        {TagBar}
      </Flex>
      <Box padding="40px 40px 8px 40px">
        <ControlPolicies policies={compliance.policies} isLoading={isLoading} />
      </Box>
    </Box>
  );
};

const WithBoundary = () => (
  <ErrorBoundary>
    <Control />
  </ErrorBoundary>
);

export { WithBoundary as ControlScreen };

export default WithBoundary;
