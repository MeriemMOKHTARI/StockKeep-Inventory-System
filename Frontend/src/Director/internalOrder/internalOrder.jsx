import React, { useState, useEffect } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";

import Filters from "../../assets/Filters.png";
import axios from "axios";
import { Toaster } from "react-hot-toast";

import ValidateButton from "./validatebutton";
import { useSelector } from "react-redux";

function InternalOrder() {
  const [open, setOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [dummyState, setDummyState] = useState(false); // Dummy state for force re-render
  const { searchQuery } = useSelector((state) => state.admin);
  const TABLE_HEAD = ["ID", "Date", "Status", "Type", "More"];

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/directeur/bondecommandeinterne/list/"
        );

        setOrders(response.data.sort((a, b) => b.id - a.id));
      } catch (error) {
        setError("An error occurred while fetching order data.");
        console.error("Error fetching order data:", error);
      }
    }
    fetchOrders();
  }, []);

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
            Internal orders
          </Typography>
          <div className="flex items-center">
            <div className="bg-white rounded-[10px] p-[8px] ml-[8px] flex items-center">
              <div className="rounded-[10px] border border-gray-300">
                <Button
                  className="flex items-center gap-3 p-[8px] text-[#5D6679] font-poppins "
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
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className={`border-b border-blue-gray-100 bg-blue-gray-50 p-4 sticky top-0  
                    bg-slate-100 ${index === 0 ? "pl-6" : ""}`}
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
                    order.id.toString().startsWith(searchQuery) ||
                    order.status.toLowerCase().startsWith(searchQuery) ||
                    order.type.toLowerCase().startsWith(searchQuery) ||
                    order.date.toLowerCase().startsWith(searchQuery)
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
                            color:
                              order.status === "Created succesfully"
                                ? "brown"
                                : order.status ===
                                  "Validated by the responsable"
                                ? "blue"
                                : order.status === "Delivered"
                                ? "green"
                                : order.status === "Validated by the director"
                                ? "orange"
                                : order.status === "External Discharge"
                                ? "red"
                                : "black",
                          }}
                        >
                          {order.status}
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
                        <div className="flex justify-start">
                          {order.status === "Validated by the responsable" ? (
                            <ValidateButton orderId={order.id} />
                          ) : order.status === "External Discharge" ? (
                            <ValidateButton orderId={order.id} />
                          ) : (
                            "----"
                          )}
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

export default InternalOrder;
