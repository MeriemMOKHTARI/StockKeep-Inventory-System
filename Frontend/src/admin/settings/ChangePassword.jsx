import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DiscardButton from "../../ui/DiscardButton";
import SubmitButtonGreen from "../../ui/SubmitButtonGreen";
import DialogContent from "@mui/material/DialogContent";
import Input from "../../ui/Input";
import { useFormik } from "formik";
import axiosInstance from "../../Services/AxiosInstance";
import toast, { Toaster } from "react-hot-toast";

function ChangePassword({
  open,
  handleCloseChangePassword,
  children,
  setOpen,
}) {
  function handleChangePassword(values) {
    axiosInstance
      .post("/user/password-change/", {
        old_password: values.currentPassword,
        new_password: values.newPassword,
      })
      .then((res) => {
        if (res.status === 200)
          toast.success("Password updated successfully", {
            className: "font-poppins text-[1.3rem] font-medium",
          });
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400)
          toast.error("Incorrect current password", {
            className: "font-poppins text-[1.3rem] font-medium",
          });
      });
  }
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirm: "",
    },
    onSubmit: (values, { resetForm }) => {
      handleChangePassword(values);
      formik.resetForm();
      setOpen(false);
    },
    validate: (values) => {
      const errors = {};
      if (!values.currentPassword)
        errors.currentPassword = "Please enter your current password.";
      if (!values.newPassword)
        errors.newPassword = "Please enter the new password.";
      else if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
          values.newPassword
        )
      )
        errors.newPassword =
          "Password must contain at least 6 caracters which include one special caracter, one digit and one  uppercase letter.";
      if (!values.confirm) errors.confirm = "Please confirm the password.";
      else if (!(values.newPassword === values.confirm))
        errors.confirm = "Confirmation does not match with the password.";

      return errors;
    },
  });

  return (
    <>
      <Toaster />
      <Dialog
        open={open}
        onClose={handleCloseChangePassword}
        PaperProps={{
          component: "div",
        }}
        fullWidth
        maxWidth="xs"
      >
        <h2 className="font-bold text-center font-poppins text-[#303841] text-[2rem] mt-10 mb-6">
          Change password
        </h2>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Input
              type="password"
              placeholder="Current password"
              name="currentPassword"
              id="currentPassword"
              value={formik.values.currentPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.currentPassword && formik.errors.currentPassword ? (
              <p className="font-poppins font-bold text-red-700 ml-[5px]  mt-[-7px] mb-[12px]">
                {formik.errors.currentPassword}
              </p>
            ) : null}
            <Input
              type="password"
              placeholder="New password"
              name="newPassword"
              id="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.newPassword && formik.errors.newPassword ? (
              <p className="font-poppins font-bold text-red-700 ml-[5px]  mt-[-7px] mb-[12px]">
                {formik.errors.newPassword}
              </p>
            ) : null}
            <Input
              type="password"
              placeholder="Confirm password"
              name="confirm"
              id="confirm"
              value={formik.values.confirm}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.confirm && formik.errors.confirm ? (
              <p className="font-poppins font-bold text-red-700 ml-[5px]  mt-[-7px] mb-[12px]">
                {formik.errors.confirm}
              </p>
            ) : null}
            <DialogActions>
              <div className="flex items-center justify-center w-full">
                <DiscardButton
                  onClick={handleCloseChangePassword}
                  color="#858D9D"
                  bg="white"
                >
                  Discard
                </DiscardButton>
                <SubmitButtonGreen>Confirm</SubmitButtonGreen>
              </div>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      {children}
    </>
  );
}

export default ChangePassword;
