import Main from "./Main";
import Header from "../Header";
import SideBar from "../SideBar";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axiosInstance from "../../Services/AxiosInstance";
import Cookies from "universal-cookie";
import { modifyFirstName, modifyLastName } from "../../admin/UserSlice";
/*import {
  modifyFirstName,
  modifyUsername,
  modifyLastName,
} from "../../admin/UserSlice";*/

const cookies = new Cookies();
function Achat({ index, search }) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  //const { email } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const email = cookies.get("email");
  useEffect(
    () =>
      async function fetchUsers() {
        try {
          const response = await axiosInstance.get("/user/listcreate/");
          const user = response.data.find((user) => user.email === email);
          cookies.set("username", user.username);
          cookies.set("firstname", user.first_name);
          cookies.set("lastname", user.last_name);
          dispatch(modifyFirstName(user.first_name));
          dispatch(modifyLastName(user.last_name));
          /*dispatch(modifyUsername(user.username));
          dispatch(modifyFirstName(user.first_name));
          dispatch(modifyLastName(user.last_name));*/
        } catch (error) {
          console.error("Error fetching user's data:", error);
        }
      },
    [dispatch, email]
  );
  return (
    <>
      <SideBar isOpen={isOpen} initialIndex={index} />
      <div className="flex flex-col w-[82%] max-[770px]:w-full">
        <Header
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          search={search}
          notif={true}
        />
        <Main isLoading={isLoading} setIsLoading={setIsLoading} />
      </div>
    </>
  );
}

export default Achat;
