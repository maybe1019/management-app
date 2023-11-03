import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useHistory, useLocation } from 'react-router-dom';
import { Button, Text, IndicatorContainer } from '@secberus/components';
import { useIsLoading } from '@secberus/utils';
import { ComplianceFrameworkSummary } from '@secberus/services';
import { OverviewPaginationContainer } from '../styled';
import { ErrorBoundary } from '../../../../utils/wrappers/ErrorBoundaries';
import { SummaryIndicatorNoDataAndErrorState } from '../SummaryIndicatorNoDataAndErrorState.component';
import { useHasPermissions } from '../../../../app/abac/hooks/useHasPermissions';
import { ComplianceIndicator } from './ComplianceIndicator';
import { useGetComplianceSummary } from './hooks/useGetComplianceSummary';

const ComplianceRiskSummaryContainer: React.FC<
  Partial<React.ComponentProps<typeof IndicatorContainer>>
> = ({ children, ...props }) => (
  <IndicatorContainer header="Compliance" minHeight="288px" {...props}>
    {children}
  </IndicatorContainer>
);

const MaybeSummaryListOrEmpty = ({
  empty,
  summary,
  frameworksEnabled,
}: {
  empty: boolean;
  frameworksEnabled: boolean;
  summary: ComplianceFrameworkSummary[];
}) => {
  const hasPerms = useHasPermissions(
    'api:compliance-frameworks:list',
    'api:compliance-frameworks:read',
    'api:compliance-frameworks:update'
  );

  if (!empty) {
    return (
      <>
        {summary.map(vals => (
          <ComplianceIndicator {...vals} />
        ))}
      </>
    );
  }
  // @colemars TODO RBAC/ABAC STRAT-8: This should be replaced with some sort of conditional component renderer responsible for role gating.
  if (!hasPerms || frameworksEnabled) {
    return <SummaryIndicatorNoDataAndErrorState />;
  }

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      height="100%"
    >
      <Box marginBottom="16px">
        <Text type="bold" color="gray">
          Looks like there are no frameworks enabled...
        </Text>
      </Box>
      <Button type="button" to="/frameworks">
        Enable frameworks
      </Button>
    </Flex>
  );
};

const ComplianceRiskSummary: React.FC = () => {
  const [history, location] = [useHistory(), useLocation()];

  const {
    page,
    PaginationComponent,
    limit,
    data: summary,
    fetchByPage,
    getComplianceFrameworks,
    ...getSummary
  } = useGetComplianceSummary();

  React.useEffect(() => {
    fetchByPage({
      page,
      limit: '4',
    });
  }, [page, limit, fetchByPage]);

  const toCompliance = () => {
    history.push({
      pathname: `/compliances`,
      state: { prevRoute: location.pathname },
    });
  };

  const manageFrameworks = () => {
    history.push({
      pathname: `/frameworks`,
      state: { prevRoute: location.pathname },
    });
  };

  const isLoading = useIsLoading([
    getSummary.isFetching,
    getSummary.isLoading,
    getComplianceFrameworks.isLoading,
    getComplianceFrameworks.isFetching,
  ]);

  const emptyStateBool = !summary.length;
  const frameworksEnabled = !!getComplianceFrameworks?.data?.length;

  const hasPerms = useHasPermissions(
    'api:compliance-frameworks:list',
    'api:compliance-frameworks:read',
    'api:compliance-frameworks:update'
  );

  return (
    <ComplianceRiskSummaryContainer
      isLoading={isLoading}
      menuOptions={
        hasPerms
          ? [
              {
                id: 'view',
                name: 'View compliance',
                onClick: toCompliance,
              },
              {
                id: 'manage',
                name: 'Manage frameworks',
                onClick: manageFrameworks,
              },
            ]
          : undefined
      }
    >
      <Flex
        flexDirection="column"
        alignItems="stretch"
        height="100%"
        justifyContent="space-between"
      >
        <Flex sx={{ gap: '16px' }} flexDirection="column" height="100%">
          <MaybeSummaryListOrEmpty
            empty={emptyStateBool}
            frameworksEnabled={frameworksEnabled}
            summary={summary}
          />
        </Flex>
        <OverviewPaginationContainer>
          {!emptyStateBool && PaginationComponent && PaginationComponent}
        </OverviewPaginationContainer>
      </Flex>
    </ComplianceRiskSummaryContainer>
  );
};

const WithErrorBoundary = () => (
  <ErrorBoundary
    fallbackElement={
      <ComplianceRiskSummaryContainer>
        <SummaryIndicatorNoDataAndErrorState />
      </ComplianceRiskSummaryContainer>
    }
  >
    <ComplianceRiskSummary />
  </ErrorBoundary>
);

export { WithErrorBoundary as ComplianceRiskSummary };
