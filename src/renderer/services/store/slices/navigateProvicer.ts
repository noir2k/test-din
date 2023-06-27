import { createSlice } from '@reduxjs/toolkit';
import { TestForm } from '@interfaces';

interface navigateState {
  isNoticeOpen: boolean;
  isTestResultOpen: boolean;
  isSettingOpen: boolean;
  isTestStartOpen: boolean;
  isInfoPopupOpen: boolean;
  isUserRegister: boolean;
  isDimPopupOpen: boolean;
  isRegister: boolean;
  itemResult?: { index: number, data: TestForm };
}

const initialState: navigateState = {
  isNoticeOpen: true,
  isTestResultOpen: false,
  isSettingOpen: false,
  isTestStartOpen: false,
  isInfoPopupOpen: false,
  isUserRegister: false,
  isDimPopupOpen: false,
  isRegister: true,
  itemResult: undefined
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
      state.isInfoPopupOpen = false;
      state.isUserRegister = false;
    },
    setTestResultOpen: (state, action) => {
      state.isNoticeOpen = false;
      state.isTestResultOpen = true;
      state.isSettingOpen = false;
      state.isTestStartOpen = false;
      state.isInfoPopupOpen = false;
      state.isUserRegister = false;
      const { index, data } = action.payload;
      state.itemResult = { index, data };
    },
    setSettingOpen: (state) => {
      state.isNoticeOpen = false;
      state.isTestResultOpen = false;
      state.isSettingOpen = true;
      state.isTestStartOpen = false;
      state.isInfoPopupOpen = false;
      state.isUserRegister = false;
    },
    setTestStartOpen: (state) => {
      state.isNoticeOpen = false;
      state.isTestResultOpen = false;
      state.isSettingOpen = false;
      state.isTestStartOpen = true;
      state.isInfoPopupOpen = false;
      state.isUserRegister = false;
      state.itemResult = undefined;
    },
    setInfoPopupOpen: (state) => {
      state.isNoticeOpen = false;
      state.isTestResultOpen = false;
      state.isSettingOpen = false;
      state.isTestStartOpen = false;
      state.isInfoPopupOpen = true;
      state.isUserRegister = false;
    },
    setUserRegister: (state, action) => {
      state.isNoticeOpen = false;
      state.isTestResultOpen = false;
      state.isSettingOpen = false;
      state.isTestStartOpen = false;
      state.isInfoPopupOpen = false;
      state.isUserRegister = true;
      state.isRegister = action.payload;
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
  setInfoPopupOpen,
  setUserRegister,
  setDimPopup,
} = navigateProvider.actions;

export default navigateProvider.reducer;
