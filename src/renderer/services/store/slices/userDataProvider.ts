import { createSlice } from '@reduxjs/toolkit';
import { UserInfo } from '@interfaces';

const initialState: UserInfo = {};

const userNameSlice = createSlice({
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
    reset: () => initialState,
  }
});

export const {
  setUserInfo,
  reset
} = userNameSlice.actions;

export default userNameSlice.reducer;
