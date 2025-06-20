import SideBar from "./SideBar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function Layout({ search }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <SideBar isOpen={isOpen} />
      <div className="flex flex-col w-[82%] max-[770px]:w-full">
        <Header isOpen={isOpen} setIsOpen={setIsOpen} search={search} />
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
