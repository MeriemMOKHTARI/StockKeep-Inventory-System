import SideBar from "../SideBar";
import Header from "../../admin/Header";
import { useState } from "react";
import Inventory from "./InventoryPage";

function Inventairee({ index, search }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <SideBar isOpen={isOpen} initialIndex={index} />
      <div className="flex flex-col w-[82%] max-[770px]:w-full">
        <Header isOpen={isOpen} setIsOpen={setIsOpen} search={search} />
        <Inventory />
      </div>
    </>
  );
}

export default Inventairee;
