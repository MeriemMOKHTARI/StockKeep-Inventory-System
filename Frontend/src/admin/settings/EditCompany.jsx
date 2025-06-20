import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DiscardButton from "../../ui/DiscardButton";
import SubmitButtonGreen from "../../ui/SubmitButtonGreen";
import DialogContent from "@mui/material/DialogContent";
import Input from "../../ui/Input";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "universal-cookie";
import axiosInstance from "../../Services/AxiosInstance";
import { useDispatch } from "react-redux";
import {
  modifyName,
  modifyCompanyImage,
  modifyCompanyTva,
  modifyCompanyEmail,
} from "../CompanySlice";

const cookies = new Cookies();
function EditCompany({ open, handleClose, setOpen, children }) {
  const [image, setImage] = useState(cookies.get("imageC"));
  const [file, setFile] = useState(null);
  const { companyName } = useSelector((state) => state.company);
  const dispatch = useDispatch();
  const companyEmail = cookies.get("companyEmail");
  const companyTva = cookies.get("companyTva");

  const formik = useFormik({
    initialValues: {
      name: companyName,
      email: companyEmail,
      tva: companyTva,
    },
    onSubmit: (values) => {
      handleEditCompany();
      setOpen(false);
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "Company's name required";
      } else if (
        !/^(?=(?:[^ ]* ){0,2}[^ ]*$)[a-zA-ZÀ-ÿ-\s]{1,30}$/.test(values.name)
      ) {
        errors.name =
          "Company's name can contain only letters and a maximum of two spaces (max 30 characters).";
      }

      if (!values.email) {
        errors.email = "Company's email required";
      } else if (
        !/^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/.test(values.email)
      ) {
        errors.email = "Company's email invalid.";
      }

      if (!values.tva) {
        errors.tva = "Company's tva required";
      } else if (!/^\d{2}$/.test(values.tva)) {
        errors.tva = "Company's TVA can contain only two digits.";
      }

      return errors;
    },
  });

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

  function handleEditCompany() {
    const formData = new FormData();
    formData.append("name", formik.values.name);
    if (file) {
      formData.append("logo", file);
    }

    axiosInstance
      .patch(`/user/entreprises/1/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 400)
          toast.error("Chapter already exists", {
            className: "font-poppins text-[1.3rem] font-medium",
          });
        else {
          cookies.set("name", formik.values.name);
          cookies.set("companyEmail", formik.values.email);
          cookies.set("companyTva", formik.values.tva);
          dispatch(modifyName(formik.values.name));
          dispatch(modifyCompanyEmail(formik.values.email));
          dispatch(modifyCompanyTva(formik.values.tva));
          if (file) {
            cookies.set("imageC", URL.createObjectURL(file));
            dispatch(modifyCompanyImage(URL.createObjectURL(file)));
          }
          toast.success("company updated successfully", {
            className: "font-poppins text-[1.3rem] font-medium",
          });
        }
      })
      .catch((error) => {
        console.error("Error updating company:", error);
      });
  }

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(URL.createObjectURL(selectedFile));
    setFile(selectedFile);
  };

  return (
    <>
      <Toaster />
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
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
              placeholder="Name"
              name="name"
              id="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name ? (
              <p className="font-poppins font-bold text-red-700 ml-[5px] mt-[-7px] mb-[12px]">
                {formik.errors.name}
              </p>
            ) : null}

            <Input
              type="text"
              placeholder="Email"
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="font-poppins font-bold text-red-700 ml-[5px] mt-[-7px] mb-[12px]">
                {formik.errors.email}
              </p>
            ) : null}

            <Input
              type="text"
              placeholder="TVA"
              name="tva"
              id="tva"
              value={formik.values.tva}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.tva && formik.errors.tva ? (
              <p className="font-poppins font-bold text-red-700 ml-[5px] mt-[-7px] mb-[12px]">
                {formik.errors.tva}
              </p>
            ) : null}

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
      {children}
    </>
  );
}

export default EditCompany;
