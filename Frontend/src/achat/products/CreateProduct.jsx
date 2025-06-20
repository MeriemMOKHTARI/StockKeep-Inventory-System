import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DiscardButton from "../../ui/DiscardButton";
import SubmitButton from "../../ui/SubmitButton";
import DialogContent from "@mui/material/DialogContent";
import Input from "../../ui/Input";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { modifyProducts, modifySelectedArticles } from "../AchatSlice";
import SelectArticles from "./SelectArticles";
import axiosInstance from "../../Services/AxiosInstance";

function CreateProduct({ open, handleClose, setOpen, children }) {
  const { articles, products, selectedArticles } = useSelector(
    (state) => state.achat
  );

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      designation: "",
      articles: "Articles",
      quantite_en_security: "",
    },
    onSubmit: async (values, { resetForm }) => {
      await handleAddProduct();
      setOpen(false);
      resetForm();
    },
    validate: (values) => {
      const errors = {};
      if (!values.designation) errors.designation = "Name required.";
      else if (!/^[a-zA-Z0-9][a-zA-Z0-9À-ÿ\s]{1,60}$/.test(values.designation)) 
        errors.designation = "Name of product Maximum 60 characters.";
      if (!values.quantite_en_security)
        errors.quantite_en_security = "Amount of security required.";
      else if (!/^-?\d*\.?\d+$/.test(values.quantite_en_security))
        errors.quantite_en_security = "Amount of security must be a number.";
      return errors;
    },
  });

  async function handleAddProduct() {
    try {
      const res = await axiosInstance.post("/service-achat/Produit/listcreate/", {
        designation: formik.values.designation,
        articles: selectedArticles,
        quantite_en_security: formik.values.quantite_en_security,
      });
      if (res.status === 201) {
        toast.success("Product added successfully", {
          className: "font-poppins text-[1.3rem] font-medium",
        });

        dispatch(
          modifyProducts([
            ...products,
            {
              designation: formik.values.designation,
              articles: "PC",
              quantite_en_security: selectedArticles.length,
            },
          ])
        );
        dispatch(modifySelectedArticles([]));
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error("Product already exists", {
          className: "font-poppins text-[1.3rem] font-medium",
        });
      }
    }
  }

  return (
    <>
      <Toaster />
      <Dialog
        open={open}
        onClose={handleClose}
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
              backgroundColor: "rgba(0, 0, 0, 0.4)",
            },
          },
        }}
        maxWidth="xs"
        fullWidth
      >
        <h2 className="font-bold text-center font-poppins text-[#303841] text-[2rem] mt-10 mb-6">
          Create new product
        </h2>
        <DialogContent style={{ paddingBottom: 0 }}>
          <form onSubmit={formik.handleSubmit}>
            <Input
              type="text"
              placeholder="Name"
              id="designation"
              name="designation"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.designation}
            />
            {formik.touched.designation && formik.errors.designation ? (
              <p className="font-poppins font-bold text-red-700 ml-[5px]  mt-[-7px] mb-[12px]">
                {formik.errors.designation}
              </p>
            ) : null}
            <SelectArticles
              items={articles}
              name="articles"
              id="articles"
              value={formik.values.articles}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.articles && formik.errors.articles ? (
              <p className="font-poppins font-bold text-red-700 ml-[5px] mt-[-0.3rem] mb-[7px]">
                {formik.errors.articles}
              </p>
            ) : null}

            <Input
              type="text"
              placeholder="Amount of security"
              id="quantite_en_security"
              name="quantite_en_security"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.quantite_en_security}
            />
            {formik.touched.quantite_en_security &&
            formik.errors.quantite_en_security ? (
              <p className="font-poppins font-bold text-red-700 ml-[5px]  mt-[-7px] mb-[12px]">
                {formik.errors.quantite_en_security}
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
                <SubmitButton>Add product</SubmitButton>
              </div>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      {children}
    </>
  );
}

export default CreateProduct;
