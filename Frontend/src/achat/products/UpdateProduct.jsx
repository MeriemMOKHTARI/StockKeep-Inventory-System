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
import { useEffect, useState } from "react";
import { modifyProducts, modifySelectedArticles } from "../AchatSlice";
import UpdateArticles from "./UpdateArticles";

function UpdateArticle({ open, handleClose, setOpen, id, children }) {
  const { articles, products, selectedArticles } = useSelector(
    (state) => state.achat
  );
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();

  const [articlesOfProduct, setArticlesOfProduct] = useState([]);

  useEffect(() => {
    async function fetchProductInfo() {
      try {
        const response = await axiosInstance.get(
          `/service-achat/Produit/rud/${id}`
        );
        setProduct(response.data);
        // setArticlesOfProduct(response.data.articles);
        dispatch(modifySelectedArticles(response.data.articles));
      } catch (error) {
        console.error("Error fetching product's data:", error);
      }
    }
    fetchProductInfo();
  }, [id, dispatch]);

  const formik = useFormik({
    initialValues: {
      designation: product.designation,
      articles: articlesOfProduct,
      quantite_en_security: product.quantite_en_security,
    },
    onSubmit: (values, { resetForm }) => {
      handleUpdateProduct();
      setOpen(false);
      resetForm();
    },
    validate: (values) => {
      const errors = {};
      if (!values.designation) errors.designation = "Name required.";
      else if (!/^[a-zA-Z0-9][a-zA-Z0-9À-ÿ\s]{1,60}$/.test(values.designation))
        errors.designation =
          "Name of product must contain only letters (Maximum 60)";
      if (!values.quantite_en_security)
        errors.quantite_en_security = "Amount of security required.";
      else if (!/^-?\d*\.?\d+$/.test(values.quantite_en_security))
        errors.quantite_en_security = "Amount of security must be a number.";
      return errors;
    },
  });
  useEffect(() => {
    if (Object.keys(product).length !== 0) {
      formik.setValues({
        designation: product.designation,
        chapitre: articlesOfProduct,
        quantite_en_security: product.quantite_en_security,
      });
    }
  }, [product]);

  function handleUpdateProduct() {
    console.log({
      designation: formik.values.designation,
      articles: selectedArticles,
      quantite_en_security: formik.values.quantite_en_security,
    });
    axiosInstance
      .patch(`http://127.0.0.1:8000/service-achat/Produit/rud/${id}/`, {
        designation: formik.values.designation,
        articles: selectedArticles,
        quantite_en_security: formik.values.quantite_en_security,
      })
      .then((res) => {
        if (res.status === 400) {
          // Afficher un message d'erreur si une erreur s'est produite
          toast.error("Product already exists", {
            className: "font-poppins text-[1.3rem] font-medium",
          });
        } else {
          // Sinon, afficher un message de succès
          dispatch(
            modifyProducts(
              products.map((article) => {
                if (article.id === id) {
                  return {
                    ...product,
                    designation: formik.values.designation,
                    articles: selectedArticles,
                    quantite_en_security: formik.values.quantite_en_security,
                  };
                } else {
                  return product;
                }
              })
            )
          );
          dispatch(modifySelectedArticles([]));
          toast.success("Product updated successfully", {
            className: "font-poppins text-[1.3rem] font-medium",
          });
        }
      })
      .catch((error) => {
        // Gérer les erreurs de manière appropriée, si nécessaire
        console.error("Error updating article", error);
      });
  }

  return (
    <>
      {console.log(selectedArticles)}
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
              backgroundColor: `${"rgba(0, 0, 0, 0.3)"}`,
            },
          },
        }}
        maxWidth="xs"
        fullWidth
      >
        <h2 className="font-bold text-center font-poppins text-[#303841] text-[2rem] mt-10 mb-6">
          Edit product
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

            <UpdateArticles items={articles} />
            {formik.touched.chapitre && formik.errors.chapitre ? (
              <p className="font-poppins font-bold text-red-700 ml-[5px] mt-[-0.3rem] mb-[7px]">
                {formik.errors.chapitre}
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
                <SubmitButton>Edit product</SubmitButton>
              </div>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      {children}
    </>
  );
}

export default UpdateArticle;
