import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { IconButton, Select, MenuItem } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DiscardButton from "../../ui/DiscardButton";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { modifyBonDeCommande } from "../AchatSlice";
import { useSelector, useDispatch } from "react-redux";

function NewExternalPurchaseOrder({ open, handleClose, setOpen, children }) {
  const table_header = ["Check", "Products", "Quantity", "Unit price"];
  const [checkedRows, setCheckedRows] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [unitPrices, setUnitPrices] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [articles, setArticles] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedArticle, setSelectedArticle] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [error, setError] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const dispatch = useDispatch();
  const { bondecommandes } = useSelector((state) => state.achat);

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

    async function fetchSuppliers() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/fournisseur/listcreate/"
        );
        setSuppliers(response.data);
      } catch (error) {
        setError("An error occurred while fetching supplier data.");
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
    fetchArticles();
    fetchSuppliers();
    fetchProducts();
    fetchChapters();
  });

  const handleCheck = (index) => {
    const updatedCheckedRows = [...checkedRows];
    updatedCheckedRows[index] = !updatedCheckedRows[index];
    setCheckedRows(updatedCheckedRows);
  };

  const handleIncrease = (index) => {
    const updatedQuantities = [...quantities];
    updatedQuantities[index]++;
    setQuantities(updatedQuantities);
  };

  const handleDecrease = (index) => {
    const updatedQuantities = [...quantities];
    if (updatedQuantities[index] > 1) {
      updatedQuantities[index]--;
      setQuantities(updatedQuantities);
    }
  };

  const handleChapterChange = (event) => {
    setSelectedChapter(event.target.value);
  };

  const handleArticleChange = (event) => {
    setSelectedArticle(event.target.value);
    const newFilteredProducts = products.filter((product) =>
      product.articles.includes(event.target.value)
    );
    setUnitPrices(Array(newFilteredProducts.length).fill("0.00"));
    setFilteredProducts(newFilteredProducts);
    setCheckedRows(Array(newFilteredProducts.length).fill(false));
    setQuantities(Array(newFilteredProducts.length).fill(1));
  };

  const handleSupplierChange = (event) => {
    setSelectedSupplier(event.target.value);
  };
  const handleSubmit = async () => {
    setOpen(false);
    const selectedProducts = filteredProducts.filter(
      (product, index) => checkedRows[index]
    );

    const selectedPrices = unitPrices.filter(
      (price, index) => checkedRows[index]
    );

    const selectedQuantity = quantities.filter(
      (quantity, index) => checkedRows[index]
    );

    const order = {
      fournisseur: selectedSupplier,
      items: selectedProducts.map((product, index) => ({
        chapitre: selectedChapter,
        article: selectedArticle,
        produit: product.designation,
        prix_unitaire: selectedPrices[index],
        quantite: selectedQuantity[index],
      })),
      status: "pending",
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/service-achat/bondecommande/listcreate/",
        order
      );
      toast.success("Order submitted successfully", {
        className: "font-poppins text-[1.3rem] font-medium",
      });
      dispatch(modifyBonDeCommande([...bondecommandes, order]));
    } catch (error) {
      toast.error("Error submitting order", {
        className: "font-poppins text-[1.3rem] font-medium",
      });
    }
  };

  const filteredArticles = articles.filter(
    (article) => article.chapitre === selectedChapter
  );

  const table_rows = filteredProducts.map((product) => product.designation);

  const renderCheckIcon = (index) => {
    if (checkedRows[index]) {
      return (
        <IconButton onClick={() => handleCheck(index)}>
          <CheckCircleIcon color="primary" />
        </IconButton>
      );
    } else {
      return (
        <IconButton onClick={() => handleCheck(index)}>
          <RadioButtonUncheckedIcon color="disabled" />
        </IconButton>
      );
    }
  };

  return (
    <>
      <Toaster />
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          style: {
            maxWidth: "1200px", // Adjust the window width
            width: "100%",
            borderRadius: "10px",
          },
        }}
      >
        <h2
          className="font-bold text-center font-poppins text-[#303841] text-[2rem] mt-10 mb-6"
          style={{ fontFamily: "Poppins" }}
        >
          New external purchase order
        </h2>
        <DialogContent>
          <div
            className="mb-4"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            {/* Supplier selection */}
            <div>
              <p className="text-[12px] font-poppins mb-4">
                {" "}
                Select supplier :
              </p>
              <Select
                variant="outlined"
                value={selectedSupplier}
                onChange={handleSupplierChange}
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
                    fontFamily: "poppins",
                  },
                }}
              >
                {suppliers.map((supplier) => (
                  <MenuItem key={supplier.id} value={supplier.raison_sociale}>
                    {supplier.raison_sociale}
                  </MenuItem>
                ))}
              </Select>
            </div>
            {/* Chapter selection */}
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
            {/* Article selection */}
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
          <Table>
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
              {table_rows.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell>{renderCheckIcon(rowIndex)}</TableCell>
                  <TableCell
                    style={{ fontSize: "1.2rem", fontFamily: "poppins" }}
                  >
                    {row}
                  </TableCell>
                  <TableCell>
                    {checkedRows[rowIndex] ? (
                      <div className="text-[15px] font-poppins ">
                        <IconButton
                          onClick={() => handleDecrease(rowIndex)}
                          style={{
                            backgroundColor: "#F7FAFC",
                            border: "1px solid #E3E8EE",
                            borderRadius: "50%",
                            marginRight: "10px",
                          }}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <input
                          type="integer"
                          value={quantities[rowIndex]}
                          onChange={(e) => {
                            const newQuantities = [...quantities];
                            newQuantities[rowIndex] = e.target.value;
                            setQuantities(newQuantities);
                          }}
                          style={{
                            width: "60px",
                            borderRadius: "10px",
                            backgroundColor: "#F7FAFC",
                            border: "1px solid #E3E8EE",
                            padding: "5px 10px",
                            textAlign: "center",
                            fontFamily: "Poppins",
                          }}
                        />
                        <IconButton
                          onClick={() => handleIncrease(rowIndex)}
                          style={{
                            backgroundColor: "#F7FAFC",
                            border: "1px solid #E3E8EE",
                            borderRadius: "50%",
                            marginLeft: "10px",
                          }}
                        >
                          <AddIcon />
                        </IconButton>
                      </div>
                    ) : (
                      <div
                        style={{
                          textAlign: "start",
                          fontSize: "1.5rem",
                          fontFamily: "Poppins",
                        }}
                      >
                        -
                      </div>
                    )}
                  </TableCell>
                  <TableCell style={{ fontSize: "1.2rem" }}>
                    {checkedRows[rowIndex] ? (
                      <input
                        value={unitPrices[rowIndex]}
                        onChange={(e) => {
                          const newUnitPrices = [...unitPrices];
                          newUnitPrices[rowIndex] = e.target.value;
                          setUnitPrices(newUnitPrices);
                        }}
                        type="number"
                        className="focus:outline-[#888888] focus:text-[#888888]"
                        placeholder="0.00 DA"
                        style={{
                          borderRadius: "10px",
                          backgroundColor: "#F7FAFC",
                          border: "1px solid #E3E8EE",
                          padding: "10px 15px",
                          display: "inline-block",
                          fontFamily: "Poppins",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          textAlign: "start",
                          fontSize: "1.5rem",
                          fontFamily: "Poppins",
                        }}
                      >
                        -
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <div className="flex items-center justify-center w-full mb-8">
            <DiscardButton
              onClick={handleClose}
              style={{
                fontFamily: "Poppins",
              }}
            >
              Cancel
            </DiscardButton>
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

export default NewExternalPurchaseOrder;
