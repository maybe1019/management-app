import React from 'react';
import { Button, Text, Link } from '@secberus/components';
import { Box, Flex } from '@chakra-ui/react';
import { dataSourceApi, Datasource, policiesApi2 } from '@secberus/services';
import { useIsLoading } from '@secberus/utils';
import { RiskyIndicatorContainer } from '../styled';
import { ErrorBoundary } from '../../../../utils/wrappers/ErrorBoundaries';
import { SummaryIndicatorNoDataAndErrorState } from '../SummaryIndicatorNoDataAndErrorState.component';
import { generateURL } from '../../../../hooks/useQuery';
import { DataSourceRiskRow } from './DataSourceRiskRow.component';

const DataSourceRiskSummaryContainer: React.FC<
  React.ComponentProps<typeof RiskyIndicatorContainer>
> = ({ children, ...props }) => (
  <RiskyIndicatorContainer
    header="Top risk by data source"
    minHeight="288px"
    {...props}
  >
    {children}
  </RiskyIndicatorContainer>
);

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
          Looks like there are no data sources connected...
        </Text>
      </Box>
      <Button type="button" to="/settings/data-sources">
        Manage data sources
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
  summary: Datasource[];
}) => {
  if (showNoDataSources) {
    return <EmptyState />;
  } else if (showNoResults) {
    return <SummaryIndicatorNoDataAndErrorState />;
  }
  return (
    <Flex justifyContent="space-between" flexDirection="column" h="100%">
      <Flex flexDirection="column" css={{ gap: '16px' }} marginBottom="16px">
        {summary.map(datum => {
          const toRiskPostureFiltered = generateURL(
            '/risk-posture/policy',
            'filter',
            {
              datasourceId: [datum.id!],
            }
          );
          return (
            <DataSourceRiskRow
              key={datum.id}
              {...datum}
              to={toRiskPostureFiltered}
            />
          );
        })}
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

const DataSourceRiskSummary: React.FC = () => {
  const { data = [], ...query } = dataSourceApi.useListDatasourcesByRiskQuery(
    undefined,
    {
      selectFromResult: ({ data = [], ...remainder }) => {
        return {
          data: data.slice(0, 4),
          ...remainder,
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
    <DataSourceRiskSummaryContainer isLoading={isLoading}>
      <MaybeSummaryListOrEmpty
        showNoResults={data.length <= 0}
        showNoDataSources={policiesSubscribedCount <= 0}
        summary={data}
      />
    </DataSourceRiskSummaryContainer>
  );
};

const WithErrorBoundary = () => (
  <ErrorBoundary
    fallbackElement={
      <DataSourceRiskSummaryContainer>
        <SummaryIndicatorNoDataAndErrorState />
      </DataSourceRiskSummaryContainer>
    }
  >
    <DataSourceRiskSummary />
  </ErrorBoundary>
);

export { WithErrorBoundary as DataSourceRiskSummary };
