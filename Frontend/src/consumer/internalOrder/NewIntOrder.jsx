import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector, useDispatch } from "react-redux";
import { Select, MenuItem, IconButton } from "@mui/material";
import toast from "react-hot-toast";
import DiscardButton from "../../ui/DiscardButton";
import axios from "axios";
import Cookies from "universal-cookie";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import React, { useState } from "react";
import { modifyOrders } from "../ConusmerSlice";

const cookies = new Cookies();
function NewIntOrder({ open, handleClose, children }) {
  const table_header = ["Check", "Products","Quantity"];
  const [searchValue, setSearchValue] = useState("");
  const id = cookies.get("id");
  const { products } = useSelector((state) => state.achat);
  const { orders } = useSelector((state) => state.consumer);
  const dispatch = useDispatch();
  const handleCheck = (index) => {
    const updatedCheckedRows = [...checkedRows];
    updatedCheckedRows[index] = !updatedCheckedRows[index];
    setCheckedRows(updatedCheckedRows);
  };

  const renderCheckIcon = (index) => {
    if (checkedRows[index]) {
      return (
        <IconButton onClick={() => handleCheck(index)}>
          <CheckCircleIcon style={{ color: "blue" }} />
        </IconButton>
      );
    } else {
      return (
        <IconButton onClick={() => handleCheck(index)}>
          <RadioButtonUncheckedIcon style={{ color: "grey" }} />
        </IconButton>
      );
    }
  };

  const [checkedRows, setCheckedRows] = useState([]);
  const [quantities, setQuantities] = useState([]);
  // const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [table_rows, setTableRows] = useState(products);
  const [selectedType, setSelectedType] = useState("");

  /*useEffect(() => {
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
  }, []);*/

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleSubmit = async () => {
    handleClose();
    const selectedProducts = products.filter(
      (product, index) => checkedRows[index]
    );
    const selectedQuantity = quantities.filter(
      (quantity, index) => checkedRows[index]
    );

    // const UserID = localStorage.getItem("UserID");

    const order = {
      user_id: id,
      items: selectedProducts.map((product, index) => ({
        produit: product.designation,
        quantite_demandee: selectedQuantity[index],
      })),
      type: selectedType === "discharge" ? "Decharge" : "Supply",
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/consom/bondecommandeinterne/listcreate/",
        order,
        {
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
          },
        }
      );
      toast.success("Order submitted successfully", {
        className: "font-poppins text-[1.3rem] font-medium",
      });
      dispatch(modifyOrders([...orders, order]));
      window.reload();
    } catch (error) {
      console.log(error);
      
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
          New internal order
        </h2>
        <DialogContent>
          <div className="mb-4 flex items-center justify-center">
            <div className="relative">
              <Select
                onChange={handleTypeChange}
                value={selectedType}
                variant="outlined"
                style={{
                  height: "37px",
                  width: "220px",
                  backgroundColor: "#F1F5F9",
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
                <MenuItem value="supply">Supply request</MenuItem>
                <MenuItem value="discharge">Discharge request</MenuItem>
              </Select>
            </div>
            <div className="w-20"></div>
            <div className="relative">
              <SearchIcon
                color="disabled"
                fontSize="large"
                className="absolute left-4 top-3"
              />
              <input
                type="text"
                placeholder="Search"
                aria-label="Search"
                className="rounded-[10px] font-poppins font-normal bg-slate-100 py-4 px-20 border-none placeholder:font-poppins text-[12px]
                 focus:outline-1 outline-offset-0 focus:outline-[#2185D5] max-[375px]:width-[100%]"
                onChange={(e) => {
                  setSearchValue(e.target.value.toLowerCase());
                  //const searchValue = e.target.value.toLowerCase();
                  /*const filteredProducts = products.filter((product) =>
                    product.designation.toLowerCase().startsWith(searchValue)
                  );*/
                  /* setTableRows(
                    products
                      .filter((product) =>
                        product.designation
                          .toLowerCase()
                          .startsWith(searchValue)
                      )
                      .map((product) => product.designation)
                  );*/
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
              {products
                .filter((product) =>
                  product.designation.toLowerCase().startsWith(searchValue)
                )
                .map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    <TableCell>{renderCheckIcon(rowIndex)}</TableCell>

                    {/* Second column: Products */}
                    <TableCell
                      style={{ fontSize: "1.2rem", fontFamily: "poppins" }}
                    >
                      {row.designation}
                    </TableCell>
                    

                    {/* Third column: Quantity requested */}
                    <TableCell style={{ fontSize: "1.2rem" }}>
                      {checkedRows[rowIndex] ? (
                        <input
                          max={row.quantite_en_stock}
                          min={0}
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
                            width: "100px",
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
          {/* cancel & save buttons */}
          <div className="flex items-center justify-center w-full mb-8">
            <DiscardButton onClick={handleClose}>Cancel</DiscardButton>
            <button
              className="text-white bg-lime-600 rounded-[10px]  font-poppins py-4 w-[9rem] text-center ml-4"
              onClick={handleSubmit}
              type="button"
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
