import { createSlice } from '@reduxjs/toolkit';

import dayjs from 'dayjs';

import { TestForm } from '@interfaces';

import { findEst } from '@lib/common';

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

  console.log('calculateResult', baseResults);
  const res = parseFloat((total / baseResults.length).toFixed(2));
  console.log('calculateResult2', total, baseResults.length, res);
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
      const est = findEst(res);

      state.test_datetime = testDate;
      state.test_result = res;
      state.test_estimate = est;
    },
    resetForm: () => initialState,
  },
});

export const { setTestForm, setTestResult, resetForm } = testFormSlice.actions;

export default testFormSlice.reducer;
