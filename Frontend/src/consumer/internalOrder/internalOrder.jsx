import React, { useState, useEffect } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import Filters from "../../assets/Filters.png";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import NewIntOrder from "./NewIntOrder";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import ConfirmDelete from "../../ui/ConfirmDelete";
import deleteIcon from "../../assets/deleteIcon.png";
import { useSelector, useDispatch } from "react-redux";
import { modifyOrders } from "../ConusmerSlice";
import Cookies from "universal-cookie";

function InternalOrder() {
  const [open, setOpen] = useState(false);
  const [orderss, setOrders] = useState([]);
  const [error, setError] = useState("");
  const { orders } = useSelector((state) => state.consumer);
  const { searchQuery } = useSelector((state) => state.admin);
  const [selectedOrder, setSelectedOrder] = useState(0);
  const dispatch = useDispatch();
  const TABLE_HEAD = ["ID", "Date", "Status", "Type", "More"];

  const cookies = new Cookies();
  const UserID = cookies.get("id");


  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/consom/bondecommandeinterne/listcreate/"
        );
        const filteredOrders = response.data.filter(
          (order) =>
            order.user_id === UserID
        );
        setOrders(filteredOrders);
      } catch (error) {
        setError("An error occurred while fetching order data.");
        console.error("Error fetching order data:", error);
      }
    }
    fetchOrders();
  }, []);

  const onOrderDeleted = (orderId) => {
    dispatch(
      modifyOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderId)
      )
    );
  };
  /* const handlePrint = (orderId) => {
    // Function to handle printing, you can implement it as per your requirement
  };*/
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
            Internal orders
          </Typography>
          <div className="flex items-center">
            <div className="bg-white rounded-[10px] p-[8px] ml-[8px] flex items-center">
              <div className="rounded-[10px] border border-gray-300">
                <Button
                  className="flex items-center gap-3 p-[8px] text-[#5D6679] font-poppins text-[14px]"
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
              <NewIntOrder
                open={open}
                handleClose={() => setOpen(false)}
                setOpen={setOpen}
              >
                <Button
                  className="flex items-center gap-3 p-[8px] text-white font-poppins text-[14px]"
                  onClick={() => setOpen(true)}
                  style={{
                    color: "white",
                    fontFamily: "Poppins",
                    fontSize: "12px",
                    textTransform: "capitalize",
                  }}
                >
                  <FeedOutlinedIcon strokeWidth={2} className="h-6 w-6" />
                  New order
                </Button>
              </NewIntOrder>
            </div>
          </div>
        </div>
        <div className="max-h-[calc(100vh-250px)] overflow-y-auto overflow-x-hidden">
          <table
            className="w-full min-w-max table-auto text-left "
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
              {orderss
                .filter(
                  (order) =>
                    order.id
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
                      .startsWith(searchQuery.toLowerCase()) ||
                    order.type
                      ?.toString()
                      .toLowerCase()
                      .startsWith(searchQuery.toLowerCase())
                )
                .map((order, index) => (
                  <React.Fragment key={order.id}>
                    <tr>
                      <td className="p-4 w-[200px]">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none"
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
                          className="font-normal leading-none"
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
                          className="font-normal leading-none"
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
                          className="font-normal leading-none"
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
                          <div className="w-4"></div>
                          <ConfirmDelete
                            open={openD === order.id}
                            handleClose={() => setOpenD(null)}
                            concern="order"
                            id={selectedOrder}
                            onOrderDeleted={onOrderDeleted}
                          >
                            <button
                              className="bg-white border border-blue-500 rounded-[6px] w-10 h-10 flex items-center justify-center mr-[1px]"
                              style={{
                                borderColor: "#D0D3D9",
                                marginLeft: "3px",
                              }}
                              onClick={() => {
                                setOpenD(order.id);
                                setSelectedOrder(order.id);
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

export default InternalOrder;
