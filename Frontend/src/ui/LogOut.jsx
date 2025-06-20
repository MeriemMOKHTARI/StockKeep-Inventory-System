import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DiscardButton from "./DiscardButton";
import SubmitButton from "./SubmitButton";
import DialogContent from "@mui/material/DialogContent";
import { cookies } from "../authentification/Login";
import { useNavigate } from "react-router-dom";

function LogOut({ open, handleClose, setOpen, children }) {
  const navigate = useNavigate();
  function handleLogOut() {
    setOpen(false);
    cookies.remove("accessToken");
    cookies.remove("refreshToken");
    navigate("/");
  }
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        PaperProps={{
          component: "div",
        }}
        maxWidth="xs"
      >
        <DialogContent>
          <p className="font-bold text-center font-poppins text-[#303841] text-[2rem] mt-10">
            Are you sure you want to log out ?
          </p>
          <DialogActions>
            <div className="flex items-center justify-center w-full mt-8">
              <DiscardButton onClick={handleClose} color="#858D9D" bg="white">
                Discard
              </DiscardButton>
              <SubmitButton onClick={handleLogOut}>Log out</SubmitButton>
            </div>
          </DialogActions>
        </DialogContent>
      </Dialog>

      {children}
    </>
  );
}

export default LogOut;
