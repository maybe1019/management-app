import React from 'react';
import { Flex } from '@chakra-ui/react';
import { Text } from '@secberus/components';
import { useHistory } from 'react-router-dom';
import { dataSourceApi } from '@secberus/services';
import { useIsLoading } from '@secberus/utils';
import { DataSourceIcon, DataSourceTypeId } from '../../../datasources';
import { RiskyIndicatorContainer } from '../styled';
import { ErrorBoundary } from '../../../../utils/wrappers/ErrorBoundaries';

const ALLOW_LIST: DataSourceTypeId[] = ['aws', 'gcp', 'azure', 'github'];

const DataSourceSummaryContainer: React.FC<
  React.ComponentProps<typeof RiskyIndicatorContainer>
> = ({ children, ...props }) => (
  <RiskyIndicatorContainer
    header="Data sources monitored"
    minHeight="132px"
    {...props}
  >
    {children}
  </RiskyIndicatorContainer>
);

const DataSourceSummary = () => {
  const history = useHistory();

  const {
    data: dataSourceSummary = [],
    isLoading: isDataSourceSummaryLoading,
    isFetching: isDataSourceSummaryFetching,
    isUninitialized: isDataSourceSummaryUninitialized,
  } = dataSourceApi.useGetDatasourceSummaryQuery();

  const isLoading = useIsLoading([
    isDataSourceSummaryLoading,
    isDataSourceSummaryFetching,
    isDataSourceSummaryUninitialized,
  ]);

  const toDataSources = () => {
    history.push({ pathname: `/settings/data-sources` });
  };

  const allowedDataSources = React.useMemo(() => {
    return dataSourceSummary
      ? dataSourceSummary.filter(
          ({ datasource_type_id }) =>
            datasource_type_id &&
            ALLOW_LIST.indexOf(
              datasource_type_id.toLowerCase() as DataSourceTypeId
            ) > -1
        )
      : [];
  }, [dataSourceSummary]);
  return (
    <DataSourceSummaryContainer
      menuOptions={[
        {
          id: 'ManageDataSources',
          name: 'Manage data sources',
          onClick: toDataSources,
        },
      ]}
      isLoading={isLoading}
    >
      <Flex sx={{ gap: '32px' }} height="100%">
        {!isLoading &&
          allowedDataSources &&
          allowedDataSources.map(
            ({ datasource_type_id = 'default', count = '0' }) => (
              <Flex sx={{ gap: '8px' }} alignItems="center">
                <DataSourceIcon
                  type={datasource_type_id.toLowerCase() as DataSourceTypeId}
                  height="32px"
                  width="32px"
                />
                <Text type="xsmall">{count}</Text>
              </Flex>
            )
          )}
      </Flex>
    </DataSourceSummaryContainer>
  );
};

const WithErrorBoundary = () => (
  <ErrorBoundary fallbackElement={<DataSourceSummaryContainer />}>
    <DataSourceSummary />
  </ErrorBoundary>
);

export { WithErrorBoundary as DataSourceSummary };
