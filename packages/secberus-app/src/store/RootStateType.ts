import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { rootReducer } from './store';
import { store } from './storeWebConfig';

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
