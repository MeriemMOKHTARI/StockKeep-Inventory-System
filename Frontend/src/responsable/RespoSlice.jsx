import { createSlice } from "@reduxjs/toolkit";

import { fetchOrdersResponsable } from "../Services/services";

const initialState = {
  ordersResponsable: await fetchOrdersResponsable(),
  query: "",
};

const responsableSlice = createSlice({
  name: "responsable",
  initialState, // Utiliser initialState au lieu de initilaState
  reducers: {
    modifyOrdersResponsable(state, action) {
      state.ordersResponsable = action.payload;
    },
    modifyQuery(state, action) {
      state.query = action.payload;
    },
  },
});

export const { modifyOrdersResponsable, modifyQuery } =
  responsableSlice.actions;

export default responsableSlice.reducer;
