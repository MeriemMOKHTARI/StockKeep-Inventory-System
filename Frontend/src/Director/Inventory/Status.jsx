import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Select, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DiscardButton from "../../ui/DiscardButton";
import axios from "axios";
import SubmitButton from "../../ui/SubmitButtonGreen";

function Status({ statusId, open, handleClose, children }) {
  const table_header = [
    "Product",
    "Logical quantity",
    "Physical quantity",
    "Gap",
    "Observation",
  ];

  const [quantities, setQuantities] = useState([]);
  const [Observations, setObservations] = useState([]);
  const [status, setStatus] = useState([]);
  const [error, setError] = useState("");

  const id = statusId;
  console.log(id);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/directeur/etatinventaire/rud/${id}/`
        );
        setStatus(response.data.produits);
      } catch (error) {
        setError("An error occurred while fetching product data.");
        console.error("Error fetching product data:", error);
      }
    }

    fetchStatus();
  },[]);

  const handleSubmit = async (id) => {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/directeur/etatinventaire/rud/${id}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log("Status approuved successfully:", response.data);
    } catch (error) {
      console.error("Error approuving status:", error);
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
            maxWidth: "1200px",
            width: "100%",
            borderRadius: "20px",
          },
        }}
      >
        <h2 className="font-bold text-center font-poppins text-[#303841] text-[2rem] mt-10  ">
          Inventory status n°{statusId}
        </h2>
        <DialogContent>
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
              {status.map((product, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell
                    style={{ fontSize: "1.2rem", fontFamily: "poppins" }}
                  >
                    {product.produit}
                    {/* hed row badlah b IDrow wela li yjiblk l ids w definih lfog ga3 kima rek mdefini row  */}
                  </TableCell>

                  <TableCell
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: 500,
                      fontSize: "1.2rem",
                      color:
                        product.quantite_logique === product.quantite_physique
                          ? "green"
                          : "red",
                    }}
                  >
                    {product.quantite_logique}
                    {/* HEDA BCH TJIB PRODUCTS KIMA MWALAF  */}
                  </TableCell>

                  {/* Second column: Products */}
                  <TableCell
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: 500,
                      fontSize: "1.2rem",
                      color:
                        product.quantite_logique === product.quantite_physique
                          ? "green"
                          : "red",
                    }}
                  >
                    {product.quantite_physique}
                    {/* HEDA BCH TJIB PRODUCTS KIMA MWALAF  */}
                  </TableCell>
                  <TableCell
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: 500,
                      fontSize: "1.2rem",
                      color:
                        product.quantite_logique === product.quantite_physique
                          ? "green"
                          : "red",
                    }}
                  >
                    {product.ecrat}
                    {/* HEDA BCH TJIB PRODUCTS KIMA MWALAF  */}
                  </TableCell>
                  {/* Third column: Quantity requested */}
                  <TableCell
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: 500,
                      fontSize: "1.2rem",
                      color:
                        product.quantite_logique === product.quantite_physique
                          ? "black"
                          : "red",
                    }}
                  >
                    {product.observation}
                    {/* Heda row badlah b quantity_row wela bch tjib quantite */}
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
              type="submit"
              onClick={() => handleSubmit(id)}
            >
              Approuve
            </button>
          </div>
        </DialogActions>
      </Dialog>
      {children}
    </>
  );
}

export default Status;
