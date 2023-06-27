import { createSlice } from '@reduxjs/toolkit';

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
      state.data.unshift(action.payload);
    },
    setRemoveResult: (state, action) => {
      state.data.splice(action.payload, 1);
    },
    setReplaceResult: (state, action) => {
      const index = action.payload.index;
      const data = action.payload.data;
      const _data = {
        id: state.data[index].id,
        ...data,
        reg_timestamp: state.data[index].reg_timestamp
      }
      state.data.splice(index, 1, _data);
    },
    resetTestResult: () => initialState
  }
});

export const {
  setTestResult,
  setMergeResult,
  setInsertResult,
  setRemoveResult,
  setReplaceResult,
  resetTestResult,
} = testResultSlice.actions;

export default testResultSlice.reducer;
