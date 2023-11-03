import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserOrg } from '@secberus/services';
import { RootState } from '../../store/RootStateType';

export interface OrgState {
  current?: UserOrg;
}

const initialState: OrgState = {
  current: undefined,
};

const orgContextSlice = createSlice({
  name: 'orgContext',
  initialState,
  reducers: {
    organizationSelected: (state, action: PayloadAction<UserOrg>) => {
      state.current = action.payload;
    },
  },
});

export const { actions: orgContextActions, reducer: orgContext } =
  orgContextSlice;

export const selectCurrentOrg = (state: RootState) => state.orgContext.current;
