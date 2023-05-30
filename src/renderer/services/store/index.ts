import { configureStore, combineReducers } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import popupToggle from './slices/popupToggle';

const rootReducer = combineReducers({
  popupToggle: popupToggle,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
