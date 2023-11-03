/* eslint-disable flowtype/no-types-missing-file-annotation */
import React, { createContext, useReducer } from 'react';
import { ColumnSortFunction } from '..';

type DispatchFunction = (x: Action) => void;

interface ProviderProps {
  children: any;
  initialState: any;
}

interface State {
  sortColumn: string | null;
  sortDirection: string | null;
  onSort?: ColumnSortFunction;
}

interface Action {
  type: string;
  [key: string]: any;
}

interface ReactContext {
  state: State;
  dispatch: DispatchFunction;
}

const baseState = {
  sortColumn: null,
  sortDirection: null,
};

const fields = ['sortColumn', 'sortDirection', 'onSort', 'columns'];

const getChangedFields = (prevState: any, currState: any) => {
  const changedFields = new Set<string>();
  fields.forEach(field => {
    if (prevState[field] !== currState[field]) {
      changedFields.add(field);
    }
  });

  return changedFields;
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const TableContext = createContext<ReactContext>({
  state: baseState,
  dispatch: () => {},
});

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'updateSortedColumn':
      return { ...state, sortColumn: action.col, sortDirection: action.dir };
    case 'refresh':
      return {
        ...state,
        ...action.initialState,
      };
    default:
      return state;
  }
};

const TableContextProvider = ({ children, initialState }: ProviderProps) => {
  const _stateOnMount = React.useRef(initialState);
  const [state, dispatch] = useReducer(reducer, {
    ...baseState,
    ...initialState,
  });

  // if certain props change, update throughout package.
  // allows the user to control props such as sortColumn,
  // columns, etc.
  React.useEffect(() => {
    const changedFields = getChangedFields(_stateOnMount.current, initialState);
    if (changedFields.size) {
      const refreshed: any = {};
      changedFields.forEach(field => {
        refreshed[field] = initialState[field];
      });

      _stateOnMount.current = initialState;
      dispatch({ type: 'refresh', initialState: refreshed });
    }
  }, [_stateOnMount, initialState]);

  return (
    <TableContext.Provider value={{ state, dispatch }}>
      {children}
    </TableContext.Provider>
  );
};

export { TableContext, TableContextProvider };
