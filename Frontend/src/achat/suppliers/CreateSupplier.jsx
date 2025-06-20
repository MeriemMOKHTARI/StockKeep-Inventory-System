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
import { modifySuppliers } from "../AchatSlice";

function CreateArticle({ open, handleClose, setOpen, children }) {
  const { suppliers } = useSelector((state) => state.achat);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      raison_sociale: "",
      adresse: "",
      telephone: "",
      fax: "",
      num_registre_commerce: "",
      rib_ou_rip: "",
      nif: "",
      nis: "",
    },
    onSubmit: (values, { resetForm }) => {
      handleAddSupplier();
      setOpen(false);
      resetForm();
    },
    validate: (values) => {
      const errors = {};
      if (!values.raison_sociale) errors.raison_sociale = "Name required.";
      else if (!/^[a-zA-Z][a-zA-ZÀ-ÿ\s]{1,60}$/.test(values.raison_sociale))
        errors.raison_sociale =
          "Raison sociale must contain only letters (Maximum 60)";
      if (values.adresse === "Chapter") errors.adresse = "Address required.";
      else if (!/^[a-zA-Z0-9À-ÿ\s]{1,80}$/.test(values.adresse))
        errors.adresse = "Address must contain only letters (Maximum 60)";
      if (!values.telephone) errors.telephone = "Phone number required.";
      else if (!/^0\d{9}$/.test(values.telephone))
        errors.telephone =
          "Phone number must contain 10 digits and start with 0";
      if (!values.fax) errors.fax = "Fax required.";
      if (!values.num_registre_commerce)
        errors.num_registre_commerce = "N registre de commerce required.";
      else if (!/^\d{1,}$/.test(values.num_registre_commerce))
        errors.num_registre_commerce =
          "N registre commerce must contain only numbers.";
      if (!values.rib_ou_rip) errors.rib_ou_rip = "RIB or RIP required.";
      else if (!/^\d{1,}$/.test(values.rib_ou_rip))
        errors.rib_ou_rip = "RIB or RIP must contain only numbers.";
      if (!values.nif) errors.nif = "NIF required.";
      else if (!/^\d{1,}$/.test(values.nif))
        errors.nif = "NIF must contain only numbers.";
      if (!values.nis) errors.NIS = "NIS required.";
      else if (!/^\d{1,}$/.test(values.nis))
        errors.nis = "NIS must contain only numbers.";
      return errors;
    },
  });

  function handleAddSupplier() {
    axiosInstance
      .post("/fournisseur/listcreate/", {
        raison_sociale: formik.values.raison_sociale,
        adresse: formik.values.adresse,
        telephone: formik.values.telephone,
        fax: formik.values.fax,
        num_registre_commerce: formik.values.num_registre_commerce,
        rib_ou_rip: formik.values.rib_ou_rip,
        nif: formik.values.nif,
        nis: formik.values.nis,
      })
      .then((res) => {
        if (res.status === 201)
          toast.success("Supplier added successfully", {
            className: "font-poppins text-[1.3rem] font-medium",
          });
        dispatch(
          modifySuppliers([
            ...suppliers,
            {
              raison_sociale: formik.values.raison_sociale,
              adresse: formik.values.adresse,
              telephone: formik.values.telephone,
              fax: formik.values.fax,
              num_registre_commerce: formik.values.num_registre_commerce,
              rib_ou_rip: formik.values.rib_ou_rip,
              nif: formik.values.nif,
              nis: formik.values.nis,
            },
          ])
        );
      })
      .catch((err) => {
        if (err.response.status === 400)
          toast.error("Supplier already exists", {
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
          Create new supplier
        </h2>
        <DialogContent style={{ paddingBottom: 0 }}>
          <form onSubmit={formik.handleSubmit}>
            <Input
              type="text"
              placeholder="Raison sociale"
              id="raison_sociale"
              name="raison_sociale"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.raison_sociale}
            />
            {formik.touched.raison_sociale && formik.errors.raison_sociale ? (
              <p className="font-poppins font-bold text-red-700 ml-[5px]  mt-[-7px] mb-[12px]">
                {formik.errors.raison_sociale}
              </p>
            ) : null}

            <Input
              type="text"
              placeholder="Addres"
              id="adresse"
              name="adresse"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.adresse}
            />
            {formik.touched.adresse && formik.errors.adresse ? (
              <p className="font-poppins font-bold text-red-700 ml-[5px] mt-[-0.3rem] mb-[7px]">
                {formik.errors.adresse}
              </p>
            ) : null}

            <Input
              type="text"
              placeholder="Phone number"
              id="telephone"
              name="telephone"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.telephone}
            />
            {formik.touched.telephone && formik.errors.telephone ? (
              <p className="font-poppins font-bold text-red-700 ml-[5px]  mt-[-7px] mb-[12px]">
                {formik.errors.telephone}
              </p>
            ) : null}

            <Input
              type="text"
              placeholder="FAX"
              id="fax"
              name="fax"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.fax}
            />
            {formik.touched.fax && formik.errors.fax ? (
              <p className="font-poppins font-bold text-red-700 ml-[5px]  mt-[-7px] mb-[12px]">
                {formik.errors.fax}
              </p>
            ) : null}

            <Input
              type="text"
              placeholder="N registre commerce"
              id="num_registre_commerce"
              name="num_registre_commerce"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.num_registre_commerce}
            />
            {formik.touched.num_registre_commerce &&
            formik.errors.num_registre_commerce ? (
              <p className="font-poppins font-bold text-red-700 ml-[5px]  mt-[-7px] mb-[12px]">
                {formik.errors.num_registre_commerce}
              </p>
            ) : null}

            <Input
              type="text"
              placeholder="RIB or RIP"
              id="rib_ou_rip"
              name="rib_ou_rip"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.rib_ou_rip}
            />
            {formik.touched.rib_ou_rip && formik.errors.rib_ou_rip ? (
              <p className="font-poppins font-bold text-red-700 ml-[5px]  mt-[-7px] mb-[12px]">
                {formik.errors.rib_ou_rip}
              </p>
            ) : null}

            <Input
              type="text"
              placeholder="NIF"
              id="nif"
              name="nif"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.nif}
            />
            {formik.touched.nif && formik.errors.nif ? (
              <p className="font-poppins font-bold text-red-700 ml-[5px]  mt-[-7px] mb-[12px]">
                {formik.errors.nif}
              </p>
            ) : null}

            <Input
              type="text"
              placeholder="NIS"
              id="nis"
              name="nis"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.nis}
            />
            {formik.touched.nis && formik.errors.nis ? (
              <p className="font-poppins font-bold text-red-700 ml-[5px]  mt-[-7px] mb-[12px]">
                {formik.errors.nis}
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
                <SubmitButton>Add supplier</SubmitButton>
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
