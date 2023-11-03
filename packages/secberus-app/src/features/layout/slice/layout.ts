import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  visible: {
    navigation: false,
    sideNavOrgSelectList: false,
  },
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setVisible: (
      state,
      action: PayloadAction<{
        key: keyof typeof initialState.visible;
        value: boolean;
      }>
    ) => {
      state.visible[action.payload.key] = action.payload.value;
    },
    reset: state => {
      state = initialState;
    },
  },
});

export const { actions: layoutActions, reducer: layout } = layoutSlice;

export const { setVisible } = layoutActions;
