import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/RootStateType';

export interface AttributesState {
  explorerQuery?: string;
  [key: string]: any;
}

const initialState: AttributesState = {
  explorerQuery: '',
};

const attributesSlice = createSlice({
  name: 'attributesStore',
  initialState,
  reducers: {
    querySet: (
      state,
      action: PayloadAction<Required<Pick<AttributesState, 'explorerQuery'>>>
    ) => {
      state.explorerQuery = action.payload.explorerQuery;
    },
  },
});

export const { actions: attributesActions, reducer: attributesContext } =
  attributesSlice;

export const selectExplorerQuery = (state: RootState) =>
  state.attributesContext.explorerQuery;
