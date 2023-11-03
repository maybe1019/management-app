import React from 'react';
import { Button, TableGW } from '@secberus/components';
import { useIsLoading } from '@secberus/utils';
import {
  Datasource,
  dataSourceApi,
  policiesApi,
  policiesApi2,
} from '@secberus/services';
import { useSorting } from '../../../../../../features/sorting';
import { notifySuccess } from '../../../../../../store';
import { useTableSelect } from '../../../../../../components/TableSelect/useTableSelect.component';
import {
  StyledModal,
  ModalFooter,
  ButtonGroup,
} from './ManageCoverageForm.styled';
import { ManageCoverageFormProps } from './ManageCoverageForm.types';
import { useGetDataSourcePage } from './hooks/useGetDatasourcePage';
import { useManageCoverageFormColumns } from './ManageCoverageForm.columns';

export const ManageCoverageFormComponent: React.FC<ManageCoverageFormProps> = ({
  isOpen,
  onRequestClose,
  policyId,
  policyDataSources,
}) => {
  const [initialSelected, setInitialSelected] = React.useState<string[]>([]);

  const [updatePolicyDataSources, updatePolicyDataSourcesQuery] =
    policiesApi.useUpdatePolicyDatasourcesMutation();

  console.log({ policyId });
  const {
    data: policy,
    isLoading: isGetPoliciesLoading,
    isUninitialized: isGetPoliciesUninit,
  } = policiesApi2.useGetPolicyQuery(
    {
      id: policyId,
    },
    { skip: !policyId }
  );

  const { data: allDataSources } = dataSourceApi.useListDatasourcesQuery({
    limit: '500',
    datasourceType: policy?.datasource_types?.[0],
  });

  const {
    isLoading: isDataSourcesLoading,
    isFetching: isDataSourcesFetching,
    getDataSourcesByPage,
    resetPagination,
    PaginationComponent,
    page,
    limit,
    data: dataSources,
  } = useGetDataSourcePage();

  const {
    onSortingChange,
    sorts: [sortCol, sortDir],
  } = useSorting<Datasource>({
    tableId: 'policy-coverage-data-sources-select-list',
  });

  const isTableLoading = useIsLoading([
    isGetPoliciesLoading,
    isGetPoliciesUninit,
    isDataSourcesLoading,
    isDataSourcesFetching,
  ]);

  const {
    selected,
    isAllOnPageSelected,
    selectAllOnPage,
    deselectAllOnPage,
    TableSelectActionBar,
    handleSelectRow,
    resetSelected,
  } = useTableSelect({
    records: dataSources,
    recordType: 'data sources',
    initialSelected,
    handleSelectAll: () =>
      allDataSources?.results?.map(o => o.id as string) ?? [],
    showSelectedCount: false,
  });

  React.useEffect(() => {
    getDataSourcesByPage({
      page,
      limit,
      datasourceType: policy?.datasource_types?.[0],
      sortBy: sortCol && sortDir ? `${sortCol}:${sortDir}` : '',
    });
  }, [
    getDataSourcesByPage,
    limit,
    page,
    policy?.datasource_types,
    sortCol,
    sortDir,
  ]);

  const handleSort = (arg: any) => {
    onSortingChange(arg);
    resetPagination();
  };

  const handleClose = (reset = true) => {
    if (reset) resetSelected();
    if (typeof onRequestClose === 'function') onRequestClose();
  };

  const handleSubmit = async () => {
    updatePolicyDataSources({
      policyId,
      policyDatasourceIds: { datasource_ids: selected },
    });

    handleClose(false);
  };

  const columns = useManageCoverageFormColumns({
    selected,
    isAllOnPageSelected,
    handleSelectAllOnPage: isAllOnPageSelected
      ? deselectAllOnPage
      : selectAllOnPage,
    handleSelectRow,
  });

  React.useEffect(() => {
    setInitialSelected(policyDataSources?.map(d => d?.id as string));
  }, [policyDataSources]);

  React.useEffect(() => {
    if (updatePolicyDataSourcesQuery.isSuccess) {
      notifySuccess('Successfully updated covered Data sources');
    }
  }, [updatePolicyDataSourcesQuery.isSuccess]);

  return (
    <StyledModal
      variant="light"
      title="Select the data sources to cover"
      isVisible={isOpen}
      handleClose={handleClose}
    >
      <TableSelectActionBar />
      <TableGW
        className="with-select-cell-first"
        rowKey="id"
        isLoading={isTableLoading}
        columns={columns}
        data={dataSources?.results ?? []}
        onSort={handleSort}
        sortColumn={sortCol}
        sortDirection={sortDir}
        selectedRows={selected}
        rowHoverBehavior={{
          background: 'transparent',
        }}
      />
      {PaginationComponent}
      <ModalFooter>
        <ButtonGroup>
          <Button onClick={() => handleSubmit()}>
            Continue with ({selected.length}) selected
          </Button>
          <Button variant="secondary" onClick={() => handleClose()}>
            Cancel
          </Button>
        </ButtonGroup>
      </ModalFooter>
    </StyledModal>
  );
};
