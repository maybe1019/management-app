import React from 'react';
import { Button, Text, Link } from '@secberus/components';
import { Box, Flex } from '@chakra-ui/react';
import { policiesApi, policiesApi2, PolicySummary } from '@secberus/services';
import { useIsLoading } from '@secberus/utils';
import { RiskyIndicatorContainer } from '../styled';
import { ErrorBoundary } from '../../../../utils/wrappers/ErrorBoundaries';
import { SummaryIndicatorNoDataAndErrorState } from '../SummaryIndicatorNoDataAndErrorState.component';
import { PolicyRiskIndicator } from './PolicyRiskIndicator';

const PolicyRiskSummaryContainer: React.FC<
  React.ComponentProps<typeof RiskyIndicatorContainer>
> = ({ children, ...props }) => {
  return (
    <RiskyIndicatorContainer
      minHeight="288px"
      header="Top risk by policy"
      {...props}
    >
      {children}
    </RiskyIndicatorContainer>
  );
};

const EmptyState: React.FC = () => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      height="100%"
    >
      <Box marginBottom="16px">
        <Text type="xsmall" color="gray">
          Looks like there are no policies enabled...
        </Text>
      </Box>
      <Button type="button" to="/policies">
        Enable policies
      </Button>
    </Flex>
  );
};

const MaybeSummaryListOrEmpty = ({
  showNoResults,
  showNoDataSources,
  summary,
}: {
  showNoResults: boolean;
  showNoDataSources: boolean;
  summary: PolicySummary;
}) => {
  if (showNoDataSources) {
    return <EmptyState />;
  } else if (showNoResults) {
    return <SummaryIndicatorNoDataAndErrorState />;
  }

  const riskPolicyLink = {
    pathname: '/risk-posture/policy',
    state: { resetFilters: true },
  };

  return (
    <Flex justifyContent="space-between" flexDirection="column" h="100%">
      <Flex flexDirection="column" css={{ gap: '16px' }} marginBottom="16px">
        {summary.map(policy => (
          <PolicyRiskIndicator key={policy.id} {...policy} />
        ))}
      </Flex>
      <div>
        <Link
          to="/risk-posture/policy?force_reset=filter"
          underline
          color="blue"
          type="small-regular"
        >
          View all
        </Link>
      </div>
    </Flex>
  );
};

const PolicyRiskSummary: React.FC = () => {
  const { data = [], ...query } = policiesApi.useSummarizePoliciesQuery(
    undefined,
    {
      selectFromResult: ({ data = [], ...rest }) => {
        return {
          data: data.slice(0, 4),
          ...rest,
        };
      },
    }
  );
  const { data: policiesSubscribedData, isLoading: policiesLoading } =
    policiesApi2.useListPoliciesQuery({
      subscribed: true,
    });

  const isLoading = useIsLoading([
    query.isFetching,
    query.isLoading,
    policiesLoading,
  ]);

  const policiesSubscribedCount = policiesSubscribedData?.cursor.total ?? 0;

  return (
    <PolicyRiskSummaryContainer isLoading={isLoading}>
      <MaybeSummaryListOrEmpty
        showNoResults={data.length <= 0}
        showNoDataSources={policiesSubscribedCount <= 0}
        summary={data}
      />
    </PolicyRiskSummaryContainer>
  );
};

const WithErrorBoundary = () => (
  <ErrorBoundary
    fallbackElement={
      <PolicyRiskSummaryContainer>
        <SummaryIndicatorNoDataAndErrorState />
      </PolicyRiskSummaryContainer>
    }
  >
    <PolicyRiskSummary />
  </ErrorBoundary>
);

export { WithErrorBoundary as PolicyRiskSummary };
