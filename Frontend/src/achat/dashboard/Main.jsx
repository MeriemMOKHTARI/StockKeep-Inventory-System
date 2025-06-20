import Stats from "./Stats";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Chart from "./Chart";
import TableChart from "./TableChart";
import Profile from "./Profile";
import Entreprise from "./Entreprise";
import { useEffect, useState } from "react";
import axiosInstance from "../../Services/AxiosInstance";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import { LineWave } from "react-loader-spinner";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#ffff",
    },
  },
});

function Main({ isLoading, setIsLoading }) {
  const [NumberOfChapters, setNumberOfChapters] = useState(0);
  const [NumberOfArticles, setNumberOfArticles] = useState(0);
  const [NumberOfProducts, setNumberOfProducts] = useState(0);
  const [NumberOfSuppliers, setNumberOfSuppliers] = useState(0);
  const [NumberOfOrders, setNumberOfOrders] = useState(0);
  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      axiosInstance.get("service-achat/Chapitre/listcreate/"),
      axiosInstance.get("service-achat/Article/listcreate/"),
      axiosInstance.get("service-achat/Produit/listcreate/"),
      axiosInstance.get("fournisseur/listcreate/"),
      axiosInstance.get("service-achat/bondecommande/listcreate/"),
    ])
      .then(
        ([
          chaptersResponse,
          articlesResponse,
          productsResponse,
          fournisseursResponse,
          bondecommandeResponse,
        ]) => {
          setIsLoading(false);
          setNumberOfChapters(chaptersResponse.data.length);

          setNumberOfArticles(articlesResponse.data.length);
          setNumberOfProducts(productsResponse.data.length);
          setNumberOfSuppliers(fournisseursResponse.data.length);
          setNumberOfOrders(bondecommandeResponse.data.length);
        }
      )
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching data:", error);
      });
  }, []);

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
        <main className="flex gap-32 max-[600px]:flex-col-reverse">
          <div className=" rounded-[11px] max-w-[fit-content] pl-10 flex flex-col gap-6 max-[600px]:max-w-full max-[600px]:w-full max-[600px]:pr-4">
            <Stats
              critere="Chapters"
              stat={NumberOfChapters}
              icon={
                <FormatListBulletedIcon fontSize="large" color="secondary" />
              }
            />

            <Stats
              critere="Articles"
              stat={NumberOfArticles}
              icon={<FeedOutlinedIcon fontSize="large" color="secondary" />}
            />

            <Stats
              critere="Products"
              stat={NumberOfProducts}
              icon={
                <Inventory2OutlinedIcon fontSize="large" color="secondary" />
              }
            />

            <Stats
              critere="Suppliers"
              stat={NumberOfSuppliers}
              icon={
                <LocalShippingOutlinedIcon fontSize="large" color="secondary" />
              }
            />

            <Stats
              critere="Orders"
              stat={NumberOfOrders}
              icon={
                <ShoppingBasketOutlinedIcon
                  fontSize="large"
                  color="secondary"
                />
              }
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
      )}
    </ThemeProvider>
  );
}

export default Main;
