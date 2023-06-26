import { createSlice } from '@reduxjs/toolkit';
import { TestForm } from '@interfaces';
import { columnToForm } from '@lib/common';

interface navigateState {
  isNoticeOpen: boolean;
  isTestResultOpen: boolean;
  isSettingOpen: boolean;
  isTestStartOpen: boolean;
  isInfoPopupOpen: boolean;
  isUserRegister: boolean;
  isRegister: boolean;
  itemResult?: TestForm;
}

const initialState: navigateState = {
  isNoticeOpen: true,
  isTestResultOpen: false,
  isSettingOpen: false,
  isTestStartOpen: false,
  isInfoPopupOpen: false,
  isUserRegister: false,
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
    setTestResultOpen: (state, actions) => {
      state.isNoticeOpen = false;
      state.isTestResultOpen = true;
      state.isSettingOpen = false;
      state.isTestStartOpen = false;
      state.isInfoPopupOpen = false;
      state.isUserRegister = false;
      state.itemResult = columnToForm(actions.payload);
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
    },
    setInfoPopupOpen: (state) => {
      state.isNoticeOpen = false;
      state.isTestResultOpen = false;
      state.isSettingOpen = false;
      state.isTestStartOpen = false;
      state.isInfoPopupOpen = true;
      state.isUserRegister = false;
    },
    setUserRegister: (state, actions) => {
      state.isNoticeOpen = false;
      state.isTestResultOpen = false;
      state.isSettingOpen = false;
      state.isTestStartOpen = false;
      state.isInfoPopupOpen = false;
      state.isUserRegister = true;
      state.isRegister = actions.payload;
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
} = navigateProvider.actions;

export default navigateProvider.reducer;
