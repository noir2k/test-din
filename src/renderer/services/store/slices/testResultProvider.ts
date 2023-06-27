import { createSlice, isAction } from '@reduxjs/toolkit';

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
    setReplaceUserInfo: (state, action) => {
      const data = state.data.map((item: ColumnType) => {
        return {
          ...item,
          user_name: action.payload.user_name,
          gender: action.payload.gender,
          birthday: action.payload.birthday,
          patient_no: action.payload.patient_no,
        }
      });
      state.data = data;
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
  setReplaceUserInfo,
  resetTestResult,
} = testResultSlice.actions;

export default testResultSlice.reducer;
