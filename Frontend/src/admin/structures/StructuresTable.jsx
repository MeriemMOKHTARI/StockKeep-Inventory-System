import { Card, Typography, Button } from "@material-tailwind/react";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import modifyIcon from "../../assets/modifyIcon.png";
import deleteIcon from "../../assets/deleteIcon.png";
import Filters from "../../assets/Filters.png";
import { useState, useEffect } from "react";
import CreateStructure from "./CreateStructure";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axiosInstance from "../../Services/AxiosInstance";
import UpdateStructure from "./UpdateStructure";

const TABLE_HEAD = [
  { name: "ID" },
  { name: "Abreviation" },
  { name: "Name" },
  { name: "Responsible" },
  { name: "More" },
];

function StructuresTable() {
  const { searchQuery, structures } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openD, setOpenD] = useState(false);

  const [selectedStructure, setSelectedStructure] = useState(0);
  const [updatedStructures, setUpdatedStructures] = useState(structures);

  useEffect(() => {
    async function fetchStructures() {
      try {
        const response = await axiosInstance.get("/structure/listcreate/");
        setUpdatedStructures(response.data);
      } catch (error) {
        console.error("Error fetching structure data:", error);
      }
    }
    fetchStructures();
  }, [dispatch, structures]);

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

  const handleClickOpenUpdate = () => {
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  return (
    <>
      <main
        className="table-container m-4 h-full rounded-[11px]"
        style={{ borderRadius: "20px !important", backgroundColor: "#ffffff" }}
      >
        <Card
          className="h-full w-full overflow-auto rounded-[11px]"
          style={{ borderRadius: "20px !important" }}
        >
          <div className="ml-8 mr-12 mt-4 mb-8 flex items-center justify-between gap-8 ">
            <Typography
              color="blue-gray"
              style={{
                fontSize: "24px",
                color: "#444",
                fontFamily: "Poppins",
                fontWeight: 600,
              }}
            >
              Structures
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
                <CreateStructure
                  open={open}
                  handleClose={handleClose}
                  setOpen={setOpen}
                >
                  <Button
                    className="flex items-center gap-3 p-[8px]"
                    onClick={handleClickOpen}
                    style={{
                      color: "white",
                      fontFamily: "Poppins",
                      fontSize: "12px",
                      textTransform: "capitalize",
                    }}
                  >
                    <UserPlusIcon strokeWidth={2} className="h-6 w-6" />
                    Add structure
                  </Button>
                </CreateStructure>
              </div>
            </div>
          </div>
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
                  ${index === 0 ? "w-[20%] pl-6" : ""}
                  ${index === 1 ? "w-[20%] pl-6" : ""}
                  ${index === 2 ? "w-[20%]" : ""}
                  ${index === 3 ? "w-[20%]" : ""}
                  ${index === 4 ? "w-[20%] text-center pl-6" : ""}
                  bg-slate-100`}
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                      style={{ fontFamily: "Poppins", fontWeight: 600 }}
                    >
                      {head.name}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {updatedStructures
                .filter(
                  (structure) =>
                    structure.id
                      ?.toString()
                      .toLowerCase()
                      .startsWith(searchQuery.toLowerCase()) ||
                    structure.abbreviation
                      .toLowerCase()
                      .startsWith(searchQuery.toLowerCase()) ||
                    structure.responsible
                      .toLowerCase()
                      .startsWith(searchQuery.toLowerCase()) ||
                    structure.name
                      .toLowerCase()
                      .startsWith(searchQuery.toLowerCase())
                )
                .map((structure) => (
                  <tr key={structure.id}>
                    <td className={`p-4 pl-6 w-[20%]`}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        style={{
                          fontFamily: "Poppins",
                          fontWeight: 500,
                          color: "#48505E",
                        }}
                      >
                        {structure.id}
                      </Typography>
                    </td>
                    <td className={`p-4 pl-6 w-[20%]`}>
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
                        {structure.abbreviation}
                      </Typography>
                    </td>
                    <td className={`p-4 pl-2 w-[20%]`}>
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
                        {structure.name}
                      </Typography>
                    </td>
                    <td className={`p-4 pl-6 w-[20%]`}>
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
                        {structure.responsible}
                      </Typography>
                    </td>
                    <td className={"p-4 pl-6 w-[20%]"}>
                      <div className="flex justify-center">
                        <UpdateStructure
                          open={openUpdate}
                          handleClose={handleCloseUpdate}
                          setOpen={setOpenUpdate}
                          id={selectedStructure}
                        >
                          <button
                            className="bg-white border border-blue-500 rounded-[6px] w-10 h-10 flex items-center justify-center mr-[1px]"
                            style={{ borderColor: "#D0D3D9" }}
                            onClick={() => {
                              handleClickOpenUpdate();
                              setSelectedStructure(structure.id);
                            }}
                          >
                            <img
                              src={modifyIcon}
                              alt="Modify"
                              className="h-5 w-5"
                            />
                          </button>
                        </UpdateStructure>
                        <ConfirmDelete
                          open={openD}
                          handleClose={handleCloseD}
                          setOpen={setOpenD}
                          id={selectedStructure}
                          concern="structure"
                        >
                          <button
                            className="bg-white border border-blue-500 rounded-[6px] w-10 h-10 flex items-center justify-center "
                            style={{
                              borderColor: "#D0D3D9",
                              marginLeft: "3px",
                            }}
                            onClick={() => {
                              handleClickOpenD();
                              setSelectedStructure(structure.id);
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
                ))}
            </tbody>
          </table>
        </Card>
      </main>
    </>
  );
}

export default StructuresTable;
