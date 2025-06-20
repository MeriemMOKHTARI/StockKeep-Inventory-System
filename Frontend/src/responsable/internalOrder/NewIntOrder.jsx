import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DiscardButton from "../../ui/DiscardButton";
import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { modifyOrdersResponsable } from "../RespoSlice";
import SearchBar from "./OrderSearch";

function NewIntOrder({ orderId, open, handleClose, children }) {
  const dispatch = useDispatch();
  const { query } = useSelector((state) => state.responsable);
  const table_header = [
    "N°",
    "Products",
    "Stock",
    "Requested quantity",
    "Validated quantity",
  ];
  const id = orderId.orderId;

  const [quantities, setQuantities] = useState([]);
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);
  const [object, setObject] = useState([]);
  const [error, setError] = useState("");
  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/service-achat/Produit/listcreate/"
        );
        setItems(response.data);
      } catch (error) {
        setError("An error occurred while fetching product data.");
        console.error("Error fetching product data:", error);
      }
    }

    async function fetchProducts() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/responsable/bondecommandeinterne/rud/${id}/`
        );
        setProducts(response.data.items);
        setObject(response.data);
      } catch (error) {
        setError("An error occurred while fetching product data.");
        console.error("Error fetching product data:", error);
      }
    }

    fetchItems();
    if (id) {
      fetchProducts();
    }
  }, [id]);

  useEffect(() => {
    if (items.length > 0 && products.length > 0) {
      const combined = products.map(product => {
        const item = items.find(i => i.designation === product.produit);
        return {
          ...product,
          quantite_en_stock: item ? item.quantite_en_stock : 'N/A',
        };
      });
      setCombinedData(combined);
    }
  }, [items, products]);

  const handleSubmit = async () => {
    handleClose();
    const order = {
      items: combinedData.map((product, index) => ({
        produit: product.produit,
        quantite_accorde: quantities[index],
      })),
    };

    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/responsable/bondecommandeinterne/rud/${id}/`,
        order,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      toast.success("Order modified successfully", {
        className: "font-poppins text-[1.3rem] font-medium",
      });
      dispatch(modifyOrdersResponsable(order));
    } catch (error) {
      toast.error("Error when modifying order", {
        className: "font-poppins text-[1.3rem] font-medium",
      });
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
            maxWidth: "800px",
            width: "100%",
            borderRadius: "20px",
          },
        }}
      >
        <h2 className="font-bold text-center font-poppins text-[#303841] text-[2rem] mt-10  ">
          Internal order n°{id}
        </h2>
        <DialogContent>
          <div className="mb-4 flex items-center justify-center">
            <div className="relative font-poppins text-[#303841] text-[16px] flex items-center gap-12">
              <span> {object.type}</span>
              <SearchBar style={{ position: "absolute", right: "0" }} />
            </div>
          </div>
          {/* Table */}
          <Table>
            {/* Table headers */}
            <TableHead>
              <TableRow>
                {table_header.map((header, index) => (
                  <TableCell
                    key={index}
                    style={{ fontSize: "1.3rem", fontFamily: "poppins" }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {combinedData
                .filter(
                  (product) =>
                    product.id.toString().toLowerCase().startsWith(query) ||
                    product.produit.toLowerCase().startsWith(query)
                )
                .map((product, rowIndex) => (
                  <TableRow key={rowIndex}>
                    <TableCell
                      style={{ fontSize: "1.2rem", fontFamily: "poppins" }}
                    >
                      {rowIndex + 1}
                    </TableCell>
                    <TableCell
                      style={{ fontSize: "1.2rem", fontFamily: "poppins" }}
                    >
                      {product.produit}
                    </TableCell>
                    <TableCell
                      style={{ fontSize: "1.2rem", fontFamily: "poppins" }}
                    >
                      {product.quantite_en_stock}
                    </TableCell>
                    <TableCell
                      style={{ fontSize: "1.2rem", fontFamily: "poppins" }}
                    >
                      {product.quantite_demandee}
                    </TableCell>
                    <TableCell style={{ fontSize: "1.2rem" }}>
                      <input
                        value={
                          quantities[rowIndex] !== undefined
                            ? quantities[rowIndex]
                            : product.quantite_accorde
                        }
                        onChange={(e) => {
                          const newQuantitie = [...quantities];
                          newQuantitie[rowIndex] = e.target.value;
                          setQuantities(newQuantitie);
                        }}
                        type="number"
                        className="focus:outline-[#888888] focus:text-[#888888]"
                        style={{
                          borderRadius: "10px",
                          backgroundColor: "#F7FAFC",
                          border: "1px solid #E3E8EE",
                          padding: "10px 15px",
                          display: "inline-block",
                          fontFamily: "Poppins",
                        }}
                      />
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
              onClick={handleSubmit}
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

export default NewIntOrder;
