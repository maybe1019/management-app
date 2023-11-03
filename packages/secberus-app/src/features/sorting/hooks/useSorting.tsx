import React from 'react';
import { AnyFn } from '@secberus/utils';
import { UseSortingProps } from '../types/useSorting.types';
import { Sorts } from '../types';
import { useSortingStore } from './useSortingStore';

type Generic = Record<string, any>;

type UseSorting<T> = (arg: UseSortingProps<T>) => {
  resetState: AnyFn;
  onSortingChange: AnyFn;
  sorts: Sorts<T>;
};

export const handleSortBy = (sorts: Sorts<Generic>) =>
  [...(sorts ?? [])].filter(Boolean).length ? sorts.join(':') : undefined;

export function useSorting<T = Generic>({
  tableId,
  defaultSorts,
}: UseSortingProps<T>): ReturnType<UseSorting<T>> {
  const { onSortingChange, currentLocalState: sorts } = useSortingStore<T>({
    tableId,
    defaultSorts,
  });

  const resetState = React.useCallback(() => {
    onSortingChange([], true);
  }, [onSortingChange]);

  return { resetState, onSortingChange, sorts };
}
