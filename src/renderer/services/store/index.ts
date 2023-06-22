import { configureStore, combineReducers } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import popupToggle from './slices/popupToggle';
import scoreProvider from './slices/scoreProvider';
import userDataProvider from './slices/userDataProvider';
import testFormProvider from './slices/testFormProvider';
import testProgressProvider from './slices/testProgressProvider';

const rootReducer = combineReducers({
  popupToggle: popupToggle,
  scoreData: scoreProvider,
  userData: userDataProvider,
  testForm: testFormProvider,
  testProgress: testProgressProvider
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
