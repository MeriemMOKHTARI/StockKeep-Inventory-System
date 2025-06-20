import SideBar from "../SideBar";
import Header from "../Header";
import { useState } from "react";
import Consumers from "./Consumers";
import { useDispatch } from "react-redux";
import { changeQuery } from "../AdminSlice.jsx";

function ConsumersPage({ index }) {
  const dispatch = useDispatch();
  dispatch(changeQuery(""));
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <SideBar isOpen={isOpen} initialIndex={index} />
      <div className="flex flex-col w-[82%] max-[770px]:w-full">
        <Header isOpen={isOpen} setIsOpen={setIsOpen} search={true} />
        <Consumers />
      </div>
    </>
  );
}

export default ConsumersPage;
