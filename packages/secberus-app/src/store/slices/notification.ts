import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { SnackTypes } from '@secberus/components';
import { store } from '../storeWebConfig';

export const notify = ({
  type,
  message,
}: {
  type: SnackTypes;
  message: string;
}) =>
  store.dispatch(
    addNotification({
      type,
      value: message,
    })
  );

export const notifyError = (message?: string) => {
  notify({
    type: 'fail',
    message:
      message ?? `Something went wrong. Please try again or contact support.`,
  });
};

export const notifySuccess = (message?: string) => {
  notify({
    type: 'success',
    message: message ?? `Action successfully executed`,
  });
};

export const useNotify = () => ({ notify, notifyError, notifySuccess });

export interface Notification {
  duration?: number;
  message?: string;
  value?: string;
  type: SnackTypes;
  dismiss?: boolean;
  id?: string;
}

const adapter = createEntityAdapter<Notification>({
  selectId: ({ message, value }) => {
    const msg = message || value;
    return msg!;
  },
});

const slice = createSlice({
  name: 'notification',
  initialState: adapter.getInitialState(),
  reducers: {
    addNotifications: adapter.addMany,
    addNotification: (state, action: PayloadAction<Notification>) =>
      adapter.addOne(state, action.payload),
    removeNotification: adapter.removeOne,
    removeNotifications: adapter.removeMany,
  },
});

export const {
  addNotifications,
  addNotification,
  removeNotification,
  removeNotifications,
} = slice.actions;

export const notificationReducer = slice.reducer;
export default slice.reducer;
