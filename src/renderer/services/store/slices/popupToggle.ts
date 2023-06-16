import { createSlice } from '@reduxjs/toolkit';

interface PopupToggleState {
  isNoticeOpen: boolean;
  isHistoryOpen: boolean;
  isSettingOpen: boolean;
  isTestStartOpen: boolean;
  isInfoPopupOpen: boolean;
}

const initialState: PopupToggleState = {
  isNoticeOpen: true,
  isHistoryOpen: false,
  isSettingOpen: false,
  isTestStartOpen: false,
  isInfoPopupOpen: false,
};

const popupToggleSlice = createSlice({
  name: 'popupToggle',
  initialState,
  reducers: {
    setNoticeOpen: (state) => {
      state.isNoticeOpen = true; //!state.isNoticeOpen;
      state.isHistoryOpen = false;
      state.isSettingOpen = false;
      state.isTestStartOpen = false;
      state.isInfoPopupOpen = false;
    },
    setHistoryOpen: (state) => {
      state.isNoticeOpen = false;
      state.isHistoryOpen = true; //!state.isHistoryOpen;
      state.isSettingOpen = false;
      state.isTestStartOpen = false;
      state.isInfoPopupOpen = false;
    },
    setSettingOpen: (state) => {
      state.isNoticeOpen = false;
      state.isHistoryOpen = false;
      state.isSettingOpen = true; //!state.isSettingOpen;
      state.isTestStartOpen = false;
      state.isInfoPopupOpen = false;
    },
    setTestStartOpen: (state) => {
      state.isNoticeOpen = false;
      state.isHistoryOpen = false;
      state.isSettingOpen = false;
      state.isTestStartOpen = true; //!state.isTestStartOpen;
      state.isInfoPopupOpen = false;
    },
    setInfoPopupOpen: (state) => {
      state.isNoticeOpen = false;
      state.isHistoryOpen = false;
      state.isSettingOpen = false;
      state.isTestStartOpen = false;
      state.isInfoPopupOpen = true; //!state.isInfoPopupOpen;
    },
  },
});

export const {
  setNoticeOpen,
  setHistoryOpen,
  setSettingOpen,
  setTestStartOpen,
  setInfoPopupOpen,
} = popupToggleSlice.actions;

export default popupToggleSlice.reducer;
