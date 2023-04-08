import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface LoginState {
  value: boolean;
}

const initialState: LoginState = {
  value: false,
};

export const loginReducer = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginTrigger: (state: LoginState, action: PayloadAction<boolean>) => {
      const { type, payload } = action;
      state.value = payload;
    },
  },
});

export const { loginTrigger } = loginReducer.actions;

export default loginReducer.reducer;
