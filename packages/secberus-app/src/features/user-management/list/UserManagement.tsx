import { Flex, Box } from '@chakra-ui/react';
import React from 'react';
import { Button, TableGW, PageHeader } from '@secberus/components';
import { PlusDark } from '@secberus/icons';
import { User } from '@secberus/services';
import { useHistory } from 'react-router-dom';
import { useSorting, handleSortBy } from '../../sorting';
import { UserForm } from '../user-form';
import { HoveredExpanderCell } from '../../../components';
import { useGetUsersPage } from './useGetUsersPage';
import { userTableColumns } from './userTable.columns';

export const UserManagement = () => {
  const {
    isUsersLoading,
    getUsersByPage,
    page,
    users,
    PaginationComponent,
    resetState: resetPagination,
    limit,
  } = useGetUsersPage();

  const history = useHistory();

  const { onSortingChange, sorts } = useSorting({
    tableId: 'users-list',
    defaultSorts: ['name', 'ASC'],
  });

  const sortBy = React.useMemo(() => handleSortBy(sorts), [sorts]);

  React.useEffect(() => {
    if (!page || !limit) return;
    getUsersByPage({
      page,
      limit,
      sortBy,
    });
  }, [page, limit, sortBy, getUsersByPage]);

  const handleSort = (args: any[]) => {
    onSortingChange(args);
    resetPagination();
  };

  const [formVisible, setFormVisible] = React.useState<boolean>(false);

  const handleRowClick = (record: User) => {
    history.push(`/admin/users/edit/${record.id}`);
  };

  return (
    <>
      <Box h="100%" w="100%">
        <Flex w="100%" padding="0px">
          <PageHeader title="Users">
            <Button color="light" onClick={() => setFormVisible(true)}>
              <PlusDark /> New user
            </Button>
          </PageHeader>
        </Flex>
        <Box h="100%" w="0" minWidth="100%" padding="32px">
          <TableGW
            isLoading={isUsersLoading}
            columns={userTableColumns as any}
            data={users?.results ?? []}
            onSort={handleSort}
            rowHoverBehavior={{
              cursor: 'pointer',
              injectedStyles: HoveredExpanderCell,
            }}
            onRow={(record, index) => ({
              onClick: handleRowClick.bind(null, record, index),
            })}
          />
          {PaginationComponent}
        </Box>
      </Box>
      {formVisible && (
        <UserForm
          onClose={() => {
            setFormVisible(false);
          }}
          onSubmit={user => {
            history.push(`/admin/users/edit/${user.id}`);
          }}
        />
      )}
    </>
  );
};
