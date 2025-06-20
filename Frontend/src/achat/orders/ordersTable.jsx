import React, { useState, useEffect } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import PrintIcon from "../../assets/Print.png";
import deleteIcon from "../../assets/deleteIcon.png";
import Filters from "../../assets/Filters.png";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import ConfirmDelete from "../Delete";
import NewExternalPurchaseOrder from "./BonCommande";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { modifyBonDeCommande } from "../AchatSlice";

function OrdersTable() {
  const [open, setOpen] = useState(false);
  const { bondecommandes, searchQuery } = useSelector((state) => state.achat);
  const [orders, setOrders] = useState(bondecommandes);
  const [suppliers, setSuppliers] = useState([]);
  const [error, setError] = useState("");
  const [dummyState, setDummyState] = useState(false); // Dummy state for force re-render

  const dispatch = useDispatch();

  const TABLE_HEAD = ["ID", "Date", "Supplier", "Status", "More"];

  function handlePrint(orderId) {
    const pdfUrl = `http://127.0.0.1:8000/service-achat/bondecommande/${orderId}/pdf/`;

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
        link.setAttribute("download", `Bon_de _commande_n°${orderId}.pdf`);

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

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/service-achat/bondecommande/listcreate/"
        );

        setOrders(response.data);
      } catch (error) {
        setError("An error occurred while fetching order data.");
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

    fetchOrders();
    fetchSuppliers();
  }, [dummyState, bondecommandes]); // Update useEffect dependency to dummyState

  const supplierMap = new Map(
    suppliers.map((supplier) => [supplier.raison_sociale, supplier])
  );

  const onOrderDeleted = (orderId) => {
    dispatch(
      modifyBonDeCommande((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderId)
      )
    );
    // Update dummyState to force re-render
    setDummyState((prevState) => !prevState);
  };

  const [openD, setOpenD] = useState(null);

  return (
    <main className="table-container m-4 rounded-[11px] h-full overflow-hidden">
      <Toaster />
      <Card
        className="h-full w-full overflow-hidden rounded-[11px]"
        style={{ borderRadius: "20px !important" }}
      >
        <div className="ml-8 mr-12 mt-4 mb-8 flex items-center justify-between gap-8">
          <Typography
            color="blue-gray"
            style={{
              fontSize: "24px",
              color: "#444",
              fontFamily: "Poppins",
              fontWeight: 600,
            }}
          >
            Orders
          </Typography>
          <div className="flex items-center">
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "10px",
                padding: "8px",
                marginLeft: "8px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{ borderRadius: "10px", border: "1px solid #D0D3D9" }}
              >
                <Button
                  className="flex items-center gap-3 p-[8px]"
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
            <div
              style={{
                backgroundColor: "#2185D5",
                borderRadius: "10px",
                marginLeft: "8px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <NewExternalPurchaseOrder
                open={open}
                handleClose={() => setOpen(false)}
                setOpen={setOpen}
              >
                <Button
                  className="flex items-center gap-3 p-[8px]"
                  onClick={() => setOpen(true)}
                  style={{
                    color: "white",
                    fontFamily: "Poppins",
                    fontSize: "12px",
                    textTransform: "capitalize",
                  }}
                >
                  <ShoppingBasketOutlinedIcon
                    strokeWidth={2}
                    className="h-6 w-6"
                  />
                  New Order
                </Button>
              </NewExternalPurchaseOrder>
            </div>
          </div>
        </div>
        <div className="max-h-[calc(100vh-250px)] overflow-y-auto overflow-x-hidden">
          <table
            className="w-full min-w-max table-auto text-left  overflow-auto 
          max-h-[59vh]"
            style={{ fontSize: "14px", fontFamily: "Poppins", fontWeight: 100 }}
          >
            <thead className="relative z-[2] w-full bg-blue-gray-50">
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className={`border-b border-blue-gray-100 bg-blue-gray-50 p-4 sticky top-0  
                  bg-slate-100 ${index === 0 ? "pl-6" : ""} ${
                      index === 1 ? "pl-12" : index === 4 ? " pl-12" : ""
                    }`}
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none"
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
              {orders
                .filter(
                  (order) =>
                    order.id
                      ?.toString()
                      .toLowerCase()
                      .startsWith(searchQuery.toLowerCase()) ||
                    order.fournisseur
                      ?.toString()
                      .toLowerCase()
                      .startsWith(searchQuery.toLowerCase()) ||
                    order.status
                      ?.toString()
                      .toLowerCase()
                      .startsWith(searchQuery.toLowerCase()) ||
                    order.date
                      ?.toString()
                      .toLowerCase()
                      .startsWith(searchQuery.toLowerCase())
                )
                .map((order, index) => (
                  <React.Fragment key={order.id}>
                    <tr>
                      <td className="p-4 pl-6 w-[100px]">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          style={{
                            fontFamily: "Poppins",
                            fontWeight: 500,
                            color: "#48505E",
                          }}
                        >
                          {order.id}
                        </Typography>
                      </td>
                      <td className="p-4  mr-40 w-[200px]">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                          style={{
                            fontFamily: "Poppins",
                            fontWeight: 500,
                            color: "#48505E",
                          }}
                        >
                          {order.date}
                        </Typography>
                      </td>
                      <td className="p-4 w-[210px]">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                          style={{
                            fontFamily: "Poppins",
                            fontWeight: 500,
                            color: "#48505E",
                          }}
                        >
                          {supplierMap.get(order.fournisseur)?.raison_sociale ||
                            "Unknown Supplier"}
                        </Typography>
                      </td>
                      <td className="p-4 w-[200px]">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                          style={{
                            fontFamily: "Poppins",
                            fontWeight: 500,
                            color: "#48505E",
                          }}
                        >
                          {order.status}
                        </Typography>
                      </td>
                      <td className="p-4 pl-8 w-[200px]">
                        <div className="flex justify-start ">
                          <button
                            className="bg-white border border-blue-500 rounded-[6px] w-10 h-10 flex items-center justify-center mr-[1px]"
                            style={{
                              borderColor: "#D0D3D9",
                              marginLeft: "3px",
                            }}
                            onClick={() => handlePrint(order.id)}
                          >
                            <img
                              src={PrintIcon}
                              alt="Print"
                              className="h-5 w-5"
                            />
                          </button>

                          <ConfirmDelete
                            open={openD === order.id}
                            handleClose={() => setOpenD(null)}
                            concern="order"
                            orderId={order.id}
                            onOrderDeleted={onOrderDeleted}
                          >
                            <button
                              className="bg-white border border-blue-500 rounded-[6px] w-10 h-10 flex items-center justify-center mr-[1px]"
                              onClick={() => setOpenD(order.id)}
                              style={{
                                borderColor: "#D0D3D9",
                                marginLeft: "3px",
                              }}
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
                    {/* Divider */}
                    {index !== orders.length - 1 && (
                      <tr>
                        <td
                          colSpan="5"
                          className="border-t border-gray-200"
                        ></td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
            </tbody>
          </table>
        </div>
      </Card>
    </main>
  );
}

export default OrdersTable;
