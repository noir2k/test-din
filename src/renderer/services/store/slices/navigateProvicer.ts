import { createSlice } from '@reduxjs/toolkit';
import { TestForm } from '@interfaces';

interface navigateState {
  isNoticeOpen: boolean;
  isTestResultOpen: boolean;
  isSettingOpen: boolean;
  isTestStartOpen: boolean;
  isUserRegister: boolean;
  isTestSessionOpen: boolean;
  isDimPopupOpen: boolean;
  isRegister: boolean;
  itemResult?: { index: number; data: TestForm };
}

const initialState: navigateState = {
  isNoticeOpen: true,
  isTestResultOpen: false,
  isSettingOpen: false,
  isTestStartOpen: false,
  isUserRegister: false,
  isTestSessionOpen: false,
  isDimPopupOpen: false,
  isRegister: true,
  itemResult: undefined,
};

const navigateProvider = createSlice({
  name: 'navigate',
  initialState,
  reducers: {
    setNoticeOpen: (state) => {
      state.isNoticeOpen = true;
      state.isTestResultOpen = false;
      state.isSettingOpen = false;
      state.isTestStartOpen = false;
      state.isUserRegister = false;
      state.isTestSessionOpen = false;
    },
    setTestResultOpen: (state, action) => {
      state.isNoticeOpen = false;
      state.isTestResultOpen = true;
      state.isSettingOpen = false;
      state.isTestStartOpen = false;
      state.isUserRegister = false;
      state.isTestSessionOpen = false;
      const { index, data } = action.payload;
      state.itemResult = { index, data };
    },
    setSettingOpen: (state) => {
      state.isNoticeOpen = false;
      state.isTestResultOpen = false;
      state.isSettingOpen = true;
      state.isTestStartOpen = false;
      state.isUserRegister = false;
      state.isTestSessionOpen = false;
    },
    setTestStartOpen: (state) => {
      state.isNoticeOpen = false;
      state.isTestResultOpen = false;
      state.isSettingOpen = false;
      state.isTestStartOpen = true;
      state.isUserRegister = false;
      state.isTestSessionOpen = false;
      state.itemResult = undefined;
    },
    setUserRegister: (state, action) => {
      state.isNoticeOpen = false;
      state.isTestResultOpen = false;
      state.isSettingOpen = false;
      state.isTestStartOpen = false;
      state.isUserRegister = true;
      state.isTestSessionOpen = false;
      state.isRegister = action.payload;
    },
    setTestSession: (state) => {
      state.isNoticeOpen = false;
      state.isTestResultOpen = false;
      state.isSettingOpen = false;
      state.isTestStartOpen = false;
      state.isUserRegister = false;
      state.isTestSessionOpen = true;
    },
    setImportCsv: (state) => {
      state.isNoticeOpen = false;
      state.isTestResultOpen = false;
      state.isSettingOpen = false;
      state.isTestStartOpen = false;
      state.isUserRegister = false;
      state.isTestSessionOpen = true;
    },
    setDimPopup: (state, action) => {
      state.isDimPopupOpen = action.payload;
    },
  },
});

export const {
  setNoticeOpen,
  setTestResultOpen,
  setSettingOpen,
  setTestStartOpen,
  setUserRegister,
  setTestSession,
  setDimPopup,
} = navigateProvider.actions;

export default navigateProvider.reducer;
