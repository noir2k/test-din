import { createSlice } from '@reduxjs/toolkit';

interface PopupToggleState {
  isNoticeOpen: boolean;
  isHistoryOpen: boolean;
  isSettingOpen: boolean;
  isTestStartOpen: boolean;
  isInfoPopupOpen: boolean;
  isUserRegister: boolean;
  isRegister: boolean;
}

const initialState: PopupToggleState = {
  isNoticeOpen: true,
  isHistoryOpen: false,
  isSettingOpen: false,
  isTestStartOpen: false,
  isInfoPopupOpen: false,
  isUserRegister: false,
  isRegister: true,
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
      state.isUserRegister = false;
    },
    setHistoryOpen: (state) => {
      state.isNoticeOpen = false;
      state.isHistoryOpen = true; //!state.isHistoryOpen;
      state.isSettingOpen = false;
      state.isTestStartOpen = false;
      state.isInfoPopupOpen = false;
      state.isUserRegister = false;
    },
    setSettingOpen: (state) => {
      state.isNoticeOpen = false;
      state.isHistoryOpen = false;
      state.isSettingOpen = true; //!state.isSettingOpen;
      state.isTestStartOpen = false;
      state.isInfoPopupOpen = false;
      state.isUserRegister = false;
    },
    setTestStartOpen: (state) => {
      state.isNoticeOpen = false;
      state.isHistoryOpen = false;
      state.isSettingOpen = false;
      state.isTestStartOpen = true; //!state.isTestStartOpen;
      state.isInfoPopupOpen = false;
      state.isUserRegister = false;
    },
    setInfoPopupOpen: (state) => {
      state.isNoticeOpen = false;
      state.isHistoryOpen = false;
      state.isSettingOpen = false;
      state.isTestStartOpen = false;
      state.isInfoPopupOpen = true; //!state.isInfoPopupOpen;
      state.isUserRegister = false;
    },
    setUserRegister: (state, actions) => {
      state.isNoticeOpen = false;
      state.isHistoryOpen = false;
      state.isSettingOpen = false;
      state.isTestStartOpen = false;
      state.isInfoPopupOpen = false;
      state.isUserRegister = true; //!state.isEditingName;
      state.isRegister = actions.payload;
    },
  },
});

export const {
  setNoticeOpen,
  setHistoryOpen,
  setSettingOpen,
  setTestStartOpen,
  setInfoPopupOpen,
  setUserRegister,
} = popupToggleSlice.actions;

export default popupToggleSlice.reducer;
