import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SliceWithReducerPath } from '../../definitions';
import { IsSso } from '../../store/injections/secberusApiGW.generated';

interface SSOState {
  ssoClientId?: string;
  idpName?: string;
}

type SSORootState = { sso: SSOState };

const initialState: SSOState = {};

const slice = createSlice({
  name: 'sso',
  initialState,
  reducers: {
    collectSSODetails(state, action: PayloadAction<IsSso>) {
      state.ssoClientId = action.payload.client_id;
      state.idpName = action.payload.provider;
    },
  },
});

(slice as SliceWithReducerPath<typeof slice, 'sso'>).reducerPath = 'sso';

export const ssoSlice = slice as SliceWithReducerPath<typeof slice, 'sso'>;

export const selectSSOClientId = (state: SSORootState) => state.sso.ssoClientId;

export const selectIDPName = (state: SSORootState) => state.sso.idpName;

export const { collectSSODetails } = ssoSlice.actions;
