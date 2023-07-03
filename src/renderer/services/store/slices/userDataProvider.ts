import { createSlice } from '@reduxjs/toolkit';
import { UserInfo } from '@interfaces';

const initialState: UserInfo = {};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.user_name = action.payload.user_name;
      state.gender = action.payload.gender;
      state.birthday = action.payload.birthday;
      state.patient_no = action.payload.patient_no;
      state.tester_name = action.payload.tester_name;
      state.sessionId = Number(new Date()).toString(36);
    },
    resetUserInfo: () => initialState,
  },
});

export const { setUserInfo, resetUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
