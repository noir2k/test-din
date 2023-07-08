import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPage: 0,
  lastPage: 4,
  volume: 50,
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
    setVolume: (state, action) => {
      state.volume = action.payload;
    },
    resetProgress: () => initialState,
  },
});

export const { nextPage, prevPage, setVolume, resetProgress } =
  testProgressSlice.actions;

export default testProgressSlice.reducer;
