import SideBar from "../SideBar.jsx";
import Header from "../../admin/Header.jsx";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeQuery } from "../../admin/AdminSlice.jsx";
import ReceiptsTable from "./receiptsTable.jsx";

function ReceiptsPage({ index }) {
  const dispatch = useDispatch();
  dispatch(changeQuery(""));
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <SideBar isOpen={isOpen} initialIndex={index} />
      <div className="flex flex-col w-[82%] max-[770px]:w-full">
        <Header isOpen={isOpen} setIsOpen={setIsOpen} search={true} />
        <ReceiptsTable />
      </div>
    </>
  );
}

export default ReceiptsPage;
