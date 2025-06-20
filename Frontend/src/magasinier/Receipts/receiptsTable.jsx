import React, { useState, useEffect } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import modifyIcon from "../../assets/modifyIcon.png";
import PrintIcon from "../../assets/Print.png";
import deleteIcon from "../../assets/deleteIcon.png";
import Filters from "../../assets/Filters.png";
import NewReceipt from "./newReceipt";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import axios from "axios";
import ConfirmDelete from "../../magasinier/Delete";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

function ReceiptsTable() {
  function handlePrint(receiptId) {
    const pdfUrl = `http://127.0.0.1:8000/magasinier/bondereception/${receiptId}/pdf/`;

    axios({
      url: pdfUrl,
      method: "GET",
      responseType: "blob", // Important: responseType must be 'blob' to handle binary data (like PDF)
    })
      .then((response) => {
        // Create a blob from the response data
        const blob = new Blob([response.data], { type: "application/pdf" });

        // Create a temporary URL for the blob
        const url = window.URL.createObjectURL(blob);

        // Create a temporary link element
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `Bon_de _réception_n°${receiptId}.pdf`);

        // Append the link to the body
        document.body.appendChild(link);

        // Programmatically click the link to trigger the download
        link.click();

        // Cleanup: remove the temporary link and URL
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading PDF:", error);
        // Handle error
      });
  }

  const TABLE_HEAD = ["ID", "ID order", "Date", "Order status", "More"];

  const { receipts } = useSelector((state) => state.magasinier);
const [receiptss, setReceipts] = useState(receipts || []);
  const [open, setOpen] = useState(false);
  const [openD, setOpenD] = useState(false);
  const [error, setError] = useState("");
  const [orders, setOrders] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const { searchQuery } = useSelector((state) => state.admin);

  const onReceiptDeleted = (receiptId) => {
    setReceipts((prevReceipts) =>
      prevReceipts.filter((receipt) => receipt.id !== receiptId)
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenD = () => {
    setOpenD(true);
  };

  const handleCloseD = () => {
    setOpenD(false);
  };

  useEffect(() => {
    async function fetchReceipts() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/magasinier/bondereception/list/"
        );
        setReceipts(response.data.sort((a, b) => b.id - a.id) || []);
      } catch (error) {
        setError("An error occurred while fetching receipt data.");
        console.error("Error fetching receipt data:", error);
      }
    }

    async function fetchOrders() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/service-achat/bondecommande/listcreate/"
        );
        setOrders(response.data);
      } catch (error) {
        setError("An error occurred while fetching order data.");
        console.error("Error fetching order data:", error);
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
        console.error("Error fetching supplier data:", error);
      }
    }

    fetchReceipts();
    fetchOrders();
    fetchSuppliers();
  }, []);

  // Function to get supplier name based on order ID
  const getSupplierName = (orderId) => {
    const order = orders.find((order) => order.id === orderId);
    if (order) {
      return order.status;
    }
    return "";
  };
  const handleFacture = (FactureURL) => {
    window.open(FactureURL);
  };

  return (
    <>
      <Toaster />
      <main className="table-container m-4 h-full rounded-[11px]">
        <Card className="max-h-screen w-full overflow-auto rounded-[11px]">
          <div className="ml-8 mr-12 mt-4 mb-8 flex items-center justify-between gap-8 ">
            <Typography
              color="blue-gray"
              className="text-[24px] font-semibold font-poppins text-[#444444]"
            >
              Receipt
            </Typography>
            <div className="flex items-center">
              <div className="bg-white rounded-[10px] p-[8px] ml-[8px] flex items-center">
                <div className="rounded-[10px] border border-gray-300">
                  <Button
                    className="flex items-center gap-3 p-[8px] text-[#5D6679] font-poppins"
                    style={{
                      color: "#5D6679",
                      fontFamily: "Poppins",
                      fontSize: "12px",
                      textTransform: "capitalize",
                    }}
                  >
                    <img src={Filters} alt="FilterIcon" className="h-6 w-6" />
                    Filters
                  </Button>
                </div>
              </div>
              <div className="bg-blue-500 rounded-[10px] ml-[8px] flex items-center">
                <NewReceipt
                  open={open}
                  handleClose={handleClose}
                  setOpen={setOpen}
                >
                  <Button
                    className="flex items-center gap-3 p-[8px] text-white font-poppins text-[14px]"
                    onClick={handleClickOpen}
                    style={{
                      color: "#ffffff",
                      fontFamily: "Poppins",
                      fontSize: "12px",
                      textTransform: "capitalize",
                    }}
                  >
                    <FeedOutlinedIcon strokeWidth={2} className="h-6 w-6" />
                    New receipt
                  </Button>
                </NewReceipt>
              </div>
            </div>
          </div>
          <table
            className="w-full ml-6 min-w-max table-auto text-left"
            style={{ fontSize: "14px", fontFamily: "Poppins", fontWeight: 100 }}
          >
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="leading-none opacity-70 font-poppins font-medium"
                      style={{
                        fontFamily: "Poppins",
                        fontWeight: 600,
                        color: "#48505E",
                      }}
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {receiptss?.filter(
                (receipt) =>
                  receipt.id
                    ?.toString()
                    .toLowerCase()
                    .startsWith(searchQuery) ||
                  receipt.bon_de_commande
                    .toString()
                    .startsWith(searchQuery) ||
                  getSupplierName(receipt.bon_de_commande).startsWith(
                    searchQuery
                  )
              ).map((receipt) => (
                <tr key={receipt.id}>
                  <td className="border-b border-blue-gray-50 p-4 w-[200px]">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-poppins font-medium text-[#48505E]"
                      style={{
                        fontFamily: "Poppins",
                        fontWeight: 500,
                        color: "#48505E",
                      }}
                    >
                      {receipt.id}
                    </Typography>
                  </td>
                  <td className="border-b border-blue-gray-50 p-4 w-[200px]">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-poppins font-medium text-[#48505E]"
                      style={{
                        fontFamily: "Poppins",
                        fontWeight: 500,
                        color: "#48505E",
                      }}
                    >
                      {receipt.bon_de_commande}
                    </Typography>
                  </td>
                  <td className="border-b border-blue-gray-50 p-4 w-[210px] mr-2">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-poppins font-medium text-[#48505E]"
                      style={{
                        fontFamily: "Poppins",
                        fontWeight: 500,
                        color: "#48505E",
                      }}
                    >
                      {receipt.date}
                    </Typography>
                  </td>
                  <td className="border-b border-blue-gray-50 p-4 w-[200px] mr-2">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-poppins font-medium text-[#48505E]"
                      style={{
                        fontFamily: "Poppins",
                        fontWeight: 500,
                        color: "#48505E",
                      }}
                    >
                      {getSupplierName(receipt.bon_de_commande)}
                    </Typography>
                  </td>
                  <td className="border-b border-blue-gray-50 p-4 w-[200px]">
                    <div className="flex justify-start">
                      { receipt.facture != null ?
                      <button
                        className="border rounded-[9px] bg-[#2185d5] w-[100px] h-14 flex items-center justify-center mr-[3px]"
                        onClick={() => handleFacture(receipt.facture)}
                      >
                        <p className="text-white">Facture</p>
                      </button> : "" }



                      <button
                        className="border rounded-[9px]  w-14 h-14 flex items-center justify-center mr-[3px]"
                        onClick={() => handlePrint(receipt.id)}
                      >
                        <img
                          src={PrintIcon}
                          alt="Print"
                          className="h-5 w-5"
                        />
                      </button>
  
                      <ConfirmDelete
                        open={openD === receipt.id}
                        handleClose={() => setOpenD(null)}
                        concern="receipt"
                        orderId={receipt.id} // Change this to receiptId
                        onReceiptDeleted={onReceiptDeleted}
                      >
                        <button
                          className="border rounded-[9px] w-14 h-14 flex items-center justify-center"
                          onClick={() => setOpenD(receipt.id)}
                        >
                          <img
                            src={deleteIcon}
                            alt="Delete"
                            className="h-5 w-5"
                          />
                        </button>
                      </ConfirmDelete>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </main>
    </>
  );
}

export default ReceiptsTable;
