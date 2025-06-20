import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Select, MenuItem, IconButton } from "@mui/material";
import { Button } from "@material-tailwind/react";

import DiscardButton from "../../ui/DiscardButton";
import axios from "axios";
import SubmitButton from "../../ui/SubmitButtonGreen";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import React, { useState, useEffect } from "react";
import SearchBar from "../../ui/SearchBar";
import Filters from "../../assets/Filters.png";
import { cookies } from "../../authentification/Login";

function AddSheet({ open, handleClose, children }) {
  const table_header = ["Select", "Products"];

  const { id } = useSelector((state) => state.user);

  const handleSelect = (index) => {
    setSelectedIndex(index);
  };

  const renderSelectIcon = (index) => {
    return (
      <IconButton onClick={() => handleSelect(index)}>
        {selectedIndex === index ? (
          <CheckCircleIcon style={{ color: "blue" }} />
        ) : (
          <RadioButtonUncheckedIcon style={{ color: "grey" }} />
        )}
      </IconButton>
    );
  };

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [table_rows, setTableRows] = useState(
    products.map((product) => product.designation)
  );
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/service-achat/Produit/listcreate/"
        );
        setProducts(response.data);
      } catch (error) {
        setError("An error occurred while fetching product data.");
        console.error("Error fetching product data:", error);
      }
    }

    fetchProducts();
  }, []);

  console.log(id);

  const handleSubmit = async () => {
    const selectedProduct = products[selectedIndex];

    const order = {
      produit_id: selectedProduct.id,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/magasinier/fichemouvement/",
        order,
        {
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
          },
        }
      );
      console.log("Order submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting order:", error);
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
          New movement sheet
        </h2>
        <DialogContent>
          <div className="mb-4 flex items-center justify-center">
            <div className="w-20"></div>
            <div className="relative justify-center">
              <SearchIcon
                color="disabled"
                fontSize="large"
                className="absolute left-4 top-3"
              />
              <input
                type="text"
                placeholder="Search"
                aria-label="Search"
                className="rounded-[10px] bg-slate-100 py-4 px-20 border-none placeholder:font-poppins text-[12px]
    focus:outline-1 outline-offset-0 focus:outline-[#2185D5] max-[375px]:width-[100%]"
                onChange={(e) => {
                  const searchValue = e.target.value.toLowerCase();
                  const filteredProducts = products.filter((product) =>
                    product.designation.toLowerCase().includes(searchValue)
                  );
                  setTableRows(
                    filteredProducts.map((product) => product.designation)
                  );
                }}
              />
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
              {table_rows.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell>{renderSelectIcon(rowIndex)}</TableCell>

                  {/* Second column: Products */}
                  <TableCell
                    style={{ fontSize: "1.2rem", fontFamily: "poppins" }}
                  >
                    {row}
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
              Generate
            </button>
          </div>
        </DialogActions>
      </Dialog>
      {children}
    </>
  );
}

export default AddSheet;
