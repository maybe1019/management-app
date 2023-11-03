import { createSlice } from '@reduxjs/toolkit';
import { SliceWithReducerPath } from '../../definitions';

interface AuthState {
  isAuthenticated: boolean;
  orgIsInjected: boolean;
  ssoClientId?: string;
  identityPoolId?: string;
  idpName?: string;
}

type AuthRootState = {
  authentication: AuthState;
};

const initialState: AuthState = {
  isAuthenticated: false,
  orgIsInjected: false,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authorize(state) {
      state.isAuthenticated = true;
    },
    setOrgIsInjected(state) {
      state.orgIsInjected = true;
    },
    setOrgIsNotInjected(state) {
      state.orgIsInjected = false;
    },
  },
});

(slice as SliceWithReducerPath<typeof slice, 'authentication'>).reducerPath =
  'authentication';

export const authSlice = slice as SliceWithReducerPath<
  typeof slice,
  'authentication'
>;

export const selectIsAuthenticated = (state: AuthRootState) =>
  state.authentication.isAuthenticated;

export const selectOrgIsInjected = (state: AuthRootState) =>
  state.authentication.orgIsInjected;
