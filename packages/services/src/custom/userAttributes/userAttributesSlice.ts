import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Nullish } from '@secberus/utils';
import { SliceWithReducerPath } from '../../definitions';

type UserAttributesState = Nullish<{
  name: string;
  'custom:userid': string;
  'custom:sid': string;
  email: string;
}>;

type UserAttributesRootState = {
  userAttributes: UserAttributesState;
};

const initialState: UserAttributesState = {
  name: null,
  'custom:userid': null,
  'custom:sid': null,
  email: null,
};

const slice = createSlice({
  name: 'userAttributes',
  initialState,
  reducers: {
    init: (_state, action: PayloadAction<UserAttributesState>) =>
      action.payload,
  },
});

(slice as SliceWithReducerPath<typeof slice, 'userAttributes'>).reducerPath =
  'userAttributes';

export const userAttributesSlice = slice as SliceWithReducerPath<
  typeof slice,
  'userAttributes'
>;

export const selectEmail = (state: UserAttributesRootState) =>
  state.userAttributes?.email;

export const selectAccountId = (state: UserAttributesRootState) =>
  state.userAttributes['custom:sid'];

export const selectUserId = (state: UserAttributesRootState) =>
  state.userAttributes?.['custom:userid'];
