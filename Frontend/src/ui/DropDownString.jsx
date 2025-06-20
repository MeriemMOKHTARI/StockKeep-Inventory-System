import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";

function DropDownString({ articles }) {
  const [isOpen, setIsOpen] = useState(false);
  function handleClick(isOpen) {
    setIsOpen((isOpen) => !isOpen);
  }
  return (
    <div className="relative w-[17rem]">
      <button
        className="py-3 px-6 w-full bg-[#F7FAFC] rounded-[10px] border-[#E3E8EE] border-[1px]"
        onClick={() => handleClick(isOpen)}
      >
        <div className="flex justify-between items-center">
          <span>---</span>
          <span>
            <KeyboardArrowDownIcon />
          </span>
        </div>
      </button>
      {isOpen && (
        <ul className="w-[17rem] bg-[#F7FAFC] rounded-[10px] p-4 absolute list-disc pl-10 z-[2]">
          {articles.map((article) => (
            <li className="font-poppins mb-1 text-[#444] text-left">
              {article}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default DropDownString;
