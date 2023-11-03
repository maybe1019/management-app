import React from 'react';
import { startCase } from 'lodash';
import { Flex, Box, GridItem } from '@chakra-ui/react';
import { Switch, Route, useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import { Button, PageHeader, PillSwitcher } from '@secberus/components';
import { Filter } from '@secberus/icons';
import { ErrorBoundary } from '../../../utils/wrappers/ErrorBoundaries';
import { useTableFilters } from '../../../features/filters';
import { RightButtonContainer } from '../../../features/page-header';
import { Categories, Policies } from './components';
import { ExportCSV } from '../../../features/export-csv/ExportCSV.component';
import { ExpandInput } from '../../../features/filter-panel/expand-input/ExpandInput.component';

const RiskPosture = () => {
  const [queryParams, setQueryParams] = React.useState({});
  const { view = 'policy' } = useParams();
  const history = useHistory();

  const [resultCount, setResultCount] = React.useState(0);

  const {
    filterPanel: FilterPanel,
    toggleOpen,
    addFilter,
    tagBar: TagBar,
  } = useTableFilters({
    onChange: (filters = {}) => {
      setQueryParams(filters);
    },
    filters: [
      'showPassing',
      'datasourceType',
      'datasourceId',
      'severityLabel',
      'categoryId',
      'complianceId',
      'resourceId',
      'tag',
      'resourceData',
      'name',
    ],
    entityType: view === 'policy' ? 'policies' : 'violations',
    resultCount,
  });

  const options = [
    {
      id: 'policy',
      name: 'Policy',
      onClick: () => history.push('/risk-posture/policy'),
    },
    {
      id: 'category',
      name: 'Category',
      onClick: () => history.push('/risk-posture/category'),
    },
  ];

  return (
    <Box w="100%">
      {FilterPanel}
      <Flex h="100%" w="100%" justify="space-between" padding="0px">
        <PageHeader title="Risk posture" align={'space-between'}>
          <PillSwitcher
            leftLabel="View by"
            rightLabel={startCase(view)}
            options={options}
            rightPillWidth="164px"
            initialSelected={view}
          />
          <RightButtonContainer>
            {view === 'policy' && (
              <>
                <ExpandInput
                  onChange={val => {
                    return addFilter(['name', val ? [val] : []]);
                  }}
                  value={queryParams.name}
                  placeholder="Search by policy name or ID"
                  id="policy-search"
                />
                <ExportCSV
                  type={['risk', 'violations']}
                  arg={{ ...queryParams, onlyFailed: queryParams.showPassing }}
                />
              </>
            )}
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
      <GridItem height="100%" colSpan={5}>
        {TagBar}
      </GridItem>
      <Switch>
        <Route path="/org/:orgid/risk-posture/category">
          <Categories
            filters={queryParams}
            onChange={result => setResultCount(result.violation_count)}
            onWidgetClick={(type, { priority }) => {
              if (type === 'violations') {
                addFilter(['severityLabel', [priority]]);
              }
            }}
          />
        </Route>
        <Route path="/org/:orgId/risk-posture/policy">
          <Policies
            filters={queryParams}
            onChange={result => setResultCount(result.cursor.total)}
            onWidgetClick={(type, { priority }) => {
              if (type === 'violations') {
                addFilter(['severityLabel', [priority]]);
              }
            }}
          />
        </Route>
      </Switch>
    </Box>
  );
};

const WithBoundary = () => (
  <ErrorBoundary>
    <RiskPosture />
  </ErrorBoundary>
);

export { WithBoundary as RiskPostureScreen };

export default WithBoundary;
