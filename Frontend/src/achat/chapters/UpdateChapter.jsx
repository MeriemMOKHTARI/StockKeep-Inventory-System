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
import { modifyChapters } from "../AchatSlice";

function UpdateChapter({ open, handleClose, setOpen, id, children }) {
  const { chapters } = useSelector((state) => state.achat);
  const [chapter, setChapter] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchChapterInfo() {
      try {
        const response = await axiosInstance.get(
          `/service-achat/Chapitre/rud/${id}`
        );
        setChapter(response.data);
      } catch (error) {
        console.error("Error fetching chapter's data:", error);
      }
    }
    fetchChapterInfo();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      libelle: chapter.libelle,
    },
    onSubmit: (values) => {
      handleUpdateChapter();
      setOpen(false);
    },
    validate: (values) => {
      const errors = {};
      if (!values.libelle) errors.libelle = "Name required.";
      else if (!/^[a-zA-Z][a-zA-ZÀ-ÿ\s]{1,60}$/.test(values.libelle))
        errors.libelle =
          "Name of chapter must contain only letters (Maximum 60).";
      return errors;
    },
  });

  useEffect(() => {
    if (Object.keys(chapter).length !== 0) {
      formik.setValues({
        libelle: chapter.libelle,
      });
    }
  }, [chapter]);

  function handleUpdateChapter() {
    axiosInstance
      .patch(`http://127.0.0.1:8000/service-achat/Chapitre/rud/${id}/`, {
        libelle: formik.values.libelle,
      })
      .then((res) => {
        if (res.status === 400) {
          // Afficher un message d'erreur si une erreur s'est produite
          toast.error("Chapter already exists", {
            className: "font-poppins text-[1.3rem] font-medium",
          });
        } else {
          // Sinon, afficher un message de succès
          dispatch(
            modifyChapters(
              chapters.map((chapter) => {
                if (chapter.id === id) {
                  return {
                    ...chapter,
                    libelle: formik.values.libelle,
                  };
                } else {
                  return chapter;
                }
              })
            )
          );
          toast.success("Chapter updated successfully", {
            className: "font-poppins text-[1.3rem] font-medium",
          });
        }
      })
      .catch((error) => {
        // Gérer les erreurs de manière appropriée, si nécessaire
        console.error("Error updating chapter:", error);
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
              backgroundColor: `${"rgba(0, 0, 0, 0.1)"}`,
            },
          },
        }}
        maxWidth="xs"
        fullWidth
      >
        <h2 className="font-bold text-center font-poppins text-[#303841] text-[2rem] mt-10 mb-6">
          Edit chapter information
        </h2>

        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Input
              type="text"
              id="libelle"
              placeholder="Name"
              name="libelle"
              onChange={formik.handleChange}
              value={formik.values.libelle}
              onBlur={formik.handleBlur}
            />

            {formik.touched.libelle && formik.errors.libelle ? (
              <p className="font-poppins font-bold text-red-700 ml-[5px]  mt-[-7px] mb-[12px]">
                {formik.errors.libelle}
              </p>
            ) : null}

            <DialogActions>
              <div className="flex items-center justify-center w-full mt-8">
                <DiscardButton onClick={handleClose} color="#858D9D" bg="white">
                  Discard
                </DiscardButton>
                <SubmitButton>Update chapter</SubmitButton>
              </div>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      {children}
    </>
  );
}

export default UpdateChapter;
