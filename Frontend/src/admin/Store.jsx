import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./AdminSlice";
import UserSlice from "./UserSlice";
import CompanySlice from "./CompanySlice";
import AchatSlice from "../achat/AchatSlice";
import ConusmerSlice from "../consumer/ConusmerSlice";
import RespoSlice from "../responsable/RespoSlice";
import MagasinierSlice from "../magasinier/MagasinierSlice";
const store = configureStore({
  reducer: {
    admin: adminReducer,
    user: UserSlice,
    company: CompanySlice,
    achat: AchatSlice,
    consumer: ConusmerSlice,
    responsable: RespoSlice,
    magasinier: MagasinierSlice,
  },
});
export default store;
