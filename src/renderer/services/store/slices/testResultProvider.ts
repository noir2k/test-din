import { createSlice } from '@reduxjs/toolkit';

import type { ScoreItemType } from './scoreProvider';

import { ColumnType } from '@interfaces';

type TestResultType = {
  data: ColumnType[],
}

const initialState: TestResultType = {
  data: [],
};

const testResultSlice = createSlice({
  name: 'testResult',
  initialState,
  reducers: {
    setTestResult: (state, action) => {
      state.data = action.payload;
    },
    setMergeResult: (state, action) => {
      state.data = state.data.concat(action.payload);
    },
    setInsertResult: (state, action) => {
      console.log("setInsertResult", action.payload);
      state.data.unshift(action.payload);
    },
    resetTestResult: () => initialState
  }
});

export const {
  setTestResult,
  setMergeResult,
  setInsertResult,
  resetTestResult,
} = testResultSlice.actions;

export default testResultSlice.reducer;
