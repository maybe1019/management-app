import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { PolicyCategory } from '@secberus/services';
import {
  Button,
  ColumnSortFunction,
  PageHeader,
  TableGW,
} from '@secberus/components';
import { PlusDark } from '@secberus/icons';
import { useIsLoading } from '@secberus/utils';
import { useSorting } from '../../sorting';
import { ErrorBoundary } from '../../../utils/wrappers/ErrorBoundaries';
import { HoveredExpanderCell } from '../../../components';
import { usePermissions } from '../../../app/rbac/definitions';
import { categoryColumms } from './Category.columns';
import { CategoryForm } from './Form';
import { PolicyCategoryWithCustomPolicyCount } from './Form/Form.types';
import { useGetCategoryPage } from './Category.hook';

const Categories: React.FC = () => {
  const { canCreate, canUpdate } = usePermissions('categories');
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [editData, setEditData] =
    React.useState<PolicyCategoryWithCustomPolicyCount>();

  const {
    isCategoriesUninitialized,
    isCategoriesLoading,
    isCategoriesFetching,
    getCategoriesByPage,
    categories,
    PaginationComponent,
    resetState: resetPagination,
    limit,
    page,
  } = useGetCategoryPage();

  const onRequestClose = () => {
    setIsOpen(false);
    setEditData(undefined);
  };

  const {
    onSortingChange,
    sorts: [sortCol, sortDir],
  } = useSorting<PolicyCategory>({
    tableId: 'categories-list',
  });

  const isTableLoading = useIsLoading([
    isCategoriesUninitialized,
    isCategoriesLoading,
    isCategoriesFetching,
  ]);

  React.useEffect(() => {
    getCategoriesByPage({
      page,
      limit,
      sortBy: sortCol && sortDir ? `${sortCol}:${sortDir}` : '',
    });
  }, [page, limit, getCategoriesByPage, sortCol, sortDir]);

  //@ts-expect-error poorly typed
  const handleRowClick = record => {
    setIsOpen(true);
    setEditData(record as any);
  };

  const handleSort: ColumnSortFunction<PolicyCategory> = arg => {
    onSortingChange(arg);
    resetPagination();
  };

  return (
    <>
      <Box w="100%">
        <Flex w="100%" padding="0px">
          <PageHeader title="Categories">
            {canCreate && (
              <Button onClick={() => setIsOpen(true)}>
                <PlusDark /> New Category
              </Button>
            )}
          </PageHeader>
        </Flex>
        <Box h="100%" w="100%" padding="32px">
          <TableGW<PolicyCategory>
            isLoading={isTableLoading}
            columns={categoryColumms}
            data={categories}
            onSort={handleSort}
            sortColumn={sortCol}
            sortDirection={sortDir}
            rowClassName={record =>
              !record.secberus_managed && canUpdate
                ? ''
                : 'rc-table-cell-no-hover'
            }
            onRow={record =>
              !record.secberus_managed && canUpdate
                ? {
                    onClick: handleRowClick.bind(null, record),
                  }
                : {}
            }
            rowHoverBehavior={{
              cursor: 'pointer',
              injectedStyles: HoveredExpanderCell,
            }}
          />
          {PaginationComponent}
        </Box>
      </Box>
      {isOpen && (
        <CategoryForm
          onRequestClose={onRequestClose}
          isOpen={isOpen}
          editData={editData}
        />
      )}
    </>
  );
};

const WithBoundary = () => (
  <ErrorBoundary>
    <Categories />
  </ErrorBoundary>
);

export { WithBoundary as Categories };

export default WithBoundary;
