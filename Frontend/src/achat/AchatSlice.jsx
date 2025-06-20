import { createSlice } from "@reduxjs/toolkit";

import {
  fetchChapters,
  fetchArticles,
  fetchProducts,
  fetchSuppliers,
  fetchbondecommande,
} from "../Services/services";

const initialState = {
  searchQuery: "",
  chapters: await fetchChapters(),
  articles: await fetchArticles(),
  products: await fetchProducts(),
  suppliers: await fetchSuppliers(),
  bondecommandes: await fetchbondecommande(),
  selectedArticles: [],
};

const achatSlice = createSlice({
  name: "achat",
  initialState, // Utiliser initialState au lieu de initilaState
  reducers: {
    changeQuery(state, action) {
      state.searchQuery = action.payload;
    },
    modifyChapters(state, action) {
      state.chapters = action.payload;
    },
    modifyArticles(state, action) {
      state.articles = action.payload;
    },
    modifyProducts(state, action) {
      state.products = action.payload;
    },
    modifySelectedArticles(state, action) {
      state.selectedArticles = action.payload;
    },
    modifySuppliers(state, action) {
      state.suppliers = action.payload;
    },
    modifyBonDeCommande(state, action) {
      state.bondecommandes = action.payload;
    },
  },
});

export const {
  modifyChapters,
  changeQuery,
  modifyArticles,
  modifyProducts,
  modifySelectedArticles,
  modifySuppliers,
  modifyBonDeCommande,
} = achatSlice.actions;

export default achatSlice.reducer;
