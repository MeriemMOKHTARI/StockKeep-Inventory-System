import Stats from "../../admin/dashboard/Stats";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Profile from "../../admin/dashboard/Profile";
import Entreprise from "./Entreprise";
import { useEffect, useState } from "react";
import { LineWave } from "react-loader-spinner";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import axiosInstance from "../../Services/AxiosInstance";
import Chart from "./chart";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#ffff",
    },
  },
});

function Main({ isLoading, setIsLoading }) {
  const [numberOfOrders, setNumberOfOrders] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    axiosInstance
      .get("/consom/bondecommandeinterne/listcreate/")
      .then((res) => {
        setNumberOfOrders(res.data.length);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
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
        <main className="flex  max-[600px]:flex-col-reverse">
          <div className="flex flex-col gap-10 pl-10 mr-10">
            <Profile />
            <Chart />
          </div>
          <div className=" rounded-[11px] max-w-[fit-content] flex flex-col  max-[600px]:max-w-full max-[600px]:w-full max-[600px]:pr-4">
            <Stats
              critere="Internal orders"
              stat={numberOfOrders}
              icon={
                <ShoppingBasketOutlinedIcon
                  fontSize="large"
                  color="secondary"
                />
              }
            />
          </div>
        </main>
      )}
    </ThemeProvider>
  );
}

export default Main;
