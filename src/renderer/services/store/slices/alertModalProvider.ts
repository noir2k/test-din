import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AlertModalType = {
  isShow: boolean,
  title: string,
  message: string,
  callback?: () => void,
}

const initialState: AlertModalType = {
  isShow: false,
  title: '',
  message: '',
  callback: undefined
};

const alertModalSlice = createSlice({
  name: 'alertModal',
  initialState,
  reducers: {
    setAlertModal: (state, action) => {
      console.log("setAlertModal", action.payload);
      state.isShow = action.payload.isShow;
      state.title = action.payload.title;
      state.message = action.payload.message;
      state.callback = action.payload.callback;
    },
    setShow: (state, action) => {
      state.isShow = action.payload;
    },
    resetAlertModal: () => initialState,
  }
});

export const {
  setAlertModal,
  setShow,
  resetAlertModal,
} = alertModalSlice.actions;

export default alertModalSlice.reducer;
