import React from 'react';
import { Box } from '@chakra-ui/react';
import { Button, PageHeader, TableGW } from '@secberus/components';
import { PlusDark } from '@secberus/icons';
import { useHistory } from 'react-router-dom';
import { AccessPolicy } from '@secberus/services';
import { HoveredExpanderCell } from '../../../components';
import { RightButtonContainer } from '../../page-header';
import { useGetAccessPolicies } from '../hooks/useGetAccessPolicies';
import { useHasPermissions } from '../../../app/abac/hooks/useHasPermissions';
import { useSorting } from '../../sorting';
import { handleSortBy } from '../../sorting/hooks';
import { accessPoliciesColumns } from './AccessPoliciesList.columns';

export function AccessPoliciesList() {
  const history = useHistory();

  const handleRowClick = React.useCallback(
    (record, index, event) => {
      const link = `/admin/access-policies/access-policy/details/${record.id}`;
      history.push(link);
    },
    [history]
  );

  const { onSortingChange, sorts } = useSorting({
    tableId: 'access-policies-list',
    defaultSorts: ['name', 'ASC'],
  });

  const sortBy = React.useMemo(() => handleSortBy(sorts), [sorts]);

  const {
    page,
    PaginationComponent,
    limit,
    accessPolicies,
    getAccessPoliciesByPage,
    isAccessPoliciesLoading,
    resetState,
  } = useGetAccessPolicies();
  const hasCreatePermission = useHasPermissions('api:access-policies:create');
  // List is a separate permission, read is required for this screen
  const hasReadPermission = useHasPermissions('api:access-policies:read');
  const handleSort = (args: any[]) => {
    onSortingChange(args);
    resetState();
  };
  React.useEffect(() => {
    getAccessPoliciesByPage({
      page,
      limit,
      sortBy,
    });
  }, [page, limit, getAccessPoliciesByPage, sortBy]);

  const rowBehavior = React.useMemo(() => {
    if (hasReadPermission) {
      return {
        rowHoverBehavior: {
          cursor: 'pointer',
          injectedStyles: HoveredExpanderCell,
        }, //@ts-expect-error not inferred from builder
        onRow: (row, index) => ({
          onClick: handleRowClick.bind(null, row, index),
        }),
      };
    }
    return {};
  }, [handleRowClick, hasReadPermission]);

  return (
    <>
      <PageHeader title="Access policies">
        <RightButtonContainer>
          {hasCreatePermission && (
            <Button to="/admin/access-policies/create">
              <PlusDark /> New policy
            </Button>
          )}
        </RightButtonContainer>
      </PageHeader>
      <Box h="100%" w="100%" padding="32px">
        <TableGW<AccessPolicy>
          isLoading={isAccessPoliciesLoading}
          columns={accessPoliciesColumns}
          data={accessPolicies}
          onSort={handleSort}
          {...sortBy}
          {...rowBehavior}
        />
        {PaginationComponent}
      </Box>
    </>
  );
}
