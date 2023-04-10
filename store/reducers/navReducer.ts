import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface NavState {
  value: boolean;
}

const initialState: NavState = {
  value: false,
};

export const loginReducer = createSlice({
  name: "nav",
  initialState,
  reducers: {
    navTrigger: (state: NavState, action: PayloadAction<boolean>) => {
      const { type, payload } = action;
      state.value = payload;
    },
  },
});

export const { navTrigger } = loginReducer.actions;

export default loginReducer.reducer;
