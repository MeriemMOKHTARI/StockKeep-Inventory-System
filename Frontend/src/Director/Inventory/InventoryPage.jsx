import React, { useState, useEffect } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import modifyIcon from "../../assets/modifyIcon.png";
import PrintIcon from "../../assets/Print.png";
import deleteIcon from "../../assets/deleteIcon.png";
import Filters from "../../assets/Filters.png";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";

import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import axios from "axios";
import ConfirmDelete from "../../magasinier/Delete";
import Approuve from "./Approuve";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";

function Inventory() {
  const TABLE_HEAD = ["ID", "Date", "Chapter", "Article", "Status", "More"];

  const [open, setOpen] = useState(false);
  const [openD, setOpenD] = useState(false);
  const [Status, setStatus] = useState([]);
  const [error, setError] = useState("");

  function handlePrint(statusId) {
    const pdfUrl = `http://127.0.0.1:8000/magasinier/etatinventaire/${statusId}/pdf/`;

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
        link.setAttribute("download", `Etat_inventaire_n°${statusId}.pdf`);

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
    async function fetchStatus() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/directeur/etatinventaire/list/"
        );
        setStatus(response.data.sort((a, b) => b.id - a.id));
      } catch (error) {
        setError("An error occurred while fetching receipt data.");
        console.error("Error fetching receipt data:", error);
      }
    }
    fetchStatus();
  }, []);

  return (
    <main className="table-container m-4 rounded-[11px] h-full overflow-hidden">
      <Card className="h-full w-full overflow-hidden rounded-[11px]">
        <div className="ml-8 mr-12 mt-4 mb-8 flex items-center justify-between gap-8">
          <Typography
            color="blue-gray"
            style={{
              fontSize: "24px",
              fontFamily: "Poppins",
              fontWeight: 600,
            }}
          >
            Inventory status
          </Typography>
          <div className="flex items-center">
            <div className="bg-white rounded-[10px] p-[8px] ml-[8px] flex items-center">
              <div className="rounded-[10px] border border-gray-300">
                <Button className="flex items-center gap-3 p-[8px] text-[#5D6679] font-poppins text-[14px]">
                  <img src={Filters} alt="FilterIcon" className="h-6 w-6" />
                  Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="max-h-[calc(100vh-250px)] overflow-y-auto overflow-x-hidden">
          <table className="w-full  min-w-max table-auto text-left">
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
                      className="font-normal leading-none opacity-70"
                      style={{
                        fontFamily: "Poppins",
                        fontWeight: 500,
                        fontSize: "16px",
                      }}
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Status.map((status, index) => (
                <React.Fragment key={status.id}>
                  <tr>
                    <td className="p-4 w-[200px]">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        style={{
                          fontFamily: "Poppins",
                          fontWeight: 500,
                          color: "#48505E",
                          fontSize: "16px",
                        }}
                      >
                        {status.id}
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
                          fontSize: "16px",
                        }}
                      >
                        {status.datetime.substring(0, 10)}
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
                          fontSize: "16px",
                        }}
                      >
                        {status.chapitre}
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
                          fontSize: "16px",
                        }}
                      >
                        {status.article}
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
                          fontSize: "16px",
                          color:
                            status.etat === "Approuved"
                              ? "green"
                              : status.etat === "Not Approuved"
                              ? "red"
                              : "black",
                        }}
                      >
                        {status.etat}
                      </Typography>
                    </td>

                    <td className="p-4 w-[200px]">
                      <div className="flex justify-start">
                        <button
                          className="border rounded-[15px] w-[110px] h-[40px] flex items-center justify-center mr-[1px] bg-white hover:bg-[#F4F7FE] text-white"
                          style={{
                            fontFamily: "Poppins",
                            fontWeight: 500,
                            fontSize: "14px",
                          }}
                          onClick={() => handlePrint(status.id)}
                        >
                          <LocalPrintshopIcon
                            className="h-3 w-5 mr-1"
                            style={{
                              color: "#2185D5",
                            }}
                          />
                          <span
                            className="ml-1"
                            style={{
                              color: "#2185D5",
                            }}
                          >
                            Print
                          </span>
                        </button>
                        {status.etat === "Not Approuved" ? (
                          <Approuve statusId={status.id} />
                        ) : null}
                      </div>
                    </td>
                  </tr>
                  {/* Divider */}
                  {index !== status.length - 1 && (
                    <tr>
                      <td colSpan="6" className="border-t border-gray-200"></td>
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

export default Inventory;
