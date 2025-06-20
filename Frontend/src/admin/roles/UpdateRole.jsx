import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DiscardButton from "../../ui/DiscardButton";
import SubmitButton from "../../ui/SubmitButton";
import DialogContent from "@mui/material/DialogContent";
import Input from "../../ui/Input";
import { useFormik } from "formik";
import axiosInstance from "../../Services/AxiosInstance";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { modifyRoles } from "../AdminSlice";
import { useEffect, useState } from "react";

function UpdateRole({ open, handleClose, setOpen, id, children }) {
  const { roles } = useSelector((state) => state.admin);
  const [role, setRole] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchRoleInfo() {
      try {
        const response = await axiosInstance.get(`/role/rud/${id}`);
        setRole(response.data);
      } catch (error) {
        console.error("Error fetching role's data:", error);
      }
    }
    fetchRoleInfo();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      name: role.name,
    },
    onSubmit: (values) => {
      handleUpdateRole();
      setOpen(false);
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) errors.name = "Name required.";
      else if (
        !/^(?=(?:[^ ]* ){0,3}[^ ]*$)[a-zA-Z_:\s]{1,30}$/.test(values.name)
      )
        errors.name =
          "Name of role must contains only letters and maximum three spaces (Maximum 30 caracters).";
      return errors;
    },
  });

  useEffect(() => {
    if (Object.keys(role).length !== 0) {
      formik.setValues({
        name: role.name,
      });
    }
  }, [role]);

  function handleUpdateRole() {
    axiosInstance
      .patch(`/role/rud/${id}/`, {
        name: formik.values.name,
      })
      .then((res) => {
        if (res.status === 400) {
          // Afficher un message d'erreur si une erreur s'est produite
          toast.error("Role already exists", {
            className: "font-poppins text-[1.3rem] font-medium",
          });
        } else {
          // Sinon, afficher un message de succès
          dispatch(
            modifyRoles(
              roles.map((role) => {
                if (role.id === id) {
                  return {
                    ...role,
                    name: formik.values.name,
                  };
                } else {
                  return role;
                }
              })
            )
          );
          toast.success("Role updated successfully", {
            className: "font-poppins text-[1.3rem] font-medium",
          });
        }
      })
      .catch((error) => {
        // Gérer les erreurs de manière appropriée, si nécessaire
        console.error("Error updating role:", error);
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
              background: "rgba(0, 0, 0, 0.15)",
            },
          },
        }}
        maxWidth="xs"
      >
        <h2 className="font-bold text-center font-poppins text-[#303841] text-[2rem] mt-10 mb-6">
          Edit role information
        </h2>

        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Input
              type="text"
              id="name"
              placeholder="Name"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
            />

            {formik.touched.name && formik.errors.name ? (
              <p className="font-poppins font-bold text-red-700 ml-[5px]  mt-[-7px] mb-[12px]">
                {formik.errors.name}
              </p>
            ) : null}

            <DialogActions>
              <div className="flex items-center justify-center w-full mt-8">
                <DiscardButton onClick={handleClose} color="#858D9D" bg="white">
                  Discard
                </DiscardButton>
                <SubmitButton>Update role</SubmitButton>
              </div>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      {children}
    </>
  );
}

export default UpdateRole;
