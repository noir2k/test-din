import { createSlice } from '@reduxjs/toolkit';

import dayjs from 'dayjs';

import { TestForm } from '@interfaces';

import type { ScoreItemType } from './scoreProvider';

const initialState = {} as TestForm;

const calculateResult = (results: ScoreItemType[]): number => {
  let total = 0;
  const skip = 6;
  let baseResults = results;
  if (results.length > 12) {
    baseResults = results.slice(0, -skip).slice(skip);
  }

  baseResults.forEach((r) => {
    total += r.volume_level;
  });

  const res = parseFloat((total / baseResults.length).toFixed(2));
  return res;
};

const testFormSlice = createSlice({
  name: 'testForm',
  initialState,
  reducers: {
    setTestForm: (state, action) => {
      Object.assign(state, action.payload);
    },
    setTestResult: (state, action) => {
      const testDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
      const res = calculateResult(action.payload);

      state.test_datetime = testDate;
      state.test_result = res;
    },
    resetForm: () => initialState,
  },
});

export const { setTestForm, setTestResult, resetForm } = testFormSlice.actions;

export default testFormSlice.reducer;
