import { configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as reduxUseDispatch,
  useSelector as reduxUseSelector,
} from 'react-redux';
import rootReducer from './rootReducer';

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({ reducer: rootReducer });

// Infer the `AppDispatch` types from the store itself
// export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
export type AppDispatch = typeof store.dispatch;
export const useDispatch = () => reduxUseDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = reduxUseSelector;

export default store;
