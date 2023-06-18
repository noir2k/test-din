import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPage: 0,
  lastPage: 4,
};

const testProgressSlice = createSlice({
  name: 'testProgress',
  initialState,
  reducers: {
    nextPage: (state) => {
      if (state.currentPage < state.lastPage) {
        state.currentPage++;
      }
    },
    prevPage: (state) => {
      if (state.currentPage > 0) {
        state.currentPage--;
      }
    },
    reset: () => initialState
  }
});

export const {
  nextPage,
  prevPage,
  reset
} = testProgressSlice.actions;

export default testProgressSlice.reducer;
