import React from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';
import { Box, Grid } from '@chakra-ui/react';
import {
  TableGW,
  PageHeader,
  Button,
  LoadingOverlay,
} from '@secberus/components';

import { OrgUser, userApi } from '@secberus/services';
import { PlusDark } from '@secberus/icons';
import { orgUsersColumns } from '../../../organization-management';
import { useGetOrgUsersPage } from '../../../organization-management/hooks/UseGetOrgUsersPage';
import { useFormRoutes } from '../../../organization-management/org-form/formRoutes';
import { useSorting } from '../../../sorting';
import { useGetCurrentOrgId } from '../../../../app/core/useGetCurrentOrg';

export const OrgMembers: React.FC = () => {
  const orgId = useGetCurrentOrgId();
  const { url } = useRouteMatch();
  const formRoutes = useFormRoutes();

  const { data: users, ...getUserQuery } = userApi.useListUsersQuery({
    limit: '500',
  });

  const {
    onSortingChange,
    sorts: [sortCol, sortDir],
  } = useSorting<OrgUser>({
    tableId: 'org-users',
  });

  const {
    data,
    fetchByPage,
    page = '1',
    limit = '10',
    PaginationComponent,
    resetState: resetPagination,
    ...getOrgUsersQuery
  } = useGetOrgUsersPage();

  const handleSort = (args: any) => {
    onSortingChange(args);
    resetPagination();
  };

  const listData = data.map(v => ({ ...v, orgId }));

  React.useEffect(() => {
    if (!orgId) return;
    fetchByPage({
      page,
      limit,
      orgid: orgId,
      sortBy: sortCol && sortDir ? `${sortCol}:${sortDir}` : '',
    });
  }, [page, limit, fetchByPage, orgId, sortCol, sortDir]);

  if (getUserQuery.isLoading || getOrgUsersQuery.isLoading)
    return <LoadingOverlay />;

  return (
    <Grid>
      <Box>
        <PageHeader title="Members">
          <Button className="contained-rounded" to={`${url}/form/member`}>
            <PlusDark width={20} height={20} /> Add members
          </Button>
        </PageHeader>
      </Box>
      <Box h="100%" w="0" minWidth="100%" padding="32px">
        <TableGW
          rowKey="id"
          isLoading={getOrgUsersQuery.isFetching}
          columns={orgUsersColumns}
          onSort={handleSort}
          data={listData}
        />
        {PaginationComponent}
      </Box>
      <Switch>{formRoutes}</Switch>
    </Grid>
  );
};
