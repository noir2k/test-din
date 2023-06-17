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
      state.birth = action.payload.birth;
      state.patient = action.payload.patient;
    },
  }
});

export const {
  setUserInfo
} = userNameSlice.actions;

export default userNameSlice.reducer;
