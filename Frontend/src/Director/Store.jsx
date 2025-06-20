import { configureStore } from "@reduxjs/toolkit";
import achatReducer from "./AchatSlice";
const storeAchat = configureStore({
  reducer: { achat: achatReducer },
});
export default storeAchat;
