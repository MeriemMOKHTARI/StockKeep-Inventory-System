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
import { modifyUsers } from "../AdminSlice";
import { useEffect, useState } from "react";

function CreateUser({ open, handleClose, setOpen, id, children }) {
  const { users } = useSelector((state) => state.admin);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const response = await axiosInstance.get(`/user/rud/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user's data:", error);
      }
    }
    fetchUserInfo();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      firstName: user.first_name,
      lastName: user.last_name,
      username: user.username,
      email: user.email,
    },
    onSubmit: (values) => {
      handleUpdateUser();
      setOpen(false);
    },
    validate: (values) => {
      const errors = {};
      if (!values.firstName) errors.firstName = "First name required";
      else if (
        !/^(?=(?:[^ ]* ){0,2}[^ ]*$)[a-zA-ZÀ-ÿ\s]{1,30}$/.test(values.firstName)
      )
        errors.firstName =
          "First name can contain only letters and maximum of two spaces (max 30 caracters).";

      if (!values.lastName) errors.lastName = "Last name required.";
      else if (!/^[a-zA-Z][a-zA-ZÀ-ÿ\s]{1,15}$/.test(values.lastName))
        errors.lastName = "Last name must contain only letters (maximum 15).";

      if (!values.username) errors.username = "Username required.";
      else if (
        !/^(?=(?:[^ ]* ){0,2}[^ ]*$)[^\n\r\t\v\f àé]{0,30}$/.test(
          values.username
        )
      )
        errors.username =
          "Username must contain maximum 30 carcters and maximum two spaces.";

      if (!values.email) errors.email = "Email required.";
      else if (!/^\w+([.-]?\w+)*@esi-sba\.dz$/.test(values.email))
        errors.email = "Invalid email.";

      return errors;
    },
  });

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      formik.setValues({
        firstName: user.first_name,
        lastName: user.last_name,
        username: user.username,
        email: user.email,
      });
    }
  }, [user]);

  function handleUpdateUser() {
    // Créer un tableau pour stocker toutes les requêtes PATCH
    const patchRequests = [];
    // Vérifier chaque champ et créer une requête PATCH si le champ a été modifié
    if (formik.values.username !== user.username) {
      patchRequests.push(
        axiosInstance.patch(`/user/rud/${id}/`, {
          username: formik.values.username,
        })
      );
    }
    if (formik.values.email !== user.email) {
      patchRequests.push(
        axiosInstance.patch(`/user/rud/${id}/`, {
          email: formik.values.email,
        })
      );
    }
    if (formik.values.firstName !== user.first_name) {
      patchRequests.push(
        axiosInstance.patch(`/user/rud/${id}/`, {
          first_name: formik.values.firstName,
        })
      );
    }
    if (formik.values.lastName !== user.last_name) {
      patchRequests.push(
        axiosInstance.patch(`/user/rud/${id}/`, {
          last_name: formik.values.lastName,
        })
      );
    }
    Promise.all(patchRequests)
      .then((responses) => {
        const hasError = responses.some((res) => res.status === 400);
        if (!hasError) {
          dispatch(
            modifyUsers(
              users.map((user) => {
                if (user.id === id) {
                  return {
                    ...user,
                    username: formik.values.username,
                    email: formik.values.email,
                    first_name: formik.values.firstName,
                    last_name: formik.values.lastName,
                  };
                } else {
                  return user;
                }
              })
            )
          );
          toast.success("User updated successfully", {
            className: "font-poppins text-[1.3rem] font-medium",
          });
        }
      })
      .catch((error) => {
        toast.error("User with these information already exists", {
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
          Edit user information
        </h2>

        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Input
              type="text"
              id="firstName"
              placeholder="First name"
              name="firstName"
              onChange={formik.handleChange}
              value={formik.values.firstName}
              onBlur={formik.handleBlur}
            />

            {formik.touched.firstName && formik.errors.firstName ? (
              <p className="font-poppins font-bold text-red-700 ml-[5px]  mt-[-7px] mb-[12px]">
                {formik.errors.firstName}
              </p>
            ) : null}
            <Input
              type="text"
              id="lastName"
              placeholder="Last name"
              name="lastName"
              onChange={formik.handleChange}
              value={formik.values.lastName}
              onBlur={formik.handleBlur}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <p className="font-poppins font-bold text-red-700 ml-[5px]  mt-[-7px] mb-[12px]">
                {formik.errors.lastName}
              </p>
            ) : null}

            <Input
              type="text"
              id="username"
              placeholder="Username"
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
              onBlur={formik.handleBlur}
            />
            {formik.touched.username && formik.errors.username ? (
              <p className="font-poppins font-bold text-red-700 ml-[5px]  mt-[-7px] mb-[12px]">
                {formik.errors.username}
              </p>
            ) : null}

            <Input
              type="email"
              id="email"
              placeholder="Email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="font-poppins font-bold text-red-700 ml-[5px]  mt-[-7px] mb-[12px]">
                {formik.errors.email}
              </p>
            ) : null}

            <DialogActions>
              <div className="flex items-center justify-center w-full mt-8">
                <DiscardButton onClick={handleClose} color="#858D9D" bg="white">
                  Discard
                </DiscardButton>
                <SubmitButton>Update user</SubmitButton>
              </div>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      {children}
    </>
  );
}

export default CreateUser;
