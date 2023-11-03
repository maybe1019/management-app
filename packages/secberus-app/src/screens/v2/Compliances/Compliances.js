// Safari SVG PR - https://github.com/secberus/secberus-app/pull/2250
// Safari SVG issue - https://secberus.atlassian.net/browse/WEB-310
// Was resolved by loading states, not actually fixing the SVG
// If you are not seeing SVGs in the blocks pass/fail, check these two and
// see if they are similar
import React from 'react';
import { Box, Flex, Grid } from '@chakra-ui/react';
import {
  ComplianceWidget,
  ControlsWidget,
  LoadingOverlay,
  PageHeader,
  PillSwitcher,
  Button,
  Text,
} from '@secberus/components';
import { Filter, Settings } from '@secberus/icons';
import CompliancesTable from './Compliances.table';
import { ControlTextContainer } from './Compliances.styled';
import { ErrorBoundary } from '../../../utils/wrappers/ErrorBoundaries';
import { complianceFrameworksApi } from '@secberus/services';
import { useTableFilters } from '../../../features/filters';
import { RightButtonContainer } from '../../../features/page-header';
import { MissingResourcesGuard } from '../../../components/Placeholder/MissingResourcesGuard';
import { useIsLoading } from '@secberus/utils';
import { ExportCSV } from '../../../features/export-csv/ExportCSV.component';
import {
  Switch,
  useParams,
  Route,
  Redirect,
  useRouteMatch,
  useHistory,
} from 'react-router-dom';
import { usePermissions } from '../../../app/rbac/definitions';
import { frameworkPaths } from '../../../features/frameworks/routes';

// sort object array by name key with sort function
const sortBy = (arr = [], sortFn) => {
  return arr.sort((a, b) => {
    const aName = sortFn(a);
    const bName = sortFn(b);
    return aName < bName ? -1 : aName > bName ? 1 : 0;
  });
};

const Compliance = () => {
  const { path, url } = useRouteMatch();
  const { frameworkId } = useParams();
  const history = useHistory();

  const { data: frameworks = [], ...frameworksQuery } =
    complianceFrameworksApi.useGetComplianceFrameworksQuery(
      {
        enabled: true,
      },
      {
        selectFromResult: ({ data, ...rest }) => {
          return {
            data,
            ...rest,
          };
        },
      }
    );

  const framework = frameworks.find(({ id }) => frameworkId === id);

  if (
    frameworksQuery.isFetching ||
    frameworksQuery.isLoading ||
    frameworksQuery.isUninitialized
  ) {
    return <LoadingOverlay />;
  }

  if (!framework && frameworks.length) {
    history.push('/compliances/details/' + frameworks?.[0]?.id);
  }

  return (
    <Switch>
      <Route path={path + '/details/:frameworkId'} exact>
        <MissingResourcesGuard resources={['frameworks']}>
          <ComplianceList framework={framework} frameworks={frameworks} />
        </MissingResourcesGuard>
      </Route>
      <Route path={path} exact>
        <MissingResourcesGuard resources={['frameworks']}>
          <Redirect to={url + `/details/${frameworks?.[0]?.id}`} />
        </MissingResourcesGuard>
      </Route>
    </Switch>
  );
};

const ComplianceList = ({ framework, frameworks }) => {
  const [queryParams, setQueryParams] = React.useState();
  const { canUpdate } = usePermissions('compliance-frameworks');
  const history = useHistory();

  const { data: compliance = {}, ...getFrameworkComplianceQuery } =
    complianceFrameworksApi.useGetComplianceFrameworkComplianceQuery(
      {
        frameworkId: framework.id,
        ...queryParams,
      },
      { skip: !queryParams }
    );

  const {
    filterPanel: FilterPanel,
    tagBar: TagBar,
    toggleOpen,
  } = useTableFilters({
    onChange: (filters = {}) => setQueryParams(filters),
    filters: ['datasourceId', 'resourceId', 'resourceData', 'datasourceType'],
  });

  const isLoading = useIsLoading([
    getFrameworkComplianceQuery.isFetching,
    getFrameworkComplianceQuery.isLoading,
    getFrameworkComplianceQuery.isUninitialized,
  ]);

  return (
    <>
      <Box w="100%">
        {FilterPanel}
        <Flex height="100%">
          <PageHeader title="Compliance" align={'space-between'}>
            <PillSwitcher
              leftLabel="Frameworks"
              rightLabel={framework?.name}
              options={sortBy([...frameworks], cmpl => cmpl.name.toLowerCase())}
              onSelect={val => {
                history.push(`/compliances/details/${val.id}`);
              }}
              rightPillWidth="278px"
              initialSelected={framework?.id}
            />
            <RightButtonContainer>
              {canUpdate && (
                <Button
                  icon
                  variant="secondary"
                  desc="Manage frameworks"
                  to={frameworkPaths.frameworks}
                >
                  <Settings />
                </Button>
              )}
              <ExportCSV
                type="compliance"
                arg={{ ...queryParams, frameworkId: framework?.id }}
              />
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
        <Flex w="100%">{TagBar}</Flex>
        <MissingResourcesGuard resources={['dataSources', 'policies']}>
          <>
            <Flex padding="32px 32px 16px 32px">
              <Text type="medium">{framework?.name}</Text>
            </Flex>
            {framework?.description &&
              framework?.description !== framework?.name && (
                <Flex padding="0px 32px 16px 32px">
                  <Text type="small-regular">{framework?.description}</Text>
                </Flex>
              )}
            <ControlTextContainer>
              <Flex>
                <Text type="small-regular">Applicable controls:&nbsp;</Text>
                <Text type="small-bold">{compliance?.control_count ?? 0}</Text>
              </Flex>

              <Flex>
                <Text type="small-regular">Policies:&nbsp;</Text>
                <Text type="small-bold">{compliance?.policy_count ?? 0}</Text>
              </Flex>

              {compliance?.secberus_managed && (
                <Text type="small-regular">Maintained by: Secberus</Text>
              )}
            </ControlTextContainer>
            <Grid
              gridTemplateColumns="min-content min-content"
              sx={{ gap: '20px' }}
              padding="32px"
              paddingBottom="24px"
            >
              <ComplianceWidget
                compliance={Math.round(compliance.compliance_score)}
                showTrendChart={false}
                isLoading={isLoading}
              />
              <ControlsWidget
                pass={
                  compliance.control_count - compliance.failed_control_count
                }
                fail={compliance.failed_control_count}
                isLoading={isLoading}
              />
            </Grid>
            <Box padding="0px 32px 24px 32px">
              <CompliancesTable
                frameworks={compliance.children}
                isLoading={isLoading}
              />
            </Box>
          </>
        </MissingResourcesGuard>
      </Box>
    </>
  );
};

const WithBoundary = () => (
  <ErrorBoundary>
    <Compliance />
  </ErrorBoundary>
);

export { WithBoundary as CompliancesScreen };

export default WithBoundary;
