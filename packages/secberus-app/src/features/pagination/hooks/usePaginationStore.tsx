import React from 'react';
import { tryParseJson } from '@secberus/utils';
import produce from 'immer';
import {
  UsePaginationStoreProps,
  LocalStorageStateLimitPage,
  LocalStorageState,
  LocalStorageByOrg,
} from '../types/usePagination.types';

const TOTAL_STATES_LIMIT = 10;

// Get current full state, including all org ids
export const getPaginationState = (): LocalStorageState | undefined =>
  tryParseJson(localStorage.getItem('pagination') || '');

// Get current context org table
export const getOrgTables = (
  contextId: string
): LocalStorageByOrg | undefined => {
  const state = getPaginationState();
  if (!state) return;
  return state.find((context: LocalStorageByOrg) => !!context[contextId]);
};

// Get current context org tables array index
export const getOrgIndex = (contextId: string): number | undefined => {
  const state = getPaginationState();
  if (!state) return;
  return state.findIndex((context: LocalStorageByOrg) => !!context[contextId]);
};

// Initialize blank pagination states and fix corrupted / out of date states
export const initializeState = () => {
  if (!localStorage.getItem('pagination')) {
    localStorage.setItem('pagination', JSON.stringify([])); // stringify an empty pagination state if doesnt exist
  } else {
    const state = getPaginationState();
    if (!Array.isArray(state)) {
      localStorage.setItem('pagination', JSON.stringify([]));
    }
  }
};

export const usePaginationStore = ({
  tableId,
  defaultLimit,
  defaultPage,
  contextId,
}: UsePaginationStoreProps) => {
  // Current parsed localstorage state { page, limit}
  const [currentLocalState, setCurrentLocalState] =
    React.useState<LocalStorageStateLimitPage>({});

  // if pagination store doesnt exist then create it
  React.useEffect(() => {
    initializeState();
  }, []);

  // Set org state if it does not exist
  React.useEffect(() => {
    if (contextId) {
      const paginationState = getPaginationState(); // cant be a hook sadly
      const orgState = getOrgTables(contextId);
      if (typeof orgState === 'undefined') {
        const newState = produce(
          paginationState,
          (draft: LocalStorageState) => {
            draft.push({
              [contextId]: {},
            });
            return draft;
          }
        );
        if (Array.isArray(newState)) {
          localStorage.setItem(
            'pagination',
            JSON.stringify(
              newState.length > TOTAL_STATES_LIMIT
                ? newState?.slice(1)
                : newState
            )
          );
        }
      }
    }
  }, [contextId]);

  // if the table ID doesnt exist, then create it
  React.useEffect(() => {
    if (contextId) {
      const paginationState = getPaginationState();
      const orgState = getOrgTables(contextId);
      const currentIndex = getOrgIndex(contextId);
      if (!orgState?.[contextId]?.[tableId]) {
        // If the table id doesnt exist, make an immutable draft state
        // of existing localstorage state and add BUSINESS DEFAULT values
        if (typeof currentIndex !== 'undefined') {
          const newState = produce(
            paginationState,
            (draft: LocalStorageState) => {
              const existingState = draft[currentIndex][contextId];
              // drill into draft with existingState based on index
              // and create tableId
              draft[currentIndex][contextId] = {
                [tableId.toString()]: {
                  limit: defaultLimit.toString(),
                  page: defaultPage.toString(),
                }, // Will only be one deep, so spread is fine
                ...existingState,
              };
              return draft;
            }
          ) as LocalStorageState;
          localStorage.setItem('pagination', JSON.stringify(newState));
          setCurrentLocalState(
            newState[currentIndex][contextId][tableId.toString()]
          );
        }
        // If there is a table, push it to the end of the list since it is recent
      } else if (typeof currentIndex !== 'undefined' && paginationState) {
        const shiftState = produce(
          paginationState,
          (draft: LocalStorageState) => {
            draft.push(draft.splice(currentIndex, 1)[0]);
            return draft;
          }
        );
        // Set localStorage and localState with new shiftstate
        localStorage.setItem('pagination', JSON.stringify(shiftState));
        setCurrentLocalState(
          shiftState[shiftState.length - 1][contextId][tableId.toString()]
        );
      }
    }
  }, [tableId, defaultLimit, defaultPage, contextId]);

  // if the limit and the page update, then update the existing state
  const onPaginationChange = React.useCallback(
    ({ page, limit }: LocalStorageStateLimitPage) => {
      if (contextId) {
        const currentState = getPaginationState();
        const orgState = getOrgTables(contextId);
        const currentIndex = getOrgIndex(contextId);
        // if state doesnt exist, do nothing
        if (
          !page ||
          !limit ||
          typeof orgState === 'undefined' ||
          typeof currentIndex === 'undefined'
        ) {
          return undefined;
        }

        // Get verbose existing state
        const newState = produce(currentState, (draft: LocalStorageState) => {
          draft[currentIndex][contextId][tableId.toString()] = { limit, page };
          return draft;
        }) as LocalStorageState;
        localStorage.setItem('pagination', JSON.stringify(newState));
        setCurrentLocalState(
          newState[currentIndex][contextId][tableId.toString()]
        );
      }
    },
    [tableId, contextId]
  );

  return {
    ...currentLocalState,
    onPaginationChange,
  };
};
