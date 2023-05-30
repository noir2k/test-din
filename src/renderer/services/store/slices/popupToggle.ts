import { createSlice } from '@reduxjs/toolkit';

interface PopupToggleState {
  isNoticeOpen: boolean,
  isHistoryOpen: boolean,
  isSettingOpen: boolean,
  isTestStartOpen: boolean,
}

const initialState: PopupToggleState = {
  isNoticeOpen: false,
  isHistoryOpen: false,
  isSettingOpen: false,
  isTestStartOpen: false,
};

export const popupToggleSlice = createSlice({
  name: 'popupToggle',
  initialState,
  reducers: {
    setNoticeOpen: (state) => {
      state.isNoticeOpen = !state.isNoticeOpen;
      state.isHistoryOpen = false;
      state.isSettingOpen = false;
      state.isTestStartOpen = false;
    },
    setHistoryOpen: (state) => {
      state.isNoticeOpen = false;
      state.isHistoryOpen = !state.isHistoryOpen;
      state.isSettingOpen = false;
      state.isTestStartOpen = false;
    },
    setSettingOpen: (state) => {
      state.isNoticeOpen = false;
      state.isHistoryOpen = false;
      state.isSettingOpen = !state.isSettingOpen;
      state.isTestStartOpen = false;
    },
    setTestStartOpen: (state) => {
      state.isNoticeOpen = false;
      state.isHistoryOpen = false;
      state.isSettingOpen = false;
      state.isTestStartOpen = !state.isTestStartOpen;
    },
  },
});

export const {
  setNoticeOpen,
  setHistoryOpen,
  setSettingOpen,
  setTestStartOpen,
} = popupToggleSlice.actions;

export default popupToggleSlice.reducer;
