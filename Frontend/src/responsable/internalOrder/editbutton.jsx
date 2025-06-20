import React, { useState } from "react";
import modifyIcon from "../../assets/modifyIcon.png";
import NewIntOrder from "./NewIntOrder";

const EditButton = (orderId) => {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <NewIntOrder
        orderId={orderId}
        open={open}
        handleClose={() => setOpen(false)}
        setOpen={setOpen}
      />
      <button
        className="border rounded-[15px] w-[80px] h-[35px] flex items-center justify-center mr-[1px] text-[#888888] bg-[#F4F7FE]"
        style={{ fontFamily: "Poppins", fontWeight: 500, fontSize: "14px" }}
        onClick={() => setOpen(true)}
      >
        <img src={modifyIcon} alt="Edit" className="h-5 w-5 mr-2" />
        <span className="ml-1">Edit</span>
      </button>
    </React.Fragment>
  );
};

export default EditButton;
