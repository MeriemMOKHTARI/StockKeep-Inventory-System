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
import { modifyChapters } from "../AchatSlice";

function CreateChapter({ open, handleClose, setOpen, children }) {
  const { chapters } = useSelector((state) => state.achat);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      libelle: "",
    },
    onSubmit: (values, { resetForm }) => {
      handleAddRole();
      setOpen(false);
      resetForm();
    },
    validate: (values) => {
      const errors = {};
      if (!values.libelle) errors.libelle = "Name required.";
      else if (!/^[a-zA-Z][a-zA-ZÀ-ÿ\s]{1,60}$/.test(values.libelle))
        errors.libelle =
          "Name of chapter must contain only letters (Maximum 60)";
      return errors;
    },
  });

  function handleAddRole() {
    axiosInstance
      .post("/service-achat/Chapitre/listcreate/", {
        libelle: formik.values.libelle,
      })
      .then((res) => {
        if (res.status === 201)
          toast.success("Chapter added successfully", {
            className: "font-poppins text-[1.3rem] font-medium",
          });
        dispatch(
          modifyChapters([
            ...chapters,
            {
              libelle: formik.values.libelle,
            },
          ])
        );
      })
      .catch((err) => {
        if (err.response.status === 400)
          toast.error("Chapter already exists", {
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
          Create new chapter
        </h2>
        <DialogContent style={{ paddingBottom: 0 }}>
          <form onSubmit={formik.handleSubmit}>
            <Input
              type="text"
              placeholder="Name"
              id="libelle"
              name="libelle"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.libelle}
            />
            {formik.touched.libelle && formik.errors.libelle ? (
              <p className="font-poppins font-bold text-red-700 ml-[5px]  mt-[-7px] mb-[12px]">
                {formik.errors.libelle}
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
                <SubmitButton>Add chapter</SubmitButton>
              </div>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      {children}
    </>
  );
}

export default CreateChapter;
