import React, { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Status from "./Status";

const Approuve = (statusId) => {
  const [open, setOpen] = useState(false);

  const id = statusId.statusId;

  return (
    <React.Fragment>
      <Status
        statusId={id}
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
        <span className="ml-1">Approuve</span>
      </button>
    </React.Fragment>
  );
};

export default Approuve;
