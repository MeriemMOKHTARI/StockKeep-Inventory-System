import React, { useState, useEffect } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import PrintIcon from "../../assets/Print.png";
import Filters from "../../assets/Filters.png";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

function ExitVouchers() {
  const [orders, setOrders] = useState([]);

  const [error, setError] = useState("");
  const [dummyState, setDummyState] = useState(false); // Dummy state for force re-render

  const TABLE_HEAD = ["ID", "ID internal order", "Date", "Type", "More"];
  const { searchQuery } = useSelector((state) => state.admin);

  function handlePrint(orderId) {
    const pdfUrl = `http://127.0.0.1:8000/magasinier/bondesortie/${orderId}/pdf/`;

    axios({
      url: pdfUrl,
      method: "GET",
      responseType: "blob",
    })
      .then((response) => {
        // Create a blob from the response data
        const blob = new Blob([response.data], { type: "application/pdf" });

        // Create a temporary URL for the blob
        const url = window.URL.createObjectURL(blob);

        // Create a temporary link element
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `Bon_de _sortie_n°${orderId}.pdf`);

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
          "http://127.0.0.1:8000/magasinier/bondesortie/list/"
        );

        setOrders(response.data.sort((a, b) => b.id - a.id));
      } catch (error) {
        setError("An error occurred while fetching order data.");
        console.error("Error fetching order data:", error);
      }
    }

    fetchOrders();
  }, []); // Update useEffect dependency to dummyState

  const onOrderDeleted = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.id !== orderId)
    );
    // Update dummyState to force re-render
    setDummyState((prevState) => !prevState);
  };

  const [openD, setOpenD] = useState(null);

  return (
    <main className="table-container m-4 rounded-[11px] h-full overflow-hidden">
      <Toaster />
      <Card className="h-full w-full overflow-hidden rounded-[11px]">
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
            Exit vouchers
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
          </div>
        </div>
        <div className="max-h-[calc(100vh-250px)] overflow-y-auto overflow-x-hidden">
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
                    order.type === "Supply" &&
                    (order.id
                      .toString()
                      .toLowerCase()
                      .startsWith(searchQuery) ||
                      order.bon_de_commande_interne
                        .toString()
                        .toLowerCase()
                        .startsWith(searchQuery) ||
                      order.date.toLowerCase().startsWith(searchQuery) ||
                      order.type.toLowerCase().startsWith(searchQuery))
                )
                .map((order, index) => (
                  <React.Fragment key={order.id}>
                    <tr>
                      <td className="p-4 w-[200px]">
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
                          {order.bon_de_commande_interne}
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
                          {order.date}
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
                          {order.type}
                        </Typography>
                      </td>
                      <td className="p-4 w-[200px]">
                        <div className="flex justify-start ">
                          <button
                            className="border rounded-[15px]  w-20 h-20 flex items-center justify-center mr-[1px]"
                            onClick={() => handlePrint(order.id)}
                          >
                            <img
                              src={PrintIcon}
                              alt="Print"
                              className="h-5 w-5"
                            />
                          </button>
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

export default ExitVouchers;
