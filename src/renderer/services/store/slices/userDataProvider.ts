import { createSlice } from '@reduxjs/toolkit';
import { UserInfo } from '@interfaces';

const initialState: UserInfo = {
	name: "John Doe",
	sex: "Male",
	birth: "1970-01-01",
	patient: 12345678
};

const userNameSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      console.log("setUserInfo", action.payload);
      state.name = action.payload.name;
      state.sex = action.payload.sex;
      state.birth = action.payload.birth;
      state.patient = action.payload.patient;
    },
  }
});

export const {
  setUserInfo
} = userNameSlice.actions;

export default userNameSlice.reducer;
