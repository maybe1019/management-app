import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Button, PageHeader, TableGW } from '@secberus/components';
import { PlusDark } from '@secberus/icons';
import { AccessRole } from '@secberus/services';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { RolePanel } from '../panel';
import { useFormRoutes } from '../roles-form/formRoutes';
import { useSorting } from '../../sorting';
import { handleSortBy } from '../../sorting/hooks';
import { useGetRolePage } from '../hooks/useGetRolePage';
import { HoveredExpanderCell } from '../../../components';
import { columns } from './Roles.columns';
import { TableWrapper } from './Roles.styled';

export const RolesManagement = () => {
  const history = useHistory();
  const { path, url } = useRouteMatch();
  const [isVisible, setIsVisible] = React.useState(false);
  const formRoutes = useFormRoutes();

  const {
    isLoading,
    data,
    PaginationComponent,
    getRolesByPage,
    limit,
    page,
    resetState: resetPagination,
  } = useGetRolePage();

  const { onSortingChange, sorts } = useSorting({
    tableId: 'roles-list',
    defaultSorts: ['name', 'ASC'],
  });

  const sortBy = React.useMemo(() => handleSortBy(sorts), [sorts]);

  React.useEffect(() => {
    getRolesByPage({
      page,
      limit,
      sortBy,
    });
  }, [page, limit, sortBy, getRolesByPage]);

  const handleSort = (args: any[]) => {
    onSortingChange(args);
    resetPagination();
  };

  const handleRowClick = (record: AccessRole) => {
    setIsVisible(true);
    history.push(`/admin/roles/details/${record.id}`);
  };

  return (
    <>
      <Box w="100%">
        <Flex w="inherit" padding="0px">
          <PageHeader title="Roles">
            <Button color="light" to={`${url}/form/add`}>
              <PlusDark /> New role
            </Button>
          </PageHeader>
        </Flex>

        <Box h="100%" w="0" minWidth="100%" padding="32px">
          <TableWrapper>
            <TableGW<AccessRole>
              isLoading={isLoading}
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
          </TableWrapper>
          {PaginationComponent}
        </Box>
      </Box>
      <Switch>
        {formRoutes}
        <Route path={`${path}/details/:roleId`} exact>
          <RolePanel
            isVisible={isVisible}
            onClose={() => {
              setIsVisible(false);
              history.push('/admin/roles');
            }}
          />
        </Route>
      </Switch>
    </>
  );
};
