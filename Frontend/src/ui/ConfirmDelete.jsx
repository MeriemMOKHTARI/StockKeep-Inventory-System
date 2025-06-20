import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DiscardButton from "../ui/DiscardButton";
import SubmitButtonRed from "../ui/SubmitButtonRed";
import axiosInstance from "../Services/AxiosInstance";
import {
  modifyUsers,
  modifyConsumers,
  modifyStructures,
  modifyRoles,
  modifyPermissions,
} from "../admin/AdminSlice";
import { modifyOrders } from "../consumer/ConusmerSlice";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import {
  modifyChapters,
  modifyArticles,
  modifyProducts,
  modifySuppliers,
} from "../achat/AchatSlice";

function ConfirmDelete({ open, id, handleClose, children, concern }) {
  const { users, consumers, structures, roles, permissions } = useSelector(
    (state) => state.admin
  );
  const { chapters, articles, products, suppliers } = useSelector(
    (state) => state.achat
  );
  const { orders } = useSelector((state) => state.consumer);
  const dispatch = useDispatch();

  function handleDeleteUser() {
    switch (concern) {
      case "user":
        axiosInstance
          .delete(`http://127.0.0.1:8000/user/rud/${id}`)
          .then((res) => {
            handleClose(); // Close dialog after successful deletion
            if (res.status === 204)
              dispatch(modifyUsers(users.filter((user) => user.id !== id)));
            toast.success("User deleted successfully", {
              className: "font-poppins text-[1.3rem] font-medium",
            });
          })
          .catch((err) => console.error(err));
        break;

      case "consumer":
        axiosInstance
          .delete(`http://127.0.0.1:8000/consom/rud/${id}`)
          .then((res) => {
            handleClose(); // Close dialog after successful deletion
            if (res.status === 204)
              dispatch(
                modifyConsumers(
                  consumers.filter((consumer) => consumer.id !== id)
                )
              );
            toast.success("Consumer deleted successfully", {
              className: "font-poppins text-[1.3rem] font-medium",
            });
          })
          .catch((err) => console.error(err));
        break;

      case "structure":
        axiosInstance
          .delete(`http://127.0.0.1:8000/structure/rud/${id}`)
          .then((res) => {
            handleClose(); // Close dialog after successful deletion
            if (res.status === 204)
              dispatch(
                modifyStructures(
                  structures.filter((structure) => structure.id !== id)
                )
              );
            toast.success("Structure deleted successfully", {
              className: "font-poppins text-[1.3rem] font-medium",
            });
          })
          .catch((err) => {
            handleClose();
            if (err.response.status === 400)
              toast.error("There is a consumer who belong to this structure", {
                className: "font-poppins text-[1.3rem] font-medium",
              });
          });
        break;

      case "role":
        axiosInstance
          .delete(`http://127.0.0.1:8000/role/rud/${id}`)
          .then((res) => {
            handleClose(); // Close dialog after successful deletion
            if (res.status === 204)
              dispatch(modifyRoles(roles.filter((role) => role.id !== id)));
            toast.success("Role deleted successfully", {
              className: "font-poppins text-[1.3rem] font-medium",
            });
          })
          .catch((err) => {
            handleClose();
            if (err.response.status === 400)
              toast.error("There is a user with this role", {
                className: "font-poppins text-[1.3rem] font-medium",
              });
          });
        break;

      case "permission":
        axiosInstance
          .delete(`http://127.0.0.1:8000/role/perm/rud/${id}`)
          .then((res) => {
            handleClose(); // Close dialog after successful deletion
            if (res.status === 204)
              dispatch(
                modifyPermissions(permissions.filter((per) => per.id !== id))
              );
            toast.success("Permission deleted successfully", {
              className: "font-poppins text-[1.3rem] font-medium",
            });
          })
          .catch((err) => console.error(err));
        break;
      case "chapter":
        axiosInstance
          .delete(`http://127.0.0.1:8000/service-achat/Chapitre/rud/${id}`)
          .then((res) => {
            handleClose(); // Close dialog after successful deletion
            if (res.status === 204)
              dispatch(modifyChapters(chapters.filter((c) => c.id !== id)));
            toast.success("Chapter deleted successfully", {
              className: "font-poppins text-[1.3rem] font-medium",
            });
          })
          .catch((err) => console.error(err));
        break;
      case "article":
        axiosInstance
          .delete(`http://127.0.0.1:8000/service-achat/Article/rud/${id}`)
          .then((res) => {
            handleClose(); // Close dialog after successful deletion
            if (res.status === 204)
              dispatch(modifyArticles(articles.filter((a) => a.id !== id)));
            toast.success("Article deleted successfully", {
              className: "font-poppins text-[1.3rem] font-medium",
            });
          })
          .catch((err) => console.error(err));
        break;
      case "product":
        axiosInstance
          .delete(`http://127.0.0.1:8000/service-achat/Produit/rud/${id}`)
          .then((res) => {
            handleClose(); // Close dialog after successful deletion
            if (res.status === 204)
              dispatch(modifyProducts(products.filter((p) => p.id !== id)));
            toast.success("Product deleted successfully", {
              className: "font-poppins text-[1.3rem] font-medium",
            });
          })
          .catch((err) => console.error(err));
        break;
      case "supplier":
        axiosInstance
          .delete(`http://127.0.0.1:8000/fournisseur/rud/${id}`)
          .then((res) => {
            handleClose(); // Close dialog after successful deletion
            if (res.status === 204)
              dispatch(modifySuppliers(suppliers.filter((s) => s.id !== id)));
            toast.success("Supplier deleted successfully", {
              className: "font-poppins text-[1.3rem] font-medium",
            });
          })
          .catch((err) => console.error(err));
        break;

      case "order":
        axiosInstance
          .delete(`http://127.0.0.1:8000/consom/bondecommandeinterne/rud/${id}`)
          .then((res) => {
            handleClose(); // Close dialog after successful deletion
            if (res.status === 204)
              dispatch(modifyOrders(orders.filter((o) => o.id !== id)));
            toast.success("Order deleted successfully", {
              className: "font-poppins text-[1.3rem] font-medium",
            });
          })
          .catch((err) => console.error(err));
        break;
      default:
        console.log("error");
    }
  }

  return (
    <>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            boxShadow: "none",
          },
        }}
      />
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
              backgroundColor: `${
                concern === "user" || concern === "role"
                  ? "rgba(0,0,0,0.1)"
                  : concern === "chapter" || concern === "product"
                  ? "rgba(0,0,0,0.1)"
                  : concern === "article"
                  ? "rgba(0, 0, 0, 0.04)"
                  : "rgba(0, 0, 0, 0.2)"
              }`,
            },
          },
        }}
        maxWidth="xs"
      >
        <h2 className="font-bold text-center font-poppins text-[#303841] text-[2rem] mt-10 mb-6 mx-32">
          Are you sure you want to delete this {concern} ?
        </h2>
        <DialogActions>
          <div className="flex items-center justify-center w-full mb-8">
            <DiscardButton onClick={handleClose} color="#858D9D" bg="white">
              Discard
            </DiscardButton>
            <SubmitButtonRed onClick={handleDeleteUser} color="#FF4747">
              Confirm
            </SubmitButtonRed>
          </div>
        </DialogActions>
      </Dialog>
      {children}
    </>
  );
}

export default ConfirmDelete;
