import {
  PaginationContainer,
  PaginationControls,
  PaginationControlsNavigation,
} from '@secberus/components';
import React from 'react';
import { tryParseInt } from '@secberus/utils';
import { UsePaginationProps } from '../types/usePagination.types';
import { usePaginationStore } from './usePaginationStore';

const DEFAULT_PAGE_SETTINGS = [
  { id: '10', name: '10' },
  { id: '20', name: '20' },
  { id: '50', name: '50' },
];

// TODO:
// * tableId is the biggest point of user error. Figure out how to abstract this assignment.
// * navProps, specifically disabled behavior, feels like alot of boilerplate code. We should have some way to
// have it "just work", with additional overrides as an option.

export const usePagination = ({
  navProps,
  limitProps,
  tableId,
  defaultLimit = 10,
  defaultPage = 1,
  hideSelect = false,
  pages,
  contextId,
  onChange,
}: UsePaginationProps) => {
  const {
    limit = defaultLimit.toString(),
    page = defaultPage.toString(),
    onPaginationChange: updatePagination,
  } = usePaginationStore({
    tableId,
    contextId,
    defaultLimit,
    defaultPage,
  });

  const { numericPage, numericTotal } = React.useMemo(
    () => ({
      numericPage: page ? tryParseInt(page) : defaultPage || 1,
      numericLimit: limit ? tryParseInt(limit) : defaultLimit || 10,
      numericTotal: limitProps.total
        ? tryParseInt(limitProps.total.toString())
        : null,
    }),
    [page, limit, limitProps.total, defaultPage, defaultLimit]
  );

  const handleChange = React.useCallback(
    ({ page, limit }: { page: string; limit?: string }) => {
      updatePagination({
        page,
        limit,
      });
      onChange?.({ limit, page });
    },
    [onChange, updatePagination]
  );

  const resetState = React.useCallback(
    (resetDefaultWithLimit?: boolean) => {
      if (resetDefaultWithLimit) {
        handleChange({
          page: (defaultPage || 1).toString(),
          limit: (defaultLimit || 10).toString(),
        });
      } else {
        handleChange({
          page: (defaultPage || 1).toString(),
          limit,
        });
      }
    },
    [handleChange, limit, defaultPage, defaultLimit]
  );

  const prevPage = React.useCallback(() => {
    if (numericPage) {
      handleChange({
        page: (numericPage - 1).toString(),
        limit,
      });
    }
  }, [handleChange, numericPage, limit]);

  const nextPage = React.useCallback(() => {
    if (numericPage) {
      handleChange({
        page: (numericPage + 1).toString(),
        limit,
      });
    }
  }, [handleChange, numericPage, limit]);

  React.useEffect(() => {
    // reset if total number of pages is less than the current page
    if (typeof numericPage === 'number' && typeof pages === 'number') {
      if (pages < numericPage && (numericTotal || 0) > 0) {
        resetState(false);
      }
    }
    // Reset if total is 0
    if (typeof numericTotal === 'number' && typeof numericPage === 'number') {
      if (numericTotal <= 0 && numericPage > 1) {
        resetState();
      }
    }
  }, [numericPage, limitProps, resetState, numericTotal, pages]);

  const PaginationBuilder = React.useMemo(() => {
    const onLimitChange = (val: { id: string; name: string }) => {
      handleChange({
        page: '1',
        limit: val.id,
      });
      return limit;
    };

    return (
      <PaginationContainer>
        <PaginationControls
          options={DEFAULT_PAGE_SETTINGS}
          {...limitProps}
          valueKey={limit || '10'}
          onLimitChange={onLimitChange}
          hideSelect={hideSelect}
        />
        <PaginationControlsNavigation
          {...navProps}
          onRight={nextPage}
          onLeft={prevPage}
        />
      </PaginationContainer>
    );
  }, [
    limitProps,
    limit,
    hideSelect,
    navProps,
    handleChange,
    nextPage,
    prevPage,
  ]);

  return {
    PaginationBuilder,
    page,
    limit,
    resetState,
    nextPage,
    prevPage,
  };
};
