import SideBar from "../SideBar";
import Header from "../Header";
import { useState } from "react";
import Orders from "./orders";
import { changeQuery } from "../AchatSlice";
import { useDispatch } from "react-redux";

function OrdersPage({ index, search }) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  dispatch(changeQuery(""));
  return (
    <>
      <SideBar isOpen={isOpen} initialIndex={index} />
      <div className="flex flex-col w-[82%] max-[770px]:w-full">
        <Header isOpen={isOpen} setIsOpen={setIsOpen} search={search} />
        <Orders />
      </div>
    </>
  );
}

export default OrdersPage;
