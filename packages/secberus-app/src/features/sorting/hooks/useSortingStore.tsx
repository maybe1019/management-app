import React from 'react';
import { tryParseJson } from '@secberus/utils';
import { UseSortingProps, Sorts, Generic } from '../types/useSorting.types';

export const getParsedSortingState = () =>
  tryParseJson(localStorage.getItem('sorting') || '');

export function useSortingStore<T = Generic>({
  tableId,
  defaultSorts = [],
}: UseSortingProps<T>) {
  const [key, direction] = defaultSorts;
  // Current parsed localstorage state {tableId: [...sorts]}
  const [currentLocalState, setCurrentLocalState] = React.useState<Sorts<T>>(
    []
  );

  // if sorting store doesnt exist then create it
  React.useEffect(() => {
    if (!localStorage.getItem('sorting')) {
      localStorage.setItem('sorting', JSON.stringify({})); // stringify an empty sorting state if doesnt exist
    }
  }, []);

  // if the table ID doesnt exist, then create it
  React.useEffect(() => {
    const currentState = getParsedSortingState();
    if (!currentState || !currentState[tableId]) {
      // If the table id doesnt exist, make an immutable draft state
      // of existing localstorage state and add BUSINESS DEFAULT values
      currentState[tableId.toString()] = [key, direction];
      localStorage.setItem('sorting', JSON.stringify(currentState));
      setCurrentLocalState(currentState[tableId.toString()]);
    } else {
      setCurrentLocalState(currentState[tableId.toString()]);
    }
  }, [tableId, key, direction]);

  // if the sorts update, then update the existing state
  const onSortingChange = React.useCallback(
    (sorts: Sorts<T>, reset?: boolean) => {
      // Get verbose existing state
      if (!sorts && !reset) return;
      const currentState = getParsedSortingState();
      currentState[tableId.toString()] = sorts || ([] as any);
      localStorage.setItem('sorting', JSON.stringify(currentState));
      setCurrentLocalState(currentState[tableId.toString()]);
    },
    [tableId]
  );

  return {
    currentLocalState,
    onSortingChange,
  };
}
