import { createSlice } from "@reduxjs/toolkit";

import {
  fetchUsers,
  fetchConsumers,
  fetchRoles,
  fetchPermissions,
  fetchStructures,
} from "../Services/services";

const initialState = {
  searchQuery: "",
  users: await fetchUsers(),
  consumers: await fetchConsumers(),
  structures: await fetchStructures(),
  roles: await fetchRoles(),
  Allpermissions: [],
  permissions: await fetchPermissions(),
  name: "",
};

const adminSlice = createSlice({
  name: "admin",
  initialState, // Utiliser initialState au lieu de initilaState
  reducers: {
    changeQuery(state, action) {
      state.searchQuery = action.payload;
    },
    modifyUsers(state, action) {
      state.users = action.payload;
    },
    modifyConsumers(state, action) {
      state.consumers = action.payload;
    },
    modifyStructures(state, action) {
      state.structures = action.payload;
    },
    modifyRoles(state, action) {
      state.roles = action.payload;
    },
    modifyAllPermissions(state, action) {
      state.Allpermissions = action.payload;
    },
    modifyPermissions(state, action) {
      state.permissions = action.payload;
    },
    modifyName(state, action) {
      state.name = action.payload;
    },
  },
});

export const {
  changeQuery,
  modifyUsers,
  modifyConsumers,
  modifyStructures,
  modifyRoles,
  modifyAllPermissions,
  modifyPermissions,
} = adminSlice.actions;

export default adminSlice.reducer;
