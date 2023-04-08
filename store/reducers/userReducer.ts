import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface UserState {
  value: object;
}

const initialState: UserState = {
  value: {
    id: "",
    user: "",
    email: "",
    first_name: "",
    last_name: "",
    address: "",
    profile_image: "",
    role: [],
  },
};

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    userTrigger: (state: UserState, action: PayloadAction<object>) => {
      const { type, payload } = action;
      state.value = payload;
    },
  },
});

export const { userTrigger } = userReducer.actions;

export default userReducer.reducer;
