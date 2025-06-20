import Stats from "../../admin/dashboard/Stats";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Profile from "../../admin/dashboard/Profile";
import Chart from "./Chart";
import { useEffect, useState } from "react";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import FeedIcon from "@mui/icons-material/Feed";
import LowPriorityIcon from "@mui/icons-material/LowPriority";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import TakeoutDiningIcon from "@mui/icons-material/TakeoutDining";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import axionsInstance from "../../Services/AxiosInstance";
import TableChart from "./TableChart";
import { Tab } from "@mui/material";
const theme = createTheme({
  palette: {
    secondary: {
      main: "#ffff",
    },
  },
});

//hedo les fonction li tmodifihom bch tlinki numbers ta3 dashboard m3a lback mbghitch nsuprimihom bch ghi hna w tmodifi
function Main() {
  const [NumberOfExternal, setNumber0fExternal] = useState(0);
  const [NumberOfDischarge, setNumber0fDischarge] = useState(0);
  const [NumberOfExit, setNumber0fExit] = useState(0);
  const [NumberOfInternal, setNumber0fInternal] = useState(0);
  const [NumberOfReceipts, setNumber0fReceipts] = useState(0);

  useEffect(() => {
    axionsInstance
      .get("http://127.0.0.1:8000/service-achat/bondecommande/listcreate/")
      .then((response) => {
        setNumber0fExternal(response.data.length);
      })
      .catch((error) => console.log(error));

    axionsInstance
      .get("http://127.0.0.1:8000/magasinier/bondesortie/listcreate/")
      .then((response) => {
        setNumber0fDischarge(response.data.length);
      })
      .catch((error) => console.log(error));

    axionsInstance
      .get("http://127.0.0.1:8000/magasinier/bondesortie/list/")
      .then((response) => {
        setNumber0fDischarge(response.data.length);
      })
      .catch((error) => console.log(error));

    axionsInstance
      .get("http://127.0.0.1:8000/magasinier/bondecommandeinterne/list/")
      .then((response) => {
        setNumber0fInternal(response.data.length);
      })
      .catch((error) => console.log(error));

    axionsInstance
      .get("http://127.0.0.1:8000/magasinier/bondereception/list/")
      .then((response) => {
        setNumber0fReceipts(response.data.length);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <main className="flex gap-32 max-[600px]:flex-col-reverse">
        <div className=" rounded-[11px]  max-w-[fit-content] pl-10 flex flex-col gap-6 max-[600px]:max-w-full max-[600px]:w-full max-[600px]:pr-4">
          <Stats
            critere="External orders"
            stat={NumberOfExternal}
            icon={<ShoppingBasketIcon fontSize="large" color="secondary" />}
          />

          <Stats
            critere="Receipts"
            stat={NumberOfReceipts}
            icon={<FeedIcon fontSize="large" color="secondary" />}
          />

          <Stats
            critere="Movement sheets"
            stat={NumberOfInternal}
            icon={<LowPriorityIcon fontSize="large" color="secondary" />}
          />

          <Stats
            critere="Internal orders"
            stat={NumberOfInternal}
            icon={<LocalMallIcon fontSize="large" color="secondary" />}
          />

          <Stats
            critere="Exit vouchers"
            stat={NumberOfExit}
            icon={<ExitToAppIcon fontSize="large" color="secondary" />}
          />
          <Stats
            critere="Discharge vouchers"
            stat={NumberOfDischarge}
            icon={<TakeoutDiningIcon fontSize="large" color="secondary" />}
          />
        </div>

        <div className="flex flex-col gap-3 pr-6">
          <div className="flex flex-row gap-5">
            <Profile />
            <TableChart />
          </div>
          <Chart />
        </div>
      </main>
    </ThemeProvider>
  );
}

export default Main;
