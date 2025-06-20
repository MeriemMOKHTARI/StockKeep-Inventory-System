import { createSlice } from "@reduxjs/toolkit";

import { fetchOrders } from "../Services/services";

const initialState = {
  searchQuery: "",
  orders: await fetchOrders(),
};

const consumerSlice = createSlice({
  name: "consumer",
  initialState, // Utiliser initialState au lieu de initilaState
  reducers: {
    changeQuery(state, action) {
      state.searchQuery = action.payload;
    },
    modifyUsers(state, action) {
      state.users = action.payload;
    },
    modifyOrders(state, action) {
      state.orders = action.payload;
    },
  },
});

export const { changeQuery, modifyOrders } = consumerSlice.actions;

export default consumerSlice.reducer;
