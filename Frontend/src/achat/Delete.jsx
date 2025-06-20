import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DiscardButton from "../ui/DiscardButton";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { modifyBonDeCommande } from "./AchatSlice";

function ConfirmDelete({ open, orderId, handleClose, children, concern }) {
  const [errorMessage, setErrorMessage] = useState("");
  const { bondecommandes } = useSelector((state) => state.achat);
  const dispatch = useDispatch();

  const handleDeleteOrder = async () => {
    try {
      let response;
      switch (concern) {
        case "order":
          response = await axios.delete(
            `http://127.0.0.1:8000/service-achat/bondecommande/rud/${orderId}/`
          );
          break;
        default:
          throw new Error("Invalid concern type");
      }

      if (response.status === 204) {
        toast.success(`${concern} deleted successfully`, {
          className: "font-poppins text-[1.3rem] font-medium",
        });
        handleClose();
        dispatch(
          modifyBonDeCommande(
            bondecommandes.filter((bon) => bon.id !== orderId)
          )
        );
      } else {
        setErrorMessage(`Failed to delete ${concern}.`);
      }
    } catch (error) {
      setErrorMessage(`An error occurred while deleting the ${concern}.`);
    }
  };

  return (
    <>
      <Toaster />
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "div",
          sx: {
            boxShadow: "none",
            "& .MuiBackdrop-root": { backgroundColor: "transparent" },
          },
        }}
        hideBackdrop={false}
        maxWidth="xs"
      >
        <h2 className="font-bold text-center font-poppins text-[#303841] text-[2rem] mt-10 mb-6 mx-32">
          Are you sure you want to delete this {concern} ?
        </h2>

        {errorMessage && (
          <div className="text-red-600 bg-red-200 p-4 mb-4 rounded-md mx-32">
            {errorMessage}
          </div>
        )}

        <DialogActions>
          <div className="flex items-center justify-center w-full mb-8">
            <DiscardButton onClick={handleClose} color="#858D9D" bg="white">
              Discard
            </DiscardButton>
            <button
              onClick={handleDeleteOrder}
              className="text-white bg-red-600 rounded-[10px]  font-poppins py-4 w-[9rem] text-center ml-4"
              type="submit"
            >
              Confirm
            </button>
          </div>
        </DialogActions>
      </Dialog>
      {children}
    </>
  );
}

export default ConfirmDelete;
