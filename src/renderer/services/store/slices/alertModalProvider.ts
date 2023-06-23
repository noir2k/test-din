import { createSlice } from '@reduxjs/toolkit';

type AlertModalType = {
  isShow: boolean,
  title: string,
  message: string
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
    },
    resetAlertModal: () => initialState,
  }
});

export const {
  setAlertModal,
  resetAlertModal,
} = userNameSlice.actions;

export default userNameSlice.reducer;
