import React, { useState, useEffect } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import deleteIcon from "../../assets/deleteIcon.png";
import Filters from "../../assets/Filters.png";
import CreatePermission from "./CreatePermissions";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axiosInstance from "../../Services/AxiosInstance";
//import { LineWave } from "react-loader-spinner";

const TABLE_HEAD = ["ID", "Permission", "More"];

function PermissionsTable() {
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [openD, setOpenD] = useState(false);
  //const [isLoading, setIsLoading] = useState(false);
  const { searchQuery, permissions } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const [selectedPermission, setSelectedPermission] = useState(0);
  const [updatedPermissions, setUpdatedPermissions] = useState(permissions);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        // setIsLoading(true);
        const response = await axiosInstance.get("/role/listcreatep/");
        //setIsLoading(false);
        setUpdatedPermissions(response.data);
      } catch (error) {
        //setIsLoading(false);
        setError("An error occurred while fetching permissions data.");
      }
    };

    fetchPermissions();
  }, [dispatch, permissions]);

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

  /*isLoading ? (
    <div className="absolute left-1/2 top-1/2 translate-y-[-50%] translate-w-[-50%]">
      <LineWave
        visible={true}
        height="200"
        width="200"
        color="#2185D5"
        ariaLabel="line-wave-loading"
        wrapperStyle={{}}
        wrapperClass=""
        firstLineColor=""
        middleLineColor=""
        lastLineColor=""
      />
    </div>
  ) : */
  return (
    <main
      className="table-container m-4 h-full rounded-[11px]"
      style={{ borderRadius: "20px !important", backgroundColor: "#ffffff" }}
    >
      <Card
        className="h-full w-full overflow-auto rounded-[11px]"
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
            Permissions
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
              <CreatePermission
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
                  }}
                >
                  <UserPlusIcon strokeWidth={2} className="h-6 w-6" />
                  Add permission
                </Button>
              </CreatePermission>
            </div>
          </div>
        </div>
        {/* Error handling */}
        {error && (
          <div className="text-red-600 bg-red-200 p-4 mb-4 rounded-md">
            Error: {error}
          </div>
        )}
        {/* Table Content */}
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
                         ${index === 1 ? "w-[47%] pl-6" : ""}
                         ${index === 2 ? "w-[33%] text-center pl-6" : ""}
                         bg-slate-100`}
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                    style={{ fontFamily: "Poppins", fontWeight: 600 }}
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {updatedPermissions
              .filter(
                (permission) =>
                  permission.id
                    ?.toString()
                    .toLowerCase()
                    .startsWith(searchQuery.toLowerCase()) ||
                  permission.auth_permission
                    .toLowerCase()
                    .startsWith(searchQuery.toLowerCase())
              )
              .map((permission, index) => (
                <tr key={index}>
                  <td className={`pt-4 pl-6 w-[20%]`}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      style={{
                        fontFamily: "Poppins",
                        fontWeight: 500,
                        color: "#48505E",
                      }}
                    >
                      {permission.id?.toString()} {/* Convert id to string */}
                    </Typography>
                  </td>
                  <td className={`pt-4 pl-4 w-[47%]`}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal "
                      style={{
                        fontFamily: "Poppins",
                        fontWeight: 500,
                        color: "#48505E",
                      }}
                    >
                      {permission.auth_permission}
                    </Typography>
                  </td>
                  <td className={`pt-4 pl-4 w-[33%]`}>
                    <div className="flex justify-center">
                      {/*<button
                        className="bg-white border border-blue-500 rounded-[6px] w-10 h-10 flex items-center justify-center mr-[1px]"
                        style={{ borderColor: "#D0D3D9" }}
                      >
                        <img
                          src={modifyIcon}
                          alt="Modify"
                          className="h-5 w-5"
                        />
                  </button> */}
                      {/* <ConfirmDelete
                        open={openD}
                        handleClose={handleCloseD}
                        setOpen={setOpenD}
                        concern="permission"
                        id={selectedPermission}
                      >
                        <button
                          className="bg-white border border-blue-500 rounded-[6px] w-10 h-10 flex items-center justify-center"
                          style={{ borderColor: "#D0D3D9", marginLeft: "3px" }}
                          onClick={() => {
                            handleClickOpenD();
                            setSelectedPermission(permission.id);
                          }}
                        >
                          <img
                            src={deleteIcon}
                            alt="Delete"
                            className="h-5 w-5"
                          />
                        </button>
                      </ConfirmDelete> */}
                      ----
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Card>
    </main>
  );
}

export default PermissionsTable;
