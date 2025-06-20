import { createSlice } from "@reduxjs/toolkit";
import {
  fetchReceipts,
  fetchStats,
  fetchProducts,
  fetchInternal,
} from "../Services/services";

const initialState = {
  receipts: await fetchReceipts(),
  internalOrders: await fetchInternal(),
  query: "",
  statusQuery: "",
  orderQuery: "",
  stats: await fetchStats(),
  products: await fetchProducts(),
};

const magasinierSlice = createSlice({
  name: "magasinier",
  initialState, // Utiliser initialState au lieu de initilaState
  reducers: {
    modifyReceipts(state, action) {
      state.receipts = action.payload;
    },
    modifyQuery(state, action) {
      state.query = action.payload;
    },
    modifyStats(state, action) {
      state.stats = action.payload;
    },
    modifyStatusQuery(state, action) {
      state.statusQuery = action.payload;
    },
    modifyOrderQuery(state, action) {
      state.orderQuery = action.payload;
    },
    modifyProducts(state, action) {
      state.products = action.payload;
    },
    modfiyInternalOrders(state, action) {
      state.internalOrders = action.payload;
    },
  },
});

export const {
  modifyReceipts,
  modifyQuery,
  modifyStats,
  modifyStatusQuery,
  modifyOrderQuery,
  modifyProducts,
  modfiyInternalOrders,
} = magasinierSlice.actions;

export default magasinierSlice.reducer;
