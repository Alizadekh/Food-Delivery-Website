import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: { name: "Ayxan" },
  },
  reducers: {},
});

export default authSlice.reducer;
