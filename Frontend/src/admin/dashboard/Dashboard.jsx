import SideBar from "../SideBar";
import Header from "../../admin/Header";
import { useEffect, useState } from "react";
import Main from "./Main";
import axiosInstance from "../../Services/AxiosInstance";
import Cookies from "universal-cookie";

const cookies = new Cookies();
function Dashboard({ index }) {
  const email = cookies.get("email");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(
    () =>
      async function fetchUsers() {
        try {
          const response = await axiosInstance.get("/user/listcreate/");
          const user = response.data.find((user) => user.email === email);
          cookies.set("username", user.username);
          cookies.set("firstname", user.first_name);
          cookies.set("lastname", user.last_name);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      },
    [email]
  );

  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <SideBar isOpen={isOpen} initialIndex={index} />
      <div className="flex flex-col w-[82%] max-[770px]:w-full">
        <Header
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          search={false}
          notif={true}
          isLoading={isLoading}
        />
        <Main isLoading={isLoading} setIsLoading={setIsLoading} />
      </div>
    </>
  );
}

export default Dashboard;
