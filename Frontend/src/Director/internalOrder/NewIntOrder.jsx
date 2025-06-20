import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DiscardButton from "../../ui/DiscardButton";
import toast from "react-hot-toast";
import axios from "axios";
import React, { useState, useEffect } from "react";

function NewIntOrder({ orderId, open, handleClose, children }) {
  const table_header = [
    "N°",
    "Products",
    "Requested quantity",
    "Validated quantity by the responsable",
    "Validated quantity",
  ];
  const id = orderId.orderId;

  const [quantities, setQuantities] = useState([]);
  const [products, setProducts] = useState([]);
  const [object, setObject] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/directeur/bondecommandeinterne/rud/${id}/`
        );
        setProducts(response.data.items);
        setObject(response.data);
      } catch (error) {
        toast.error(`Error when modifying order: ${error.message}`, {
          className: "font-poppins text-[1.3rem] font-medium",
        });
      }
    }

    fetchProducts();
  }, [id]);

  const handleSubmit = async () => {
    handleClose();
    const order = {
      items: products.map((product, index) => ({
        produit: product.produit,
        quantite_accorde: quantities[index],
      })),
    };

    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/directeur/bondecommandeinterne/rud/${id}/`,
        order,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      toast.success("Order midified successfully", {
        className: "font-poppins text-[1.3rem] font-medium",
      });
      window.location.reload();
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
            maxWidth: "1000px",
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
            <div className="relative font-poppins text-[#303841] text-[16px] ">
              <span> {object.type}</span>
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
              {products.map((product, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell
                    style={{ fontSize: "1.2rem", fontFamily: "poppins" }}
                  >
                    {rowIndex + 1}
                    {/* hed row badlah b IDrow wela li yjiblk l ids w definih lfog ga3 kima rek mdefini row  */}
                  </TableCell>

                  {/* Second column: Products */}
                  <TableCell
                    style={{ fontSize: "1.2rem", fontFamily: "poppins" }}
                  >
                    {product.produit}
                    {/* HEDA BCH TJIB PRODUCTS KIMA MWALAF  */}
                  </TableCell>
                  {/* Third column: Quantity requested */}
                  <TableCell
                    style={{ fontSize: "1.2rem", fontFamily: "poppins" }}
                  >
                    {product.quantite_demandee}
                    {/* Heda row badlah b quantity_row wela bch tjib quantite */}
                  </TableCell>
                  <TableCell
                    style={{ fontSize: "1.2rem", fontFamily: "poppins" }}
                  >
                    {product.quantite_accorde}
                    {/* Heda row badlah b quantity_row wela bch tjib quantite */}
                  </TableCell>

                  {/* 4th column: Quantity validated */}
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
