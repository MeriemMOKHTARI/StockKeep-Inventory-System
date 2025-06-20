import SideBar from "../SideBar";
import Header from "../Header";
import { useState } from "react";
import Dashboard from "./Dashboard";

function DashboardPageAchat() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <SideBar isOpen={isOpen} />
      <div className="flex flex-col w-[82%] max-[770px]:w-full">
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />
        <Dashboard />
      </div>
    </>
  );
}

export default DashboardPageAchat;
