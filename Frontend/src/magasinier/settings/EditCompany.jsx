import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DiscardButton from "../../ui/DiscardButton";
import SubmitButtonGreen from "../../ui/SubmitButtonGreen";
import DialogContent from "@mui/material/DialogContent";
import Input from "../../ui/Input";
import ProfileImage from "../../assets/company.jpg";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "universal-cookie";

const cookies = new Cookies();
function EditCompany({ open, handleClose, setOpen, children }) {
  const [image, setImage] = useState(ProfileImage);
  //const dispatch = useDispatch();
  const { companyName } = useSelector((state) => state.company);
  const formik = useFormik({
    initialValues: {
      name: companyName,
    },
    onSubmit: (values) => {
      //API CALL TO DO
      //dispatch(modifyName(formik.values.name));
      cookies.set("company", formik.values.name);
      toast.success("Profile updated successfully", {
        className: "font-poppins text-[1.3rem] font-medium",
      });
      setOpen(false);
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) errors.name = "Company's name required";
      else if (
        !/^(?=(?:[^ ]* ){0,2}[^ ]*$)[a-zA-ZÀ-ÿ\s]{1,30}$/.test(values.firstName)
      )
        errors.name =
          "Company's name can contain only letters and maximum of two spaces (max 30 caracters).";
      return errors;
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  /*const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setImage(URL.createObjectURL(file));
  };*/

  const handleBrowseClick = () => {
    const inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.accept = "image/*";
    inputElement.click();

    inputElement.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file) {
        setImage(URL.createObjectURL(file));
      }
    });
  };

  return (
    <>
      <Toaster />
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth
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
      >
        <h2 className="font-bold text-center font-poppins text-[#303841] text-[22px] mt-[25px] ">
          Edit company
        </h2>
        <DialogContent style={{ paddingBottom: 0 }}>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <img
                  src={image}
                  alt="profile"
                  className="border-2 border-dashed border-gray-500 w-32 h-32 object-cover rounded-[10px]"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
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
            <Input
              type="text"
              placeholder="Name"
              name="name"
              id="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name ? (
              <p className="font-poppins font-bold text-red-700 ml-[5px]  mt-[-7px] mb-[12px]">
                {formik.errors.name}
              </p>
            ) : null}
            <DialogActions>
              <div className="flex items-center justify-center w-full mb-8">
                <DiscardButton
                  onClick={() => {
                    handleClose();
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
      {children}
    </>
  );
}

export default EditCompany;
