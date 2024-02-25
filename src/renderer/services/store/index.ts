import { configureStore, combineReducers } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import navigateProvider from './slices/navigateProvider';
import scoreProvider from './slices/scoreProvider';
import userDataProvider from './slices/userDataProvider';
import testFormProvider from './slices/testFormProvider';
import testProgressProvider from './slices/testProgressProvider';
import testResultProvider from './slices/testResultProvider';

const rootReducer = combineReducers({
  navigate: navigateProvider,
  scoreData: scoreProvider,
  userData: userDataProvider,
  testForm: testFormProvider,
  testProgress: testProgressProvider,
  testResult: testResultProvider,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
