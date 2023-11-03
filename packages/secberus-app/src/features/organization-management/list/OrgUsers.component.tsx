import React from 'react';
import { Switch, useRouteMatch, useHistory } from 'react-router-dom';
import { Box, Flex, Grid } from '@chakra-ui/react';
import {
  Text,
  ButtonDropdown,
  TableGW,
  PageHeader,
  Button,
  LoadingOverlay,
} from '@secberus/components';
import { SettingsLight } from '@secberus/icons';
import { organizationApi, OrgUser, userApi } from '@secberus/services';
import { PlusDark } from '@secberus/icons';
import { useGetOrgUsersPage } from '../hooks/UseGetOrgUsersPage';
import { useFormRoutes } from '../org-form/formRoutes';
import { useSorting } from '../../sorting';
import { useGetCurrentOrgId } from '../../../app/core/useGetCurrentOrg';
import { orgUsersColumns } from './UseOrgUsersColumns';

export const OrgUsers: React.FC = () => {
  const orgId = useGetCurrentOrgId();
  const { url } = useRouteMatch();
  const history = useHistory();
  const formRoutes = useFormRoutes();

  const { data: organization, ...getOrgQuery } = organizationApi.useGetOrgQuery(
    { orgid: orgId }
  );

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
    fetchByPage({
      page,
      limit,
      orgid: orgId,
      sortBy: sortCol && sortDir ? `${sortCol}:${sortDir}` : '',
    });
  }, [page, limit, fetchByPage, orgId, sortCol, sortDir]);

  const editOptions = [
    {
      name: 'Change name',
      id: 'edit',
      onClick: () => history.push(`${url}/form/name`),
    },
    {
      name: 'Delete organization',
      id: 'delete',
      destructive: true,
      onClick: () => history.push(`${url}/form/delete`),
    },
  ];

  if (
    getUserQuery.isLoading ||
    getOrgQuery.isLoading ||
    getOrgUsersQuery.isLoading
  )
    return <LoadingOverlay />;

  return (
    <Grid>
      <Box w="100%" background="#F1F6FA">
        <Flex padding="32px" justifyContent="space-between">
          <Text color="dark" type="medium">
            {organization?.name}
          </Text>
          <ButtonDropdown
            variant="secondary"
            icon
            alignRight
            listWidth="180px"
            label={<SettingsLight />}
            options={editOptions}
          />
        </Flex>
      </Box>
      <Box>
        <PageHeader title="Members">
          <Button
            className="contained-rounded"
            variant="primary"
            to={`${url}/form/member`}
          >
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
