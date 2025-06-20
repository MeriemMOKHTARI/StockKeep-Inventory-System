import SideBar from "../SideBar";
import Header from "../Header";
import { useState } from "react";
import InernalOrder from "./internalOrder";

function InternalPageDirector({ index, search }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <SideBar isOpen={isOpen} initialIndex={index} />
      <div className="flex flex-col w-[82%] max-[770px]:w-full">
        <Header isOpen={isOpen} setIsOpen={setIsOpen} search={search} />
        <InernalOrder />
      </div>
    </>
  );
}

export default InternalPageDirector;
