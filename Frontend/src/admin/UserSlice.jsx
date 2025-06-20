import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  email: "",
  firstName: "",
  lastName: "",
  id: "",
  companyName: "",
  role: "",
};

const userSlice = createSlice({
  name: "user",
  initialState, // Utiliser initialState au lieu de initilaState
  reducers: {
    modifyUsername(state, action) {
      state.username = action.payload;
    },
    modifyEmail(state, action) {
      state.email = action.payload;
    },
    modifyFirstName(state, action) {
      state.firstName = action.payload;
    },
    modifyLastName(state, action) {
      state.lastName = action.payload;
    },
    modifyId(state, action) {
      state.id = action.payload;
    },
    modifyCompanyName(state, action) {
      state.companyName = action.payload;
    },
    modifyRole(state, action) {
      state.role = action.payload;
    },
  },
});

export const {
  modifyUsername,
  modifyEmail,
  modifyFirstName,
  modifyLastName,
  modifyId,
  modifyCompanyName,
  modifyRole,
} = userSlice.actions;

export default userSlice.reducer;
