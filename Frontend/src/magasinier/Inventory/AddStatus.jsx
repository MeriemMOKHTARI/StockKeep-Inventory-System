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
import { MenuItem } from "@mui/material";

function AddStatus({ open, handleClose, children }) {
  const table_header = [
    "ID",
    "Product",
    "N° inventory",
    "Logical quantity",
    "Physical quantity",
    "Observation",
  ];

  const [quantities, setQuantities] = useState([]);
  const [Observations, setObservations] = useState([]);
  const [NInventaire, setNInventaire] = useState([]);
  const [error, setError] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedArticle, setSelectedArticle] = useState("");
  const [chapters, setChapters] = useState([]);
  const [articles, setArticles] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSubmit = async () => {
    const status = {
      chapitre: selectedChapter,
      article: selectedArticle,
      produits: products.map((product, index) => ({
        produit: product.designation,
        N_inventaire:
          NInventaire[index] === undefined ? "----" : NInventaire[index],
        quantite_physique: quantities[index],
        observation:
          Observations[index] === undefined ? "----" : Observations[index],
      })),
    };
    console.log(status);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/magasinier/etatinventaire/listcreate/",
        status
      );
      console.log("Status posted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  useEffect(() => {
    async function fetchChapters() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/service-achat/Chapitre/listcreate/"
        );
        setChapters(response.data);
      } catch (error) {
        setError("An error occurred while fetching chapter data.");
        console.error("Error fetching chapter data:", error);
      }
    }

    async function fetchArticles() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/service-achat/Article/listcreate/"
        );
        setArticles(response.data);
      } catch (error) {
        setError("An error occurred while fetching article data.");
      }
    }

    async function fetchProducts() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/service-achat/Produit/listcreate/"
        );
        setProducts(response.data);
      } catch (error) {
        setError("An error occurred while fetching product data.");
      }
    }

    fetchChapters();
    fetchArticles();
    fetchProducts();
  }, []);

  const handleChapterChange = (event) => {
    setSelectedChapter(event.target.value);
  };

  const handleArticleChange = (event) => {
    setSelectedArticle(event.target.value);
    const newFilteredProducts = products.filter((product) =>
      product.articles.includes(event.target.value)
    );
    setFilteredProducts(newFilteredProducts);
    setQuantities(Array(newFilteredProducts.length).fill(1));
  };

  const filteredArticles = articles.filter(
    (article) => article.chapitre === selectedChapter
  );

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
          New Inventory status
        </h2>
        <div
          className="m-10"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div>
            <p className="text-[12px] font-poppins mb-4"> Select chapter :</p>
            <Select
              variant="outlined"
              value={selectedChapter}
              onChange={handleChapterChange}
              style={{
                width: "300px",
                backgroundColor: "#F7FAFC",
                border: "1px solid #E3E8EE",
                borderRadius: "10px",
                fontFamily: "poppins",
                fontSize: "1.2rem",
              }}
              MenuProps={{
                style: {
                  fontFamily: "Poppins",
                },
              }}
            >
              {chapters.map((chapter) => (
                <MenuItem key={chapter.id} value={chapter.libelle}>
                  {chapter.libelle}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="w-10" />
          <div>
            <p className="text-[12px] font-poppins mb-4"> Select article :</p>
            <Select
              variant="outlined"
              value={selectedArticle}
              onChange={handleArticleChange}
              style={{
                width: "300px",
                backgroundColor: "#F7FAFC",
                borderRadius: "10px",
                border: "1px solid #E3E8EE",
                fontFamily: "poppins",
                fontSize: "1.2rem",
              }}
              MenuProps={{
                style: {
                  fontFamily: "Poppins",
                },
              }}
            >
              {filteredArticles.map((article, index) => (
                <MenuItem
                  key={`${article.designation}-${article.chapitre}`}
                  value={article.designation}
                >
                  {article.designation}
                </MenuItem>
              ))}
            </Select>
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
              {filteredProducts.map((product, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell
                    style={{ fontSize: "1.2rem", fontFamily: "poppins" }}
                  >
                    {product.id}
                    {/* hed row badlah b IDrow wela li yjiblk l ids w definih lfog ga3 kima rek mdefini row  */}
                  </TableCell>

                  {/* Second column: Products */}
                  <TableCell
                    style={{ fontSize: "1.2rem", fontFamily: "poppins" }}
                  >
                    {product.designation}
                    {/* HEDA BCH TJIB PRODUCTS KIMA MWALAF  */}
                  </TableCell>
                  <TableCell style={{ fontSize: "1.2rem" }}>
                    <input
                      defaultValue="----"
                      onChange={(e) => {
                        const newNInventaire = [...NInventaire];
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
                  {/* Third column: Quantity requested */}
                  <TableCell
                    style={{ fontSize: "1.2rem", fontFamily: "poppins" }}
                  >
                    {product.quantite_en_stock}
                    {/* Heda row badlah b quantity_row wela bch tjib quantite */}
                  </TableCell>

                  {/* 4th column: Quantity validated */}
                  <TableCell style={{ fontSize: "1.2rem" }}>
                    <input
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
                  <TableCell style={{ fontSize: "1.2rem" }}>
                    <input
                      defaultValue="----"
                      onChange={(e) => {
                        const newObservation = [...Observations];
                        newObservation[rowIndex] = e.target.value;
                        setObservations(newObservation);
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

export default AddStatus;