import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreatePolicy } from '@secberus/services/dist/store/injections/secberusApi.generated';
import { RootState } from '../../store';

export interface PolicyEditorState {
  draftPolicy: Partial<CreatePolicy> | null;
}

const initialState: PolicyEditorState = {
  draftPolicy: null,
};

const policyEditorSlice = createSlice({
  name: 'policyEditorContext',
  initialState,
  reducers: {
    setDraftPolicy: (
      state,
      action: PayloadAction<Partial<CreatePolicy> | null>
    ) => {
      state.draftPolicy = action.payload;
    },
    setDraftPolicyNull: state => {
      state.draftPolicy = null;
    },
  },
});

export const { setDraftPolicy, setDraftPolicyNull } = policyEditorSlice.actions;

export const selectDraftPolicy = (state: RootState) =>
  state.policyEditorContext.draftPolicy;

export const policyEditorReducer = policyEditorSlice.reducer;

export default policyEditorSlice.reducer;
