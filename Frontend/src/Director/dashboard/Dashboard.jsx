import Main from "./Main";
import Header from "../Header";
import SideBar from "../SideBar";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axiosInstance from "../../Services/AxiosInstance";
import {
  modifyFirstName,
  modifyUsername,
  modifyLastName,
} from "../../admin/UserSlice";

function Director({ index, search }) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.user);
  useEffect(
    () =>
      async function fetchUsers() {
        try {
          const response = await axiosInstance.get("/user/listcreate/");
          const user = response.data.find((user) => user.email === email);
          dispatch(modifyUsername(user.username));
          dispatch(modifyFirstName(user.first_name));
          dispatch(modifyLastName(user.last_name));
        } catch (error) {
          console.error("Error fetching user's data:", error);
        }
      },
    [dispatch, email]
  );
  return (
    <>
      <SideBar isOpen={isOpen} initialIndex={index} />
      <div className="flex flex-col w-[82%] max-[770px]:w-full overflow-auto max-h-screen">
        <Header
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          search={search}
          notif={true}
        />
        <Main />
      </div>
    </>
  );
}

export default Director;
