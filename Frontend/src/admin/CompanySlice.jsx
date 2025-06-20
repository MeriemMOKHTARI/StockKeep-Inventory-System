import { createSlice } from "@reduxjs/toolkit";

function fetchCompany() {
  async function f() {
    const response1 = await fetch("http://127.0.0.1:8000/user/entreprises/1/");
    const data1 = await response1.json();
    return data1;
  }
  return f();
}
const initialState = {
  companyName: fetchCompany().name,
  companyEmail: fetchCompany().email,
  companyTva: fetchCompany().tva,
  companyImage: "",
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    modifyName(state, action) {
      state.companyName = action.payload;
    },
    modifyCompanyImage(state, action) {
      state.companyImage = action.payload;
    },
    modifyCompanyEmail(state, action) {
      state.companyEmail = action.payload;
    },
    modifyCompanyTva(state, action) {
      state.companyTva = action.payload;
    },
  },
});

export const {
  modifyName,
  modifyCompanyImage,
  modifyCompanyEmail,
  modifyCompanyTva,
} = companySlice.actions;

export default companySlice.reducer;
