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
import { modifyStructures } from "../AdminSlice";
import { useEffect, useState } from "react";

function CreateUser({ open, handleClose, setOpen, id, children }) {
  const { structures } = useSelector((state) => state.admin);
  const [structure, setStructure] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchStructureInfo() {
      try {
        const response = await axiosInstance.get(`/structure/rud/${id}`);
        setStructure(response.data);
      } catch (error) {
        console.error("Error fetching user's data:", error);
      }
    }
    fetchStructureInfo();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      name: structure.name,
      abbreviation: structure.abbreviation,
      responsible: structure.responsible,
    },
    onSubmit: (values) => {
      handleUpdateStructure();
      setOpen(false);
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) errors.name = "Name required.";
      else if (
        !/^(?=(?:[^ ]* ){0,3}[^ ]*$)[a-zA-ZÀ-ÿ ]{1,30}$/.test(values.name)
      )
        errors.name =
          "Name of role must contains only letters and maximum three spaces (Maximum 30 caracters).";

      if (!values.abbreviation) errors.abbreviation = "Abbreviation required.";
      else if (!/^[a-zA-Z]{1,5}$/.test(values.abbreviation))
        errors.abbreviation =
          "Abbreviation must contains only letters (Maximum 5).";

      if (!values.responsible) errors.responsible = "Responsible required.";
      else if (!/^\w+([.-]?\w+)*@esi-sba\.dz$/.test(values.responsible))
        errors.responsible =
          "Responsible field must contains only letters and maximum 3 spaces (Maximum 40 caracters).";
      return errors;
    },
  });

  useEffect(() => {
    if (Object.keys(structure).length !== 0) {
      formik.setValues({
        name: structure.name || "",
        abbreviation: structure.abbreviation || "",
        responsible: structure.responsible || "",
      });
    }
  }, [structure]);

  function handleUpdateStructure() {
    // Créer un tableau pour stocker toutes les requêtes PATCH
    const patchRequests = [];
    // Vérifier chaque champ et créer une requête PATCH si le champ a été modifié
    if (formik.values.name !== structure.name) {
      patchRequests.push(
        axiosInstance.patch(`/structure/rud/${id}/`, {
          name: formik.values.name,
        })
      );
    }
    if (formik.values.abbreviation !== structure.abbreviation) {
      patchRequests.push(
        axiosInstance.patch(`/structure/rud/${id}/`, {
          abbreviation: formik.values.abbreviation,
        })
      );
    }
    if (formik.values.responsible !== structure.responsible) {
      patchRequests.push(
        axiosInstance.patch(`/structure/rud/${id}/`, {
          responsible: formik.values.responsible,
        })
      );
    }

    // Utiliser Promise.all pour attendre que toutes les requêtes se terminent
    Promise.all(patchRequests)
      .then((responses) => {
        // Vérifier si l'une des requêtes a retourné une erreur 400
        const hasError = responses.some((res) => res.status === 400);
        if (!hasError) {
          // Afficher un message d'erreur si une erreur s'est produite

          // Sinon, afficher un message de succès
          dispatch(
            modifyStructures(
              structures.map((structure) => {
                if (structure.id === id) {
                  return {
                    ...structure,
                    name: formik.values.name,
                    abbreviation: formik.values.abbreviation,
                    responsible: formik.values.responsible,
                  };
                } else {
                  return structure;
                }
              })
            )
          );
          toast.success("Structure updated successfully", {
            className: "font-poppins text-[1.3rem] font-medium",
          });
        }
      })
      .catch((error) => {
        toast.error("Structure already exists", {
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
              background: "rgba(0, 0, 0, 0.4)",
            },
          },
        }}
        maxWidth="xs"
      >
        <h2 className="font-bold text-center font-poppins text-[#303841] text-[2rem] mt-10 mb-6">
          Edit structure information
        </h2>

        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Input
              type="text"
              id="name"
              placeholder="Wording"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
            />

            {formik.touched.firstName && formik.errors.firstName ? (
              <p className="font-poppins font-bold text-red-700 ml-[5px]  mt-[-7px] mb-[12px]">
                {formik.errors.name}
              </p>
            ) : null}
            <Input
              type="text"
              id="abreviation"
              placeholder="Abbreviation"
              name="abbreviation"
              onChange={formik.handleChange}
              value={formik.values.abbreviation}
              onBlur={formik.handleBlur}
            />
            {formik.touched.abbreviation && formik.errors.abbreviation ? (
              <p className="font-poppins font-bold text-red-700 ml-[5px]  mt-[-7px] mb-[12px]">
                {formik.errors.abbreviation}
              </p>
            ) : null}

            <Input
              type="text"
              id="username"
              placeholder="Responsible"
              name="responsible"
              onChange={formik.handleChange}
              value={formik.values.responsible}
              onBlur={formik.handleBlur}
            />
            {formik.touched.responsible && formik.errors.responsible ? (
              <p className="font-poppins font-bold text-red-700 ml-[5px]  mt-[-7px] mb-[12px]">
                {formik.errors.responsible}
              </p>
            ) : null}
            <DialogActions>
              <div className="flex items-center justify-center w-full mt-8">
                <DiscardButton onClick={handleClose} color="#858D9D" bg="white">
                  Discard
                </DiscardButton>
                <SubmitButton>Update structure</SubmitButton>
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
