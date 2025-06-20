import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DiscardButton from "../../ui/DiscardButton";
import SubmitButton from "../../ui/SubmitButton";
import DialogContent from "@mui/material/DialogContent";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "../../Services/AxiosInstance";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  modifyAllPermissions,
  modifyPermissions,
  modifyRoles,
} from "../AdminSlice";

function CreatePermission({ open, handleClose, setOpen, children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axiosInstance.get(
          "http://127.0.0.1:8000/role/listcreate/"
        );
        dispatch(modifyRoles(response.data));
      } catch (error) {
        console.error("Error fetching roles data:", error);
      }
    };

    const fetchAllPermissions = async () => {
      try {
        const response = await axiosInstance.get(
          "http://127.0.0.1:8000/user/getallpermission/"
        );
        console.log(response.data.permissions);
        dispatch(modifyAllPermissions(response.data.permissions));
      } catch (error) {
        console.error("Error fetching permissions data:", error);
      }
    };

    fetchRoles();
    fetchAllPermissions();
  }, [dispatch]);

  const { roles, Allpermissions, permissions } = useSelector(
    (state) => state.admin
  );

  const formik = useFormik({
    initialValues: {
      role: "role",
      auth_permission: "permission",
    },
    onSubmit: (values, { resetForm }) => {
      handleAddPermission();
      setOpen(false);
      resetForm();
    },
    validate: (values) => {
      const errors = {};
      if (values.role === "role") errors.role = "Role required.";
      if (values.auth_permission === "permission")
        errors.auth_permission = "Permission required.";
      return errors;
    },
  });

  function handleAddPermission() {
    axiosInstance
      .post("/role/listcreatep/", {
        role: formik.values.role,
        auth_permission: formik.values.auth_permission,
      })
      .then((res) => {
        if (res.status === 201)
          toast.success("Permission added successfully", {
            className: "font-poppins text-[1.3rem] font-medium",
          });
        dispatch(
          modifyPermissions([
            ...permissions,
            {
              role: formik.values.role,
              auth_permission: formik.values.auth_permission,
            },
          ])
        );
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
        if (err.response.status === 400)
          toast.error("Permission already exists", {
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
        PaperProps={{
          component: "div",
        }}
        fullWidth
        maxWidth="xs"
        style={{ paddingBottom: 0 }}
      >
        <h2 className="font-bold text-center font-poppins text-[#303841] text-[2rem] mt-10 mb-6">
          Create new permission
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <select
              className="font-poppins outline-none px-6 py-6 rounded-[8px] w-full
            text-white text-[1.1re m] bg-[#2185D5] mb-10"
              name="role"
              id="role"
              value={formik.values.role}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            >
              <option value="role" disabled selected>
                Role
              </option>
              {roles
                .filter((role) => role.name !== "admin")
                .map((role) => (
                  <option value={role.name} key={role.id}>
                    {role.name}
                  </option>
                ))}
            </select>

            {formik.touched.role && formik.errors.role ? (
              <p className="font-poppins font-bold text-red-700 ml-[5px]  mt-[-20px] mb-[5px]">
                {formik.errors.role}
              </p>
            ) : null}

            <select
              className="font-poppins outline-none px-6 py-6 rounded-[8px] w-full
            text-white text-[1.1re m] bg-[#2185D5] mb-10"
              name="auth_permission"
              id="auth_permission"
              value={formik.values.auth_permission}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            >
              <option value="permission" disabled selected>
                Permission
              </option>
              {Allpermissions.map((permission) => (
                <option value={permission.codename} key={permission.codename}>
                  {permission.codename}
                </option>
              ))}
            </select>
            {formik.touched.auth_permission && formik.errors.auth_permission ? (
              <p className="font-poppins font-bold text-red-700 ml-[5px] mt-[-20px] mb-2">
                {formik.errors.auth_permission}
              </p>
            ) : null}
            <DialogActions style={{ paddingBottom: 0 }}>
              <div className="flex items-center justify-center w-full mb-0">
                <DiscardButton
                  onClick={handleClose}
                  color="#858D9D"
                  onDiscard={formik.resetForm}
                  bg="white"
                >
                  Discard
                </DiscardButton>
                <SubmitButton>Add permission</SubmitButton>
              </div>
            </DialogActions>
          </DialogContent>
        </form>
      </Dialog>
      {children}
    </>
  );
}

export default CreatePermission;
