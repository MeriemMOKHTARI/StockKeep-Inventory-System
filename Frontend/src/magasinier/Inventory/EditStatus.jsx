import React, { useState, useEffect } from "react";
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

function EditStatus({ StatusId, open, handleClose, children }) {
  const table_header = [
    "ID",
    "Product",
    "N° inventory",
    "Logical quantity",
    "Physical quantity",
    "Observation",
  ];
  const [quantities, setQuantities] = useState([]);
  const [observations, setObservations] = useState([]);
  const [nInventaire, setNInventaire] = useState([]);
  const [error, setError] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedArticle, setSelectedArticle] = useState("");
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState({});

  const handleEdit = async (products) => {
    const statusData = {
      chapitre: selectedChapter,
      article: selectedArticle,
      produits: products.map((product, index) => ({
        produit: product.produit,
        N_inventaire:
          nInventaire[index] !== undefined
            ? nInventaire[index]
            : product.N_inventaire,
        quantite_physique:
          quantities[index] !== undefined
            ? quantities[index]
            : product.quantite_physique,
        observation:
          observations[index] !== undefined
            ? observations[index]
            : product.observation,
      })),
    };

    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/magasinier/etatinventaire/rud/${StatusId}/`,
        statusData
      );
      console.log("Status patched successfully:", response.data);
      handleClose();
    } catch (error) {
      console.error("Error patching status:", error);
    }
  };

  useEffect(() => {
    async function fetchStatus() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/magasinier/etatinventaire/rud/${StatusId}/`
        );
        const data = response.data;
        setStatus(data);
        setSelectedChapter(data.chapitre);
        setSelectedArticle(data.article);
        setProducts(data.produits);
        setNInventaire(data.produits.map((p) => p.N_inventaire));
        setQuantities(data.produits.map((p) => p.quantite_physique));
        setObservations(data.produits.map((p) => p.observation));
      } catch (error) {
        setError("An error occurred while fetching chapter data.");
        console.error("Error fetching chapter data:", error);
      }
    }

    if (StatusId) {
      fetchStatus();
    }
  }, [StatusId]);

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
          Inventory status n°{status.id}
        </h2>
        <div
          className="m-10"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div>
            <p className="text-[16px] font-poppins mb-4">{status.chapitre}</p>
          </div>
          <div className="w-10" />
          <div>
            <p className="text-[16px] font-poppins mb-4">{status.article}</p>
          </div>
        </div>
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
              {products.map((product, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell
                    style={{ fontSize: "1.2rem", fontFamily: "poppins" }}
                  >
                    {rowIndex + 1}
                  </TableCell>

                  {/* Second column: Products */}
                  <TableCell
                    style={{ fontSize: "1.2rem", fontFamily: "poppins" }}
                  >
                    {product.produit}
                  </TableCell>
                  <TableCell style={{ fontSize: "1.2rem" }}>
                    <input
                      defaultValue={product.N_inventaire}
                      onChange={(e) => {
                        const newNInventaire = [...nInventaire];
                        newNInventaire[rowIndex] = e.target.value;
                        setNInventaire(newNInventaire);
                      }}
                      type="text"
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
                  {/* Third column: Logical quantity */}
                  <TableCell
                    style={{ fontSize: "1.2rem", fontFamily: "poppins" }}
                  >
                    {product.quantite_logique}
                  </TableCell>

                  {/* 4th column: Physical quantity */}
                  <TableCell style={{ fontSize: "1.2rem" }}>
                    <input
                      defaultValue={product.quantite_physique}
                      onChange={(e) => {
                        const newQuantities = [...quantities];
                        newQuantities[rowIndex] = e.target.value;
                        setQuantities(newQuantities);
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
                  <TableCell style={{ fontSize: "1.2rem" }}>
                    <input
                      defaultValue={product.observation}
                      onChange={(e) => {
                        const newObservations = [...observations];
                        newObservations[rowIndex] = e.target.value;
                        setObservations(newObservations);
                      }}
                      type="text"
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
              type="submit"
              onClick={() => handleEdit(products)}
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

export default EditStatus;
