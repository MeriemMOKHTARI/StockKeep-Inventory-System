import Stats from "../../admin/dashboard/Stats";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Chart from "./chart";
import Profile from "../../admin/dashboard/Profile";
import Entreprise from "../../admin/dashboard/Entreprise";
import { useEffect, useState } from "react";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import axiosInstance from "../../Services/AxiosInstance";
import TableChart from "./TableChart";
import Chart2 from "./Chart2";


const theme = createTheme({
  palette: {
    secondary: {
      main: "#ffff",
    },
  },
});

function Main() {
  const [NumberOfOrders, setNumberOfOrders] = useState(0);

  axiosInstance
    .get("http://127.0.0.1:8000/directeur/bondecommandeinterne/list/")
    .then((res) => setNumberOfOrders(res.data.length));

  return (
    <ThemeProvider theme={theme}>
      <main className="flex gap-3 max-[600px]:flex-col-reverse">
        <div className="flex flex-col gap-3 pl-10">
          <Profile />
          <Chart2/>
          <TableChart/>
        </div>
        <div className=" rounded-[11px] max-w-[fit-content] pr-6 flex flex-col gap-3 max-[600px]:max-w-full max-[600px]:w-full max-[600px]:pr-4">
          <Stats
            critere="Internal orders"
            stat={NumberOfOrders}
            icon={
              <ShoppingBasketOutlinedIcon fontSize="large" color="secondary" />
            }
          />
          <Chart />
        </div>
      </main>
    </ThemeProvider>
  );
}

export default Main;
