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
import { modifyArticles } from "../AchatSlice";

function CreateArticle({ open, handleClose, setOpen, children }) {
  const { chapters, articles } = useSelector((state) => state.achat);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      designation: "",
      chapitre: "Chapter",
      tva: "",
    },
    onSubmit: (values, { resetForm }) => {
      handleAddArticle();
      setOpen(false);
      resetForm();
    },
    validate: (values) => {
      const errors = {};
      if (!values.designation) errors.designation = "Name required.";
      else if (!/^[a-zA-Z][a-zA-ZÀ-ÿ\s]{1,60}$/.test(values.designation))
        errors.designation =
          "Name of article must contain only letters (Maximum 60)";
      if (values.chapitre === "Chapter") errors.chapitre = "Chapter required.";
      if (!values.tva) errors.tva = "TVA required.";
      else if (!/\d\d$/.test(values.tva))
        errors.tva = "TVA must follow the pattern DD.";
      return errors;
    },
  });

  function handleAddArticle() {
    axiosInstance
      .post("/service-achat/Article/listcreate/", {
        designation: formik.values.designation,
        chapitre: formik.values.chapitre,
        tva: formik.values.tva,
      })
      .then((res) => {
        if (res.status === 201)
          toast.success("Article added successfully", {
            className: "font-poppins text-[1.3rem] font-medium",
          });
        dispatch(
          modifyArticles([
            ...articles,
            {
              designation: formik.values.designation,
              chapitre: formik.values.chapitre,
              tva: formik.values.tva,
            },
          ])
        );
      })
      .catch((err) => {
        if (err.response.status === 400)
          toast.error("Article already exists", {
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
          sx: {
            boxShadow: "none",
            "& .MuiBackdrop-root": { backgroundColor: "transparent" },
          },
        }}
        hideBackdrop={false}
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: `${"rgba(0, 0, 0, 0.4)"}`,
            },
          },
        }}
        maxWidth="xs"
        fullWidth
      >
        <h2 className="font-bold text-center font-poppins text-[#303841] text-[2rem] mt-10 mb-6">
          Create new article
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

            <select
              className="font-poppins outline-none px-6 py-6 rounded-[8px] w-full
            text-white text-[1.1rem] mb-4 bg-[#2185D5]"
              name="chapitre"
              id="chapitre"
              value={formik.values.chapitre}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            >
              <option value="Chapter" disabled selected>
                Chapter
              </option>
              {chapters.map((chapitre) => (
                <option value={chapitre.libelle} key={chapitre.id}>
                  {chapitre.libelle}
                </option>
              ))}
            </select>
            {formik.touched.chapitre && formik.errors.chapitre ? (
              <p className="font-poppins font-bold text-red-700 ml-[5px] mt-[-0.3rem] mb-[7px]">
                {formik.errors.chapitre}
              </p>
            ) : null}

            <Input
              type="text"
              placeholder="Name"
              id="tva"
              name="tva"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.tva}
            />
            {formik.touched.tva && formik.errors.tva ? (
              <p className="font-poppins font-bold text-red-700 ml-[5px]  mt-[-7px] mb-[12px]">
                {formik.errors.tva}
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
                <SubmitButton>Add Article</SubmitButton>
              </div>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      {children}
    </>
  );
}

export default CreateArticle;
