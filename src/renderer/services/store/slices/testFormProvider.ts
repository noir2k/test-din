import { createSlice } from '@reduxjs/toolkit';
import { TestForm } from '@interfaces';

const initialState: TestForm = {};

const testFormSlice = createSlice({
  name: 'testForm',
  initialState,
  reducers: {
    setTestForm: (state, action) => {
      state = action.payload;
    },
    setTestResult: (state, action) => {
      // state.test_date = action.payload.test_date;
      // state.test_result = action.payload.test_result;
      return state;
    },
    resetDefaultForm: (state) => {
      state.user_name = undefined;
      state.birthday = undefined;
      state.patient_no = undefined;
    },
    reset: () => initialState
  }
});

export const {
  setTestForm,
  resetDefaultForm,
  reset
} = testFormSlice.actions;

export default testFormSlice.reducer;
