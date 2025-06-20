import { createSlice } from "@reduxjs/toolkit";

import { fetchChapters } from "../Services/services";

const initialState = {
  searchQuery: "",
  chapters: await fetchChapters(),
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
  },
});

export const { modifyChapters } = achatSlice.actions;

export default achatSlice.reducer;
