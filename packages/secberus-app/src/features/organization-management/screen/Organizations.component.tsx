import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Button, PageHeader, TableGW } from '@secberus/components';
import { PlusDark } from '@secberus/icons';
import { Org } from '@secberus/services';
import {
  generatePath,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';
import { useIsLoading } from '@secberus/utils';
import { OrgForm } from '../org-form/OrgForm.component';
import { updateCreateOrgSchema } from '../org-form/OrgForm.schema';
import { useSorting } from '../../sorting';
import { handleSortBy } from '../../sorting/hooks';
import { HoveredExpanderCell } from '../../../components';
import { orgManagementPaths } from '../routes';
import { useGetOrgPage } from './Organizations.hook';
import { columns } from './Organizations.columns';

export const Organizations: React.FC = () => {
  const history = useHistory();
  const { path, url } = useRouteMatch();

  const {
    data,
    PaginationComponent,
    getOrgsByPage,
    limit,
    page,
    resetState: resetPagination,
    isUninitialized,
    isLoading,
    isFetching,
  } = useGetOrgPage();

  const { onSortingChange, sorts } = useSorting({
    tableId: 'orgs-list',
  });

  const isTableLoading = useIsLoading([isUninitialized, isLoading, isFetching]);

  const sortBy = React.useMemo(() => handleSortBy(sorts), [sorts]);

  React.useEffect(() => {
    getOrgsByPage({
      page,
      limit,
      sortBy,
    });
  }, [page, limit, sortBy, getOrgsByPage]);

  const handleSort = (args: any[]) => {
    onSortingChange(args);
    resetPagination();
  };

  const handleRowClick = (record: Org) => {
    history.push(`/admin/organizations/edit/${record.id}`);
  };

  const handleFormClose = (orgId?: Org['id']) => {
    const returnUrl = generatePath(
      `/admin${
        orgId ? orgManagementPaths.editOrg : orgManagementPaths.orgManagement
      }`,
      orgId
        ? {
            orgId,
          }
        : undefined
    );

    history.push(returnUrl);
  };

  return (
    <>
      <Box w="100%">
        <Flex w="inherit" padding="0px">
          <PageHeader title="Organizations">
            <Button color="light" to={`${url}/add`}>
              <PlusDark /> New organization
            </Button>
          </PageHeader>
        </Flex>

        <Box h="100%" w="0" minWidth="100%" padding="32px">
          <TableGW<Org>
            isLoading={isTableLoading}
            columns={columns}
            data={data}
            onSort={handleSort}
            onRow={(record, index) => ({
              onClick: handleRowClick.bind(null, record, index),
            })}
            rowHoverBehavior={{
              cursor: 'pointer',
              injectedStyles: HoveredExpanderCell,
            }}
          />
          {PaginationComponent}
        </Box>
      </Box>
      <Switch>
        <Route path={`${path}/add`} exact>
          <OrgForm
            schema={updateCreateOrgSchema}
            onClose={handleFormClose}
            fields={['name']}
          />
        </Route>
      </Switch>
    </>
  );
};
