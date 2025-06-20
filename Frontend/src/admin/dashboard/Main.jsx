import Stats from "./Stats";
import GroupIcon from "@mui/icons-material/Group";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import Profile from "../../admin/dashboard/Profile";
import Entreprise from "./Entreprise";
import { useEffect, useState } from "react";
import axiosInstance from "../../Services/AxiosInstance";
import { LineWave } from "react-loader-spinner";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#ffff",
    },
  },
});

function Main({ isLoading, setIsLoading }) {
  const [NumberOfUsers, setNumberOfUsers] = useState(0);
  const [NumberOfConsumers, setNumberOfConsumers] = useState(0);
  const [NumberOfStructures, setNumberOfStructures] = useState(0);
  const [NumberOfRoles, setNumberOfRoles] = useState(0);
  const [NumberOfPermissions, setNumberOfPermissions] = useState(0);

  useEffect(() => {
    setIsLoading(true);

    Promise.all([
      axiosInstance.get("/user/listcreate/"),
      axiosInstance.get("/consom/listcreate/"),
      axiosInstance.get("/role/listcreate/"),
      axiosInstance.get("/structure/listcreate/"),
      axiosInstance.get("/role/listcreatep/"),
    ])
      .then(
        ([
          usersResponse,
          consumersResponse,
          rolesResponse,
          structuresResponse,
          permissionsResponse,
        ]) => {
          setNumberOfUsers(usersResponse.data.length - 1);
          setNumberOfConsumers(consumersResponse.data.length);
          setNumberOfRoles(rolesResponse.data.length - 1);
          setNumberOfStructures(structuresResponse.data.length);
          setNumberOfPermissions(permissionsResponse.data.length);
          setIsLoading(false);
        }
      )
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
        <main className="flex gap-32 max-[600px]:flex-col-reverse">
          <div className=" rounded-[11px] max-w-[fit-content] pl-10 flex flex-col gap-6 max-[600px]:max-w-full max-[600px]:w-full max-[600px]:pr-4">
            <Stats
              critere="Users"
              stat={NumberOfUsers}
              icon={<GroupIcon fontSize="large" color="secondary" />}
            />

            <Stats
              critere="Consumers"
              stat={NumberOfConsumers}
              icon={
                <LocalGroceryStoreOutlinedIcon
                  fontSize="large"
                  color="secondary"
                />
              }
            />

            <Stats
              critere="Structures"
              stat={NumberOfStructures}
              icon={
                <AccountTreeOutlinedIcon fontSize="large" color="secondary" />
              }
            />

            <Stats
              critere="Roles"
              stat={NumberOfRoles}
              icon={<HubOutlinedIcon fontSize="large" color="secondary" />}
            />

            <Stats
              critere="Permissions"
              stat={NumberOfPermissions}
              icon={<VerifiedOutlinedIcon fontSize="large" color="secondary" />}
            />
          </div>

          <div className="flex flex-col gap-3 pr-6">
            <Profile />
            <Entreprise />
          </div>
        </main>
      )}
    </ThemeProvider>
  );
}

export default Main;
