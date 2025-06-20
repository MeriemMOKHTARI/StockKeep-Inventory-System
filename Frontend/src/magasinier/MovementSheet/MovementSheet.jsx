import React, { useState, useEffect } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import PrintIcon from "../../assets/Print.png";
import Filters from "../../assets/Filters.png";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import AddSheet from "./AddSheet";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";

function MovementSheet() {
  const [open, setOpen] = useState(false);
  const [sheets, setSheets] = useState([]);
  const [consumer, setConsumer] = useState("");
  const [IdInternalOrder, setIdInternalOrder] = useState("");
  const [error, setError] = useState("");
  const [dummyState, setDummyState] = useState(false); // Dummy state for force re-render

  const TABLE_HEAD = ["ID", "ID product", "Date", "Supplier", "More"];

  function handlePrint(sheetId) {
    const pdfUrl = `http://127.0.0.1:8000/magasinier/fichemouvement/${sheetId}/pdf/`;

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
        link.setAttribute("download", `fiche_de _mouvement_n°${sheetId}.pdf`);

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
    async function fetchSheets() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/magasinier/fichemouvement/"
        );

        setSheets(response.data.sort((a, b) => b.id - a.id));
      } catch (error) {
        setError("An error occurred while fetching order data.");
        console.error("Error fetching order data:", error);
      }
    }

    fetchSheets();
  }, []);

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
              fontFamily: "Poppins",
              fontWeight: 600,
            }}
          >
            Movement sheets
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
                    fontSize: "14px",
                  }}
                >
                  <img src={Filters} alt="FilterIcon" className="h-6 w-6" />
                  Filters
                </Button>
              </div>
            </div>
            <div className="bg-blue-500 rounded-[10px] ml-[8px] flex items-center">
              <AddSheet
                open={open}
                handleClose={() => setOpen(false)}
                setOpen={setOpen}
              >
                <Button
                  className="flex items-center gap-3 p-[8px] text-white font-poppins text-[14px]"
                  onClick={() => setOpen(true)}
                >
                  <FeedOutlinedIcon strokeWidth={2} className="h-6 w-6" />
                  Add sheet
                </Button>
              </AddSheet>
            </div>
          </div>
        </div>
        <div className="max-h-[calc(100vh-250px)] overflow-y-auto overflow-x-hidden">
          <table className="w-full ml-6 min-w-max table-auto text-left">
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
              {sheets.map((order, index) => (
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
                          fontSize: "16px",
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
                          fontSize: "16px",
                        }}
                      >
                        {order.produit_id}
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
                          fontSize: "16px",
                        }}
                      >
                        {order.date_entree}
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
                        {order.fournisseur}
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
                  {index !== sheets.length - 1 && (
                    <tr>
                      <td colSpan="5" className="border-t border-gray-200"></td>
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

export default MovementSheet;
