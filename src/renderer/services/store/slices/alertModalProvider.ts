import { createSlice } from '@reduxjs/toolkit';

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
};

const userNameSlice = createSlice({
  name: 'alertModal',
  initialState,
  reducers: {
    setAlertModal: (state, action) => {
      console.log("setAlertModal", action.payload);
      state.isShow = action.payload.isShow;
      state.title = action.payload.title;
      state.message = action.payload.message;
      if (action.payload.callback) {
        state.callback = action.payload.callback;
      }
    },
    resetAlertModal: () => initialState,
  }
});

export const {
  setAlertModal,
  resetAlertModal,
} = userNameSlice.actions;

export default userNameSlice.reducer;
