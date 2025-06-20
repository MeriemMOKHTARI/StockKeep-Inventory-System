import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Select, MenuItem, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DiscardButton from "../../ui/DiscardButton";
import axios from "axios";
import toast from "react-hot-toast";
import { modifyReceipts } from "../MagasinierSlice";
import { useSelector, useDispatch } from "react-redux";
import SearchReceipt from "./SearchReceipt";

function NewReceipt({ open, handleClose, children }) {
  const [quantities, setQuantities] = useState([]);
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const [selectedOrderItems, setSelectedOrderItems] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);
  const { receipts, query } = useSelector((state) => state.magasinier);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/service-achat/bondecommande/listcreate/"
        );
        setOrders(response.data);
        setQuantities(Array(response.data.length).fill(0));
        setSelectedOrderItems([]);
      } catch (error) {
        setError("An error occurred while fetching orders data.");
        console.error("Error fetching orders data:", error);
      }
    }
    fetchOrders();
  }, []);

  const handleOrderChange = (event) => {
    const orderId = event.target.value;
    const selectedOrder = orders.find((order) => order.id === orderId);
    if (selectedOrder) {
      setSelectedOrderItems(selectedOrder.items);
      setQuantities(Array(selectedOrder.items.length).fill(0));
    } else {
      setSelectedOrderItems([]);
      setQuantities([]);
    }
    setSelectedOrderId(orderId);
  };

  const handleIncrease = (index) => {
    const updatedQuantities = [...quantities];
    if (updatedQuantities[index] < selectedOrderItems[index].reste_a_livrer) {
      updatedQuantities[index]++;
      setQuantities(updatedQuantities);
    }
  };

  const handleDecrease = (index) => {
    const updatedQuantities = [...quantities];
    if (updatedQuantities[index] > 0) {
      updatedQuantities[index]--;
      setQuantities(updatedQuantities);
    }
  };

  const handlePdfChange = (event) => {
    setPdfFile(event.target.files[0]);
  };

  

  const handleSave = async () => {
    const receiptData = {
      bon_de_commande_id: selectedOrderId,
      items: selectedOrderItems.map((item, index) => ({
        nom_produit: item.produit,
        quantite_commandee: item.quantite,
        quantite_livree: quantities[index],
      })),
      facture: pdfFile || null,
    };
  
    const formData = new FormData();
    formData.append("bon_de_commande_id", selectedOrderId);
    formData.append("items", JSON.stringify(receiptData.items)); // Convert items to JSON string
    if (pdfFile) {
      formData.append("facture", pdfFile);
    }
  
    try {
      await axios.post(
        "http://127.0.0.1:8000/magasinier/bondereception/create/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(modifyReceipts([...receipts, receiptData]));
      toast.success("Receipt submitted successfully", {
        className: "font-poppins text-[1.3rem] font-medium",
      });
  
      handleClose(); // Close the dialog after successful submission
    } catch (error) {
      toast.error("Error submitting receipt", {
        className: "font-poppins text-[1.3rem] font-medium",
      });
      console.error("Error saving receipt:", error);
    }
  };
  

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          style: {
            maxWidth: "1000px",
            width: "100%",
            borderRadius: "20px",
          },
        }}
      >
        <h2 className="font-bold text-center font-poppins text-[#303841] text-[2rem] mt-10  ">
          New receipt
        </h2>
        <DialogContent>
          <div className="flex items-center justify-center ">
            <div>
              <label className="mb-2 text-[14px] font-poppins justify-center">
                Select order id :
              </label>
              <div className="flex justify-center items-center">
                <Select
                  variant="outlined"
                  value={selectedOrderId}
                  onChange={handleOrderChange}
                  className="w-[240px] h-[40px] bg-[#F7FAFC] border border-[#E3E8EE] rounded-full "
                  style={{
                    fontSize: "1.5rem",
                    fontFamily: "poppins",
                    color: "#8792A2",
                    borderRadius: "10px",
                    marginRight: "1rem",
                  }}
                  MenuProps={{
                    PaperProps: {
                      className: "font-poppins",
                    },
                  }}
                >
                  {orders
                    .filter((order) => order.status !== "completed") // Filter out completed orders
                    .map((order) => (
                      <MenuItem key={order.id} value={order.id}>
                        {order.id}
                      </MenuItem>
                    ))}
                </Select>
                {selectedOrderId && <SearchReceipt />}
              </div>
              {/* PDF Upload */}
              <div className="m-8">
              <label className="mx-5 text-[14px] fonts-poppins">Add facturation PDF file :</label>
                <input
                className="h-10 w-100 bg-blue"
                  type="file"
                  accept="application/pdf"
                  onChange={handlePdfChange}
                />
              </div>
            </div>
          </div>
          {/* Table */}
          <Table>
            {/* Table headers */}
            <TableHead>
              <TableRow>
                <TableCell
                  style={{ fontSize: "1.2rem", fontFamily: "poppins" }}
                >
                  Products
                </TableCell>
                <TableCell
                  style={{ fontSize: "1.2rem", fontFamily: "poppins" }}
                >
                  Quantity still to be delivered
                </TableCell>
                <TableCell
                  style={{ fontSize: "1.2rem", fontFamily: "poppins" }}
                >
                  Quantity received
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedOrderItems
                .filter((item) => item.produit.toString().startsWith(query))
                .map((item, index) => (
                  <TableRow key={index}>
                    {/* First column: Product name */}
                    <TableCell
                      style={{ fontSize: "1.2rem", fontFamily: "poppins" }}
                    >
                      {item.produit}
                    </TableCell>
                    {/* Second column: Quantity requested */}
                    <TableCell
                      style={{ fontSize: "1.5rem ", fontFamily: "poppins" }}
                    >
                      {item.reste_a_livrer}
                    </TableCell>
                    {/* Third column: Quantity received */}
                    <TableCell>
                      {item.reste_a_livrer === 0 ? (
                        "---"
                      ) : (
                        <>
                          <IconButton
                            onClick={() => handleDecrease(index)}
                            style={{
                              backgroundColor: "#F7FAFC",
                              border: "1px solid #E3E8EE",
                              borderRadius: "50%",
                              marginRight: "10px",
                            }}
                          >
                            <RemoveIcon />
                          </IconButton>
                          <span
                            style={{
                              fontSize: "1.5rem",
                              fontFamily: "poppins",
                            }}
                          >
                            {quantities[index]}
                          </span>
                          <IconButton
                            onClick={() => handleIncrease(index)}
                            disabled={
                              quantities[index] ===
                              selectedOrderItems[index].quantite
                            }
                            style={{
                              backgroundColor:
                                quantities[index] ===
                                selectedOrderItems[index].reste_a_livrer
                                  ? "rgba(255, 0, 0, 0.5)"
                                  : "rgba(0, 255, 0, 0.5)",
                              border: "1px solid #E3E8EE",
                              borderRadius: "50%",
                              marginRight: "10px",
                              marginLeft: "10px",
                            }}
                          >
                            <AddIcon />
                          </IconButton>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          {/* cancel & save buttons */}
          <div className="flex items-center justify-center w-full mb-8">
            <DiscardButton onClick={handleClose}>Cancel</DiscardButton>
            <button
              className="text-white bg-lime-600 rounded-[10px]  font-poppins py-4 w-[9rem] text-center ml-4"
              type="button"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </DialogActions>
      </Dialog>
      {children}
    </>
  );
}

export default NewReceipt;
