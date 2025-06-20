import Stats from "../../admin/dashboard/Stats";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Chart from "./chart";
import Profile from "../../admin/dashboard/Profile";
import Entreprise from "../../admin/dashboard/Entreprise";
import { useEffect, useState } from "react";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import axiosInstance from "../../Services/AxiosInstance";
import { LineWave } from "react-loader-spinner";
import TableChart from "./TableChart";
import Chart2 from "./Chart2";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#ffff",
    },
  },
});

function Main({ isLoading, setIsLoading }) {
  const [NumberOfOrders, setNumberOfOrders] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    axiosInstance
      .get("http://127.0.0.1:8000/responsable/bondecommandeinterne/list/")
      .then((res) => {
        setNumberOfOrders(res.data.length);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, [setIsLoading]);

  return (
    <ThemeProvider theme={theme}>
      {isLoading && (
        <div className="absolute left-1/2 top-1/2 translate-y-[-50%] translate-w-[-50%]">
          <LineWave
            visible={true}
            height="200"
            width="200"
            color="#2185D5"
            ariaLabel="line-wave-loading"
            wrapperStyle={{}}
            wrapperClass=""
            firstLineColor=""
            middleLineColor=""
            lastLineColor=""
          />
        </div>
      )}
      {!isLoading && (
        <main className="flex gap-3 max-[600px]:flex-col-reverse">
          <div className="flex flex-col gap-3 pl-10">
            <Profile />
            <Chart2 />
            <TableChart/>
          </div>
          <div className=" rounded-[11px] max-w-[fit-content] pr-6 flex flex-col gap-3 max-[600px]:max-w-full max-[600px]:w-full max-[600px]:pr-4">
            <Stats
              critere="Internal orders"
              stat={NumberOfOrders}
              icon={
                <ShoppingBasketOutlinedIcon
                  fontSize="large"
                  color="secondary"
                />
              }
            />
            <Chart />
          </div>
        </main>
      )}
    </ThemeProvider>
  );
}

export default Main;
