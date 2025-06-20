import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DiscardButton from "../../ui/DiscardButton";
import SubmitButtonGreen from "../../ui/SubmitButtonGreen";
import DialogContent from "@mui/material/DialogContent";
import Input from "../../ui/Input";
import InputTwo from "../../ui/secondInput";
import ChangePassword from "./ChangePassword";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import axiosInstance from "../../Services/AxiosInstance";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "universal-cookie";
import { modifyFirstName, modifyLastName } from "../../admin/UserSlice";

const cookies = new Cookies();

function EditProfile({ open, handleClose, setOpen, children }) {
  const [image, setImage] = useState(cookies.get("image"));
  const firstName = cookies.get("firstname");
  const lastName = cookies.get("lastname");

  const [file, setFile] = useState(null);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const id = cookies.get("id");

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      firstName: firstName,
      lastName: lastName,
    },
    onSubmit: (values) => {
      handleEditProfile();
      setOpen(false);
    },
    validate: (values) => {
      const errors = {};
      if (!values.firstName) errors.firstName = "First name required";
      else if (
        !/^(?=(?:[^ ]* ){0,2}[^ ]*$)[a-zA-ZÀ-ÿ\s]{1,30}$/.test(values.firstName)
      )
        errors.firstName =
          "First name can contain only letters and maximum of two spaces (max 30 characters).";

      if (!values.lastName) errors.lastName = "Last name required.";
      else if (!/^[a-zA-Z][a-zA-ZÀ-ÿ\s]{1,15}$/.test(values.lastName))
        errors.lastName = "Last name must contain only letters (maximum 15).";
      return errors;
    },
  });

  function handleEditProfile() {
    const formData = new FormData();
    formData.append("first_name", formik.values.firstName);
    formData.append("last_name", formik.values.lastName);
    if (file) {
      formData.append("image", file);
    }

    axiosInstance
      .patch(`/user/rud/${id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((res) => {
        if (res.status === 400)
          toast.error("Chapter already exists", {
            className: "font-poppins text-[1.3rem] font-medium",
          });
        else {
          cookies.set("lastname", formik.values.lastName);
          cookies.set("firstname", formik.values.firstName);
          dispatch(modifyFirstName(formik.values.firstName));
          dispatch(modifyLastName(formik.values.lastName));
          if (file) {
            cookies.set("image", URL.createObjectURL(file));
          }
          toast.success("Profile updated successfully", {
            className: "font-poppins text-[1.3rem] font-medium",
          });
        }
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  }

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(URL.createObjectURL(selectedFile));
    setFile(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setImage(URL.createObjectURL(droppedFile));
    setFile(droppedFile);
  };

  const handleBrowseClick = () => {
    const inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.accept = "image/*";
    inputElement.click();

    inputElement.addEventListener("change", (event) => {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        setImage(URL.createObjectURL(selectedFile));
        setFile(selectedFile);
      }
    });
  };

  const handleOpenChangePassword = () => {
    setOpenChangePassword(true);
    setOpen(false);
    formik.setErrors({});
    formik.resetForm();
  };

  function handleCloseChangePassword() {
    setOpenChangePassword(false);
    setOpen(false);
    formik.setErrors({});
    formik.resetForm();
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
        <h2 className="font-bold text-center font-poppins text-[#303841] text-[22px] mt-[25px] ">
          Edit profile
        </h2>
        <DialogContent style={{ paddingBottom: 0 }}>
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <img
                src={image}
                alt="profile"
                className="rounded-full border-2 border-dashed border-gray-500 w-32 h-32 object-cover"
              />
              <input
                type="file"
                accept="image/*"
                id="image"
                name="image"
                onChange={handleImageChange}
                onBlur={formik.handleBlur}
                className="absolute inset-0 w-full h-full opacity-0"
              />
            </div>
            <div className="ml-8 flex flex-col items-center items-justify text-[22px]">
              <span className="text-base text-gray-500 font-poppins text-[14px] mb-1 ">
                Drag image here
              </span>
              <span className="text-base text-gray-500 font-poppins text-[14px] mb-1">
                or
              </span>
              <span
                className="text-base text-blue-500 cursor-pointer font-poppins text-[14px]"
                onClick={handleBrowseClick}
              >
                Browse image
              </span>
            </div>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <Input
              type="text"
              placeholder="First name"
              name="firstName"
              id="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <p className="font-poppins font-bold text-red-700 ml-[5px]  mt-[-7px] mb-[12px]">
                {formik.errors.firstName}
              </p>
            ) : null}
            <Input
              type="text"
              placeholder="Last name"
              name="lastName"
              id="lastName"
              value={formik.values.lastName}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <p className="font-poppins font-bold text-red-700 ml-[5px]  mt-[-7px] mb-[12px]">
                {formik.errors.lastName}
              </p>
            ) : null}
            <InputTwo onClick={handleOpenChangePassword} />
            <DialogActions>
              <div className="flex items-center justify-center w-full mb-8">
                <DiscardButton
                  onClick={() => {
                    handleClose();
                    formik.resetForm();
                  }}
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
      <ChangePassword
        open={openChangePassword}
        handleCloseChangePassword={handleCloseChangePassword}
        setOpen={setOpenChangePassword}
      />
      {children}
    </>
  );
}

export default EditProfile;
