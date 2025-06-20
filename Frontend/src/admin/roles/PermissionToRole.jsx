import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DiscardButton from "../../ui/DiscardButton";
import SubmitButton from "../../ui/SubmitButton";
import DialogContent from "@mui/material/DialogContent";
import Input from "../../ui/Input";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "../../Services/AxiosInstance";
import SelectPermission from "./SelectPermission";

const permissions = ["Add / Modify / delet", "set / verify / ddd"];

function PermissionToRole({ open, handleClose, setOpen, children }) {
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values, { resetForm }) => {
      setOpen(false);
      resetForm();
    },
  });

  return (
    <>
      <Toaster />
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        PaperProps={{
          component: "div",
        }}
        maxWidth="xs"
        style={{ padding: "2rem", overflow: "hidden" }}
      >
        <h2 className="font-bold text-center font-poppins text-[#303841] text-[2rem] mt-10 mb-6 px-12">
          Purshasing department agent permissions
        </h2>
        <DialogContent style={{ paddingBottom: 0 }}>
          <form onSubmit={formik.handleSubmit}>
            {permissions.map((permission) => (
              <SelectPermission>{permission}</SelectPermission>
            ))}
            <DialogActions>
              <div className="flex items-center justify-center w-full mb-8 pt-[10px]">
                <DiscardButton
                  onClick={handleClose}
                  onDiscard={formik.resetForm}
                  color="#858D9D"
                  bg="white"
                >
                  Discard
                </DiscardButton>
                <SubmitButton>Confirm</SubmitButton>
              </div>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      {children}
    </>
  );
}

export default PermissionToRole;
