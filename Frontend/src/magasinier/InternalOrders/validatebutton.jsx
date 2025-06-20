import React, { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import NewIntOrder from "./NewIntOrder"; // Assuming NewIntOrder component is defined in a separate file

const ValidateButton = (orderId) => {
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
        className="border rounded-[15px] w-[110px] h-[40px] flex items-center justify-center mr-[1px] bg-blue-500 hover:bg-blue-600 text-white"
        style={{ fontFamily: "Poppins", fontWeight: 500, fontSize: "14px" }}
        onClick={() => setOpen(true)}
      >
        <CheckCircleIcon className="h-3 w-5 mr-1" />
        <span className="ml-1">Validate</span>
      </button>
    </React.Fragment>
  );
};

export default ValidateButton;
