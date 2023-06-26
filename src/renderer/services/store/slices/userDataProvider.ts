import { createSlice } from '@reduxjs/toolkit';
import { UserInfo } from '@interfaces';

const initialState: UserInfo = {};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      console.log("setUserInfo", action.payload);
      state.user_name = action.payload.user_name;
      state.gender = action.payload.gender;
      state.birthday = action.payload.birthday;
      state.patient_no = action.payload.patient_no;
    },
    setSession: (state) => {
      state.sessionId = Number(new Date).toString(36);;
    },
    clearSession: (state) => {
      state.sessionId = undefined;
    },
    resetUserInfo: () => initialState,
  }
});

export const {
  setUserInfo,
  resetUserInfo,
  setSession,
  clearSession,
} = userInfoSlice.actions;

export default userInfoSlice.reducer;
