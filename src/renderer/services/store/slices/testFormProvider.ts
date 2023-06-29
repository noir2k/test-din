import { createSlice } from '@reduxjs/toolkit';
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
      const testDate = new Date().toISOString().split('T')[0];
      const res = calculateResult(action.payload);

      state.test_date = testDate;
      state.test_result = res;
    },
    resetDefaultForm: (state) => {
      state.user_name = undefined;
      state.birthday = undefined;
      state.patient_no = undefined;
    },
    resetForm: () => initialState,
  },
});

export const { setTestForm, setTestResult, resetDefaultForm, resetForm } =
  testFormSlice.actions;

export default testFormSlice.reducer;
