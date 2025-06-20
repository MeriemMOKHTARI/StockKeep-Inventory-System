import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DiscardButton from "../../ui/DiscardButton";
import SubmitButton from "../../ui/SubmitButton";
import DialogContent from "@mui/material/DialogContent";
import Input from "../../ui/Input";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "../../Services/AxiosInstance";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { modifyRoles } from "../AdminSlice";

function CreateRole({ open, handleClose, setOpen, children }) {
  /*const handleClickOpen = () => {
    setOpen(true);
  };*/

  const { roles } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values, { resetForm }) => {
      handleAddRole();
      setOpen(false);
      resetForm();
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) errors.name = "Name required.";
      else if (!/^[a-zA-Z][a-zA-ZÀ-ÿ\s]{1,15}$/.test(values.name))
        errors.name = "Name of role must contain only letters (Maximum 15)";
    },
  });

  function handleAddRole() {
    axiosInstance
      .post("/role/listcreate/", {
        name: formik.values.name,
      })
      .then((res) => {
        if (res.status === 201)
          toast.success("Role added successfully", {
            className: "font-poppins text-[1.3rem] font-medium",
          });
        dispatch(
          modifyRoles([
            ...roles,
            {
              name: formik.values.name,
            },
          ])
        );
      })
      .catch((err) => {
        if (err.response.status === 400)
          toast.error("Role already exists", {
            className: "font-poppins text-[1.3rem] font-medium",
          });
      });
  }

  return (
    <>
      <Toaster />
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        PaperProps={{
          component: "div",
          sx: {
            boxShadow: "none",
            "& .MuiBackdrop-root": { backgroundColor: "transparent" },
          },
        }}
        hideBackdrop={false}
        slotProps={{
          backdrop: {
            sx: {
              background: "rgba(0, 0, 0, 0.1)",
            },
          },
        }}
        maxWidth="xs"
      >
        <h2 className="font-bold text-center font-poppins text-[#303841] text-[2rem] mt-10 mb-6">
          Create new role
        </h2>
        <DialogContent style={{ paddingBottom: 0 }}>
          <form onSubmit={formik.handleSubmit}>
            <Input
              type="text"
              placeholder="Name"
              id="name"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <p className="font-poppins font-bold text-red-700 ml-[5px]  mt-[-7px] mb-[12px]">
                {formik.errors.name}
              </p>
            ) : null}
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
                <SubmitButton>Add role</SubmitButton>
              </div>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      {children}
    </>
  );
}

export default CreateRole;
