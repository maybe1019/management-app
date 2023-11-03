import React from 'react';
import { useDeepEffect } from '@secberus/utils';
import { ButtonProps } from '@secberus/components';
import { TableSelectAllActionBar } from './TableSelectAllActionBar';

export interface TableSelectAction extends ButtonProps {
  text: string;
  show?: boolean;
}

export interface UseTableSelectProps {
  handleSelectAll: () => string[];
  records?: any;
  recordType?: string;
  initialSelected?: string[];
  showActionBarOnSinglePage?: boolean;
  showSelectedCount?: boolean;
  allowOnInitialSelectedChange?: boolean;
  actions?: TableSelectAction[];
}

export interface UseTableSelectReturnType {
  selected: string[];
  isAllOnPageSelected: boolean;
  isAllSelected: boolean;
  TableSelectActionBar: React.FC;
  selectAllOnPage: () => void;
  selectAll: () => void;
  deselectAllOnPage: () => void;
  deselectAll: () => void;
  handleSelectRow: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetSelected: () => void;
}

export const useTableSelect = ({
  records,
  recordType,
  handleSelectAll,
  initialSelected = [],
  showActionBarOnSinglePage,
  showSelectedCount = true,
  allowOnInitialSelectedChange = true,
  actions,
}: UseTableSelectProps): UseTableSelectReturnType => {
  const [selected, setSelected] = React.useState<string[]>(initialSelected);
  const totalRecords = (records && records?.cursor.total) ?? records.length;
  const perPage = (records && records?.cursor.limit) ?? records.length;
  const pages = (records && records?.cursor.pages) ?? 1;

  const pageIdList = React.useMemo(
    () =>
      ((records && records?.results) ?? records).map(
        (d: { id: string }) => d.id as string
      ) ?? [],
    [records]
  );

  const isAllOnPageSelected: boolean = React.useMemo(() => {
    const results = (records && records?.results) ?? records;
    return results
      .map((o: { id: any }) => o.id)
      ?.every((id: string) => selected.includes(id));
  }, [records, selected]);

  const isAllSelected = selected.length === totalRecords;

  const handleSelectRow = React.useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      setSelected(prevState => {
        if (target.checked && !prevState.includes(target.id)) {
          return [...prevState, target.id];
        }
        return prevState.filter(id => id !== target.id);
      });
    },
    []
  );

  const selectAllOnPage = React.useCallback(() => {
    setSelected(prevState => [...new Set([...prevState, ...pageIdList])]);
  }, [pageIdList]);

  const deselectAllOnPage = React.useCallback(() => {
    setSelected(prevState => prevState.filter(id => !pageIdList.includes(id)));
  }, [pageIdList]);

  const selectAll = React.useCallback(() => {
    setSelected(handleSelectAll());
  }, [handleSelectAll]);

  const deselectAll = React.useCallback(() => {
    setSelected([]);
  }, []);

  const resetSelected = React.useCallback(() => {
    setSelected(initialSelected);
  }, [initialSelected]);

  const TableSelectActionBar = React.useCallback(
    () => (
      <TableSelectAllActionBar
        show={
          (actions && actions?.length > 0 && selected.length > 0) ||
          (showActionBarOnSinglePage &&
            selected.length > 0 &&
            showSelectedCount) ||
          (isAllOnPageSelected && (pages > 1 || showActionBarOnSinglePage))
        }
        selected={selected.length}
        showSelectedCount={showSelectedCount}
        recordType={recordType}
        recordsPerPage={perPage}
        totalRecords={totalRecords}
        isAllSelected={isAllSelected}
        isAllOnPageSelected={isAllOnPageSelected}
        onSelectAll={selectAll}
        onDeselectAll={deselectAll}
        actions={actions}
      />
    ),
    [
      actions,
      deselectAll,
      isAllOnPageSelected,
      isAllSelected,
      pages,
      perPage,
      recordType,
      selectAll,
      selected.length,
      showActionBarOnSinglePage,
      showSelectedCount,
      totalRecords,
    ]
  );

  useDeepEffect(() => {
    if (allowOnInitialSelectedChange) {
      setSelected(initialSelected);
    }
  }, [allowOnInitialSelectedChange, initialSelected]);

  return {
    selected,
    isAllOnPageSelected,
    isAllSelected,
    TableSelectActionBar,
    selectAllOnPage,
    selectAll,
    deselectAllOnPage,
    deselectAll,
    handleSelectRow,
    resetSelected,
  };
};
